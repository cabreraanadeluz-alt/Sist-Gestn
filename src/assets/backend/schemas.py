from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from decimal import Decimal

# USUARIOS
class UsuarioResponse(BaseModel):
    id_usuarios: int
    rol: str
    email: str
    nombreCompleto: Optional[str]
    telefono: Optional[str]
    
    class Config:
        from_attributes = True

# PRODUCTOS
class ProductoResponse(BaseModel):
    id_producto: int
    nombre: str
    precio: Decimal
    descripcion: Optional[str]
    id_categoria: int
    imagen: Optional[str]
    disponible: int
    
    class Config:
        from_attributes = True

# PEDIDOS
class DetallePedidoCreate(BaseModel):
    id_producto: int
    cantidad: int
    subtotal: Decimal

class DetallePedidoResponse(BaseModel):
    id_detalle: int
    id_producto: int
    cantidad: int
    subtotal: Decimal
    producto: Optional[ProductoResponse] = None
    
    class Config:
        from_attributes = True

class PedidoCreate(BaseModel):
    id_cliente: int
    total: Decimal
    metodo_pago: Optional[str] = None
    notas: Optional[str] = None
    detalles: List[DetallePedidoCreate]

class PedidoResponse(BaseModel):
    id_pedido: int
    id_usuario: int
    id_cliente: int
    fecha: datetime
    total: Decimal
    estado: str
    metodo_pago: Optional[str]
    detalles: List[DetallePedidoResponse] = []
    
    class Config:
        from_attributes = True