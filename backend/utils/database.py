import psycopg2

def connect_to_db():
    conn = psycopg2.connect(
        dbname="fleet_management",
        user="postgres",
        password="your_password",
        host="localhost"
    )
    return conn

def insert_ship_data(data):
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO ship_data (ship_id, latitude, longitude, fuel_consumption, timestamp)
        VALUES (%s, %s, %s, %s, %s)
    """, (data['ship_id'], data['latitude'], data['longitude'], data['fuel_consumption'], data['timestamp']))
    conn.commit()
    cur.close()
    conn.close()

def fetch_ship_data():
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM ship_data")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows