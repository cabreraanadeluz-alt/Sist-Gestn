from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Crear app
app = FastAPI(title="La Esquina Bar API", version="1.0.0")

# 1. Manejador de OPTIONS (preflight)
@app.options("/{full_path:path}")
async def options_handler(request: Request, full_path: str):
    return JSONResponse(
        content={"status": "ok"},
        headers={
            "Access-Control-Allow-Origin": request.headers.get("origin", "*"),
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
        },
    )

# 2. Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ RUTAS ============

@app.get("/")
def read_root():
    return {"message": "API funcionando", "status": "online"}

# Importar routers
from routes import auth, productos, pedidos, usuarios

# Registrar routers
app.include_router(auth.router)
app.include_router(productos.router)
app.include_router(pedidos.router)
app.include_router(usuarios.router)

# ============ EJECUTAR ============

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )