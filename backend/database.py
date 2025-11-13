from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import urllib.parse
import os
from dotenv import load_dotenv

# Cargar variables de entorno (.env)
load_dotenv()

# Variables de conexión
SERVER = os.getenv('DB_SERVER', '')
DATABASE = os.getenv('DB_NAME', '')
USERNAME = os.getenv('DB_USER', '')
PASSWORD = os.getenv('DB_PASSWORD', '')

# Construcción del string de conexión
if USERNAME and PASSWORD:
    # Autenticación SQL Server con usuario y contraseña
    params = urllib.parse.quote_plus(
        f"DRIVER={{ODBC Driver 17 for SQL Server}};"
        f"SERVER={SERVER};"
        f"DATABASE={DATABASE};"
        f"UID={USERNAME};"
        f"PWD={PASSWORD};"
        f"TrustServerCertificate=yes;"
    )
else:
    # Autenticación integrada de Windows
    params = urllib.parse.quote_plus(
        f"DRIVER={{ODBC Driver 17 for SQL Server}};"
        f"SERVER={SERVER};"
        f"DATABASE={DATABASE};"
        f"Trusted_Connection=yes;"
        f"TrustServerCertificate=yes;"
    )

# URL de conexión compatible con SQLAlchemy
SQLALCHEMY_DATABASE_URL = f"mssql+pyodbc:///?odbc_connect={params}"

# Crear el engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=True,             # muestra las consultas SQL en consola (puede ponerse False en producción)
    pool_pre_ping=True     # asegura reconexión si la conexión se cae
)

# Crear sesión y base declarativa
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependencia para inyección en FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- OPCIONAL: Prueba de conexión (solo en desarrollo) ---
if __name__ == "__main__":
    try:
        with engine.connect() as conn:
            print("✅ Conexión exitosa a la base de datos")
    except Exception as e:
        print(f"❌ Error conectando a la base de datos: {e}")
