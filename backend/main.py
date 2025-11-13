from fastapi import FastAPI
<<<<<<< HEAD

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Servidor FastAPI funcionando correctamente 🚀"}
=======
from fastapi.middleware.cors import CORSMiddleware
from routes import productos, pedidos, usuarios

app = FastAPI(title="La Esquina Bar API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API La Esquina Bar funcionando", "status": "online"}

# Incluir rutas
app.include_router(productos.router)
app.include_router(pedidos.router)
app.include_router(usuarios.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
>>>>>>> b857620fc3e56228543505588c866dcba6ff9f5f
