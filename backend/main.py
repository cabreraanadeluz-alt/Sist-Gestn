from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base

# Importar routers (asegurate de que estén en /routers/__init__.py)
from routers import (
    auth as auth_router,
    productos as productos_router,
    categorias as categorias_router,
    personal as personal_router,
    clientes as clientes_router,
    pedidos as pedidos_router,
)

# Crear la app principal
app = FastAPI(
    title="Sistema de Gestión - API",
    version="1.0.0",
    description="API para la gestión integral de pizzería (usuarios, productos, pedidos, etc.)"
)

# CORS (React o Vite frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React
        "http://localhost:5173"   # Vite
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear las tablas (solo la primera vez si no existen)
# Base.metadata.create_all(bind=engine)

# Registrar routers
app.include_router(auth_router.router, prefix="/auth", tags=["Autenticación"])
app.include_router(productos_router.router, prefix="/productos", tags=["Productos"])
app.include_router(categorias_router.router, prefix="/categorias", tags=["Categorías"])
app.include_router(personal_router.router, prefix="/personal", tags=["Personal"])
app.include_router(clientes_router.router, prefix="/clientes", tags=["Clientes"])
app.include_router(pedidos_router.router, prefix="/pedidos", tags=["Pedidos"])


# --- Endpoints informativos ---
@app.get("/")
def root():
    return {
        "message": "🚀 API Sistema de Gestión de Pizzería",
        "version": "1.0.0",
        "status": "online",
        "docs": "/docs",
        "redoc": "/redoc",
        "health_check": "/health"
    }

@app.get("/health")
def health_check():
    """Verifica si la API está activa."""
    return {"status": "healthy"}


# --- Ejecución directa ---
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
