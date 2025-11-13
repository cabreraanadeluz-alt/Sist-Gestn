from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, DECIMAL
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    
    id_usuarios = Column(Integer, primary_key=True)
    rol = Column(String(50), default="cliente")
    email = Column(String(50), nullable=False, unique=True)
    contraseña = Column(String(255), nullable=False)
    nombreCompleto = Column(String(100))
    telefono = Column(String(20))
    
    pedidos = relationship("Pedido", back_populates="usuario")

class Cliente(Base):
    __tablename__ = "cliente"
    
    id_cliente = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuarios"))
    nombre_completo = Column(String(50), nullable=False)
    telefono = Column(String(15))
    email = Column(String(50))
    direccion = Column(String(255))
    fecha_registro = Column(DateTime, default=datetime.utcnow)
    
    pedidos = relationship("Pedido", back_populates="cliente")

class Categoria(Base):
    __tablename__ = "categoria"
    
    id_categoria = Column(Integer, primary_key=True)
    nombre_categoria = Column(String(50), nullable=False)
    descripcion = Column(String(255))
    
    productos = relationship("Producto", back_populates="categoria")

class Producto(Base):
    __tablename__ = "producto"
    
    id_producto = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    precio = Column(DECIMAL(10, 2), nullable=False)
    descripcion = Column(String(255))
    id_categoria = Column(Integer, ForeignKey("categoria.id_categoria"))
    imagen = Column(String(255))
    disponible = Column(Integer, default=1)
    
    categoria = relationship("Categoria", back_populates="productos")
    detalles_pedido = relationship("DetallePedido", back_populates="producto")

class Pedido(Base):
    __tablename__ = "pedidos"
    
    id_pedido = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuarios"))
    id_cliente = Column(Integer, ForeignKey("cliente.id_cliente"))
    fecha = Column(DateTime, default=datetime.utcnow)
    total = Column(DECIMAL(10, 2))
    estado = Column(String(20), default="Pendiente")
    metodo_pago = Column(String(50))
    notas = Column(Text)
    
    usuario = relationship("Usuario", back_populates="pedidos")
    cliente = relationship("Cliente", back_populates="pedidos")
    detalles = relationship("DetallePedido", back_populates="pedido")

class DetallePedido(Base):
    __tablename__ = "detallePedido"
    
    id_detalle = Column(Integer, primary_key=True)
    id_pedido = Column(Integer, ForeignKey("pedidos.id_pedido"))
    id_producto = Column(Integer, ForeignKey("producto.id_producto"))
    id_personal = Column(Integer, ForeignKey("personal.id_personal"))
    cantidad = Column(Integer, nullable=False, default=1)
    subtotal = Column(DECIMAL(10, 2))
    
    pedido = relationship("Pedido", back_populates="detalles")
    producto = relationship("Producto", back_populates="detalles_pedido")

class Personal(Base):
    __tablename__ = "personal"
    
    id_personal = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuarios"))
    nombre_completo = Column(String(50), nullable=False)
    puesto = Column(String(50), nullable=False)
    telefono = Column(String(15))
    email = Column(String(50), nullable=False)