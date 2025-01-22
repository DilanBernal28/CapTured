import pymysql as mysql

class MySQL:
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.connection = None

    def connect(self):
        try:
            self.connection = mysql.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            if self.connection.open:
                print("Connection established")
        except mysql.MySQLError as e:
            print("Ocurrio un error inesperado: "+e)

    def execute_query(self, query, params=None):
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, params)
                self.connection.commit()
                print("Consulta ejecutada con éxito.")
        except mysql.MySQLError as e:
            print(f"Error al ejecutar la consulta: {e}")
            
    def fetch_all(self, query, params=None):
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, params)
                return cursor.fetchall()
        except mysql.MySQLError as e:
            print(f"Error al obtener datos: {e}")
            return []

if __name__ == "__main__":
    db = MySQL("localhost", "root", "12345678", "capturedstyles")
    db.connect()


    query = "SELECT * FROM product"
    productos = db.fetch_all(query)
    for producto in productos:
        print(producto)
        print(producto.count)
        print("\n")