import mysql.connector as mariadb
import replica_cnf as replica_cnf
import sys
#mariadb_connection = mariadb.connect(option_files='/etc/mysql/connectors.cnf', database='s52641__recommendations')


class navlinkRecommender():
    def __init__(self):
        self.connect()

    def connect(self):
        self.mariadb_connection = mariadb.connect(**(replica_cnf.db_options))

    def query(self, sql):
        try:
            cursor = self.mariadb_connection.cursor()
            cursor.execute(sql)
        except (AttributeError, mariadb.OperationalError):
            self.connect()
            cursor = self.mariadb_connection.cursor()
            cursor.execute(sql)
        return cursor

    def getRecommendationsForSource(self, source, k=None):
        if k is None:
            cursor = self.query("SELECT source, target, path_count, source_count, most_common_path FROM marginal_gains where source='{0}'".format(source))
	else:
            cursor = self.query("SELECT source, target, path_count, source_count, most_common_path FROM marginal_gains where source='{0}' limit {1}".format(source,k))
        return [{'source': source, 'target': target, 'expected_clickthrough': float(path_count)/source_count, 'related_pages': most_common_path.split('|')[1:-1]} for source, target, path_count, source_count, most_common_path in cursor]

    def getTopRecommendations(self, k):
        cursor = self.query("SELECT source, target, path_count, source_count, most_common_path FROM marginal_gains limit {0}".format(k))
        return [{'source': source, 'target': target, 'expected_clickthrough': float(path_count)/source_count, 'related_pages': most_common_path.split('|')[1:-1]} for source, target, path_count, source_count, most_common_path in cursor]


    def __del__(self):
        self.mariadb_connection.close()

if __name__ == '__main__':
    obj = navlinkRecommender()
    if len(sys.argv)>=3:
        source = sys.argv[1]
        k = int(sys.argv[2])
    	print obj.getRecommendationsForSource(source, k)
    elif len(sys.argv)==2:
        source = sys.argv[1]
    	print obj.getRecommendationsForSource(source)
    else:
        source = 'Bioluminescence'
        k = 5
    	print obj.getRecommendationsForSource(source,k)

