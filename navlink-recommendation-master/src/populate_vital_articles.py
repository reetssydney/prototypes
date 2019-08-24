import urllib2
import re
from itertools import izip
import json
vital_articles_url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=content&titles=Wikipedia%3AVital_articles"
response = urllib2.urlopen(vital_articles_url)
wikitext = response.read()
def get_image_url(page_name):
    try:
        prop_image_url = "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=500&titles="
        response = urllib2.urlopen(prop_image_url+page_name).read()
        json_response = json.loads(response)
        pages = json_response['query']['pages']
        return pages[pages.keys()[0]]['thumbnail']['source']
    except:
        return None
    
def pairwise(iterable):
    "s -> (s0,s1), (s2,s3), (s4, s5), ..."
    a = iter(iterable)
    return izip(a, a)
#categories =  re.findall('[^=]={2}([^=]+)={2}[^=]', wikitext)[1:-2]
#print categories 
category_matching_string = '(?<!=)={2}([^=]+)={2}(?!=)'
category_text_pair = re.split(category_matching_string, wikitext)[3:-4]
vital_articles = {category: text for category, text in pairwise(category_text_pair)}
subcategory_matching_string = '(?<!=)={3}([^=]+)={3}(?!=)'
article_qcat_matching_string = '{{2}Icon\|([^}]+)}{2}[^\[]*\[{2}([^\]|]+)[^\]]*\]{2}'
for k,v in vital_articles.iteritems():
    temp = re.split(subcategory_matching_string, v)
    if len(temp)>1:
        temp = temp[1:]
        vital_articles[k] = {subcat: text for subcat, text in pairwise(temp)}
    else:
        vital_articles[k] = {"General" : temp[0]}
    for k1, v1 in vital_articles[k].iteritems():
        vital_articles[k][k1] = [(y.decode('unicode-escape').replace(' ', '_'), x) for (x,y) in re.findall(article_qcat_matching_string, v1)]
        #vital_articles[k][k1] = [(y,x) for (x,y) in re.findall(article_qcat_matching_string, v1)]
        



import mysql.connector as mariadb
import replica_cnf as replica_cnf

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
        return cursor

    def __del__(self):
        self.db_connection.close()
    
toolsdb = reconnectingDB(replica_cnf.toolsdb_options)
total = 0
for k in vital_articles.keys():
    for k1 in vital_articles[k].keys():
        for title, qc in vital_articles[k][k1]:
            total+=1
            print k, k1, title, qc
            image_link = get_image_url(title)
            print image_link
            #print u'INSERT INTO vital_pages (category, subcategory, page_title, quality_category) VALUES ("{0}", "{1}", "{2}", "{3}")'.format(k, k1, title, qc)
            count = [count for count in toolsdb.query(u'select count(*) from marginal_gains where source="{0}"'.format(title))][0][0]
            print count
            toolsdb.query(u'INSERT INTO vital_pages (category, subcategory, page_title, quality_category, image_link, num_links) VALUES ("{0}", "{1}", "{2}", "{3}", "{4}", "{5}")'.format(k, k1, title, qc, image_link, count))

toolsdb.db_connection.commit()

