# routers/__init__.py
from .productos import router as productos_router
from .personal import router as personal_router
from .clientes import router as clientes_router
from .pedidos import router as pedidos_router

__all__ = [
    "productos_router",
    "personal_router", 
    "clientes_router",
    "pedidos_router"
]