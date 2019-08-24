from flask import Flask, request, Response, jsonify, render_template, current_app
#from navlinkRecommender import navlinkRecommender
from werkzeug.debug import DebuggedApplication
import json
import urllib2
import urllib
from functools import wraps

from collections import defaultdict

app = Flask(__name__)
app.debug = True
app.wsgi_app = DebuggedApplication(app.wsgi_app, True)

import mysql.connector as mariadb
import replica_cnf as replica_cnf
import sys
#mariadb_connection = mariadb.connect(option_files='/etc/mysql/connectors.cnf', database='s52641__recommendations')

def jsonp(func):
    """Wraps JSONified output for JSONP requests."""
    @wraps(func)
    def decorated_function(*args, **kwargs):
        callback = request.args.get('callback', False)
        if callback:
            data = str(func(*args, **kwargs).data)
            content = str(callback) + '(' + data + ')'
            mimetype = 'application/javascript'
            return current_app.response_class(content, mimetype=mimetype)
        else:
            return func(*args, **kwargs)
    return decorated_function

class reconnectingDB():
    def __init__(self,db_options):
        self.db_options = db_options

    def connect(self):
        self.db_connection = mariadb.connect(**(self.db_options))

    def query(self, sql):
        try:
            cursor = self.db_connection.cursor()
            cursor.execute(sql)
        except (AttributeError, mariadb.OperationalError):
            self.connect()
            cursor = self.db_connection.cursor()
            cursor.execute(sql)
        except mariadb.ProgrammingError:
            cursor.close()
        return cursor

    def __del__(self):
        self.db_connection.close()

class navlinkRecommender():
    def __init__(self):
        self.toolsdb = reconnectingDB(replica_cnf.toolsdb_options)
        self.enwikidb = reconnectingDB(replica_cnf.enwikidb_options)
        self.ns_map = {-2:u'Media:',
         -1:u'Special:',
         0:u'',
         1:u'Talk:',
         2:u'User:',
         3:u'User_talk:',
         4:u'Wikipedia:',
         5:u'Wikipedia_talk:',
         6:u'File:',
         7:u'File_talk:',
         8:u'MediaWiki:',
         9:u'MediaWiki_talk:',
         10:u'Template:',
         11:u'Template_talk:',
         12:u'Help:',
         13:u'Help_talk:',
         14:u'Category:',
         15:u'Category_talk:',
         100:u'Portal:',
         101:u'Portal_talk:',
         108:u'Book:',
         109:u'Book_talk:',
         118:u'Draft:',
         119:u'Draft_talk:',
         446:u'Education_Program:',
         447:u'Education_Program_talk:',
         710:u'TimedText:',
         711:u'TimedText_talk:',
         828:u'Module:',
         829:u'Module_talk:',
         2600:u'Topic:',
         }
        self.reverse_ns_map = {v:k for (k,v) in self.ns_map.iteritems()}
        self.reverse_ns_map.pop('', None)

    def getPageId(self,page_title_with_ns):
        split_title = page_title_with_ns.split(':',1)
        if len(split_title)>1 and split_title[0] in self.reverse_ns_map:
            [ns_string, title_string] = split_title
            ns_id = self.reverse_ns_map[ns_string+":"]
        else:
            ns_id = 0
            title_string = page_title_with_ns

        page_id = [page_id for (page_id,) in self.enwikidb.query(u"select page_id from page where page_namespace={0} and page_title='{1}'".format(ns_id, title_string))]
        if len(page_id) != 1:
            return None
        else:
            return page_id[0]


    def getRecommendationsForSource(self, source, k=None):
        if source is "None":
            return []

        if k is None:
            cursor = self.toolsdb.query(u"SELECT id, source, target, path_count, source_count, most_common_path FROM marginal_gains where source='{0}'".format(source))
        else:
            cursor = self.toolsdb.query(u"SELECT id, source, target, path_count, source_count, most_common_path FROM marginal_gains where source='{0}' limit {1}".format(source,k))
	
        source_id = self.getPageId(source)
        #print source_id
	existing_links_cursor = self.enwikidb.query(u"SELECT pl_namespace, pl_title FROM pagelinks WHERE pl_from = {0}".format(source_id))
        existing_links = [self.ns_map[pl_namespace]+pl_title.decode('utf-8')for pl_namespace, pl_title in existing_links_cursor]
        #print existing_links

        recommendations =  [{'id': mid, 'source': source, 'target': target, 'expected_clickthrough': float(path_count)/source_count, 'related_pages': most_common_path.split('|')[1:-1]} for mid, source, target, path_count, source_count, most_common_path in cursor if target not in existing_links]
        
        cursor.close()
        existing_links_cursor.close()
        return [x for x in recommendations if x['target'] not in existing_links]

    def getTopRecommendations(self, k):
        if k is None:
            k = 30
        cursor = self.toolsdb.query(u"SELECT id, source, target, path_count, source_count, most_common_path FROM marginal_gains limit {0}".format(k))
        return [{'id':mid, 'source': source, 'target': target, 'expected_clickthrough': float(path_count)/source_count, 'related_pages': most_common_path.split('|')[1:-1]} for mid, source, target, path_count, source_count, most_common_path in cursor]

    def get_vital_articles(self):
        cursor = self.toolsdb.query(u"SELECT page_title, quality_category, num_links, category, subcategory, image_link FROM vital_pages where num_links > 0 order by num_links desc")
        vital_articles = {}
        category_name_map = {
                "Health and medicine": "Medicine", 
                "Arts and culture": "Art & Culture", 
                "People": "People", 
                "Science" : "Science",
                "Everyday life" : "Everyday", 
                "Philosophy and religion" : "Philosophy", 
                "Society and social sciences": "Society", 
                "Mathematics": "Mathematics", 
                "History": "History", 
                "Technology": "Science", 
                "Geography": "Geography", 
                }
        for page_title, quality_category, num_links, category, subcategory, image_link in cursor:
            category_name = category_name_map[category.split('(')[0].strip()]
            subcategory_name = subcategory.split('(')[0].strip()
            if category_name not in vital_articles:

                vital_articles[category_name] = defaultdict(list)
            if sum([len(x) for x in vital_articles[category_name].itervalues()])<=30:
                vital_articles[category_name][subcategory_name].append((page_title, quality_category, num_links, image_link))
        cursor = self.toolsdb.query(u"SELECT page_title, quality_category, num_links, category, subcategory, image_link FROM vital_pages where num_links > 0 order by num_links desc limit 30")
        vital_articles["All"] = defaultdict(list)
        for page_title, quality_category, num_links, category, subcategory, image_link in cursor:
            subcategory_name = subcategory.split('(')[0].strip()
            vital_articles["All"][subcategory_name].append((page_title, quality_category, num_links, image_link))

        return vital_articles

    def wikiSearch(self, search_text):
        search_url_prefix = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=50&srsearch="
        response = urllib2.urlopen(search_url_prefix+search_text.encode('utf-8').replace(' ', '_'))
        results = response.read()
        return json.loads(results)
        

    def searchSource(self, search_text):
        search_results = self.wikiSearch(search_text)['query']['search']
        recommended_sources = []
        for s in search_results:
            page_link = self.ns_map[s['ns']]+unicode(s['title']).replace(' ', '_')
            #.decode('unicode-escape')
            num_links = [x[0] for x in self.toolsdb.query(u'select count(*) from marginal_gains where source = "{0}"'.format(page_link)).fetchall()][0]

            s['page_link'] = page_link
            s['num_links'] = num_links
            recommended_sources.append(s)
        return {'results': recommended_sources}
        

recommenderObj = navlinkRecommender()

@app.route('/')
def home():
    return render_template('main.html' , vital_articles = recommenderObj.get_vital_articles())
    #return Response("""Navlink-recommendation Tool Usage\n * Top k -- /topk/<k>/\n * All recommendations for a source -- /<article>/\n * Top k recommendations for a source -- /<article>/<k>/\n * Edit an article -- /edit/<article>""",  content_type='text/plain')

@app.route('/search/source/<article>/')
@jsonp
def source_search(article):
    return jsonify(recommenderObj.searchSource(article))

@app.route('/edit/<article>/')
def edit(article):
    #article = urllib.unquote(article)
    return render_template('edit_test.html', article=article,recommendations = recommenderObj.getRecommendationsForSource(article))

@app.route('/topk/<int:k>/')
def getTopK(k):
    return jsonify(recommendations = recommenderObj.getTopRecommendations(k))

@app.route('/<article>/')
@jsonp
def getSource(article):
    return jsonify(recommendations = recommenderObj.getRecommendationsForSource(article))

@app.route('/<article>/<int:k>/')
@jsonp
def getSourceTopK(article, k):
    return jsonify(recommendations = recommenderObj.getRecommendationsForSource(article,k))



if __name__ == '__main__':
    app.run(debug=True)
