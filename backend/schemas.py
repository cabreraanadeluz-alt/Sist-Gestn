from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date
from decimal import Decimal

# ==================== USUARIOS ====================
class UsuarioCreate(BaseModel):
    rol: str = 'cliente'
    email: str
    contraseña: str

class UsuarioLogin(BaseModel):
    email: str
    contraseña: str

class UsuarioResponse(BaseModel):
    id_usuarios: int
    rol: str
    email: str
    
    class Config:
        from_attributes = True

# ==================== CATEGORÍAS ====================
class CategoriaCreate(BaseModel):
    nombre_categoria: str
    descripcion: Optional[str] = None

class CategoriaUpdate(BaseModel):
    nombre_categoria: Optional[str] = None
    descripcion: Optional[str] = None

class CategoriaResponse(BaseModel):
    id_categoria: int
    nombre_categoria: str
    descripcion: Optional[str]
    
    class Config:
        from_attributes = True

# ==================== PRODUCTOS ====================
class ProductoCreate(BaseModel):
    nombre: str
    precio: Decimal
    descripcion: Optional[str] = None
    id_categoria: int

class ProductoUpdate(BaseModel):
    nombre: Optional[str] = None
    precio: Optional[Decimal] = None
    descripcion: Optional[str] = None
    id_categoria: Optional[int] = None

class ProductoResponse(BaseModel):
    id_producto: int
    nombre: str
    precio: Decimal
    descripcion: Optional[str]
    id_categoria: int
    
    class Config:
        from_attributes = True

# ==================== PERSONAL ====================
class PersonalCreate(BaseModel):
    nombre_completo: str
    puesto: str
    telefono: Optional[str] = None
    email: str

class PersonalUpdate(BaseModel):
    nombre_completo: Optional[str] = None
    puesto: Optional[str] = None
    telefono: Optional[str] = None
    email: Optional[str] = None

class PersonalResponse(BaseModel):
    id_personal: int
    nombre_completo: str
    puesto: str
    telefono: Optional[str]
    email: str
    
    class Config:
        from_attributes = True

# ==================== TURNOS ====================
class TurnoCreate(BaseModel):
    id_personal: int
    sector: str
    turno: str  # 'mañana', 'tarde', 'noche'
    dia_semana: Optional[str] = None  # 'lunes', 'martes', etc.
    fecha_inicio: Optional[date] = None
    fecha_fin: Optional[date] = None
    activo: bool = True

class TurnoUpdate(BaseModel):
    id_personal: Optional[int] = None
    sector: Optional[str] = None
    turno: Optional[str] = None
    dia_semana: Optional[str] = None
    fecha_inicio: Optional[date] = None
    fecha_fin: Optional[date] = None
    activo: Optional[bool] = None

class TurnoResponse(BaseModel):
    id_turno: int
    id_personal: int
    sector: str
    turno: str
    dia_semana: Optional[str]
    fecha_inicio: Optional[date]
    fecha_fin: Optional[date]
    activo: bool
    personal: Optional[PersonalResponse] = None
    
    class Config:
        from_attributes = True

# ==================== CLIENTES ====================
class ClienteCreate(BaseModel):
    nombre_completo: str
    telefono: Optional[str] = None
    email: Optional[str] = None
    direccion: Optional[str] = None

class ClienteUpdate(BaseModel):
    nombre_completo: Optional[str] = None
    telefono: Optional[str] = None
    email: Optional[str] = None
    direccion: Optional[str] = None

class ClienteResponse(BaseModel):
    id_cliente: int
    nombre_completo: str
    telefono: Optional[str]
    email: Optional[str]
    direccion: Optional[str]
    fecha_registro: datetime
    
    class Config:
        from_attributes = True

# ==================== PEDIDOS Y DETALLES ====================
class DetallePedidoCreate(BaseModel):
    id_producto: int
    cantidad: int
    subtotal: Decimal
    id_personal: Optional[int] = None

class DetallePedidoResponse(BaseModel):
    id_detalle: int
    id_pedido: int
    id_producto: int
    id_personal: Optional[int]
    cantidad: int
    subtotal: Decimal
    producto: Optional[ProductoResponse] = None
    personal: Optional[PersonalResponse] = None
    
    class Config:
        from_attributes = True

class PedidoCreate(BaseModel):
    id_cliente: Optional[int] = None
    total: Decimal
    detalles: List[DetallePedidoCreate]

class PedidoUpdate(BaseModel):
    estado: Optional[str] = None
    total: Optional[Decimal] = None

class PedidoResponse(BaseModel):
    id_pedido: int
    id_usuario: int
    id_cliente: Optional[int]
    fecha: datetime
    total: Decimal
    estado: str
    detalles: List[DetallePedidoResponse] = []
    cliente: Optional[ClienteResponse] = None
    
    class Config:
        from_attributes = True