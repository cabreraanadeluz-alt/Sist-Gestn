from sqlalchemy import Column, Integer, String, DECIMAL, DateTime, ForeignKey, Date, Boolean
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Usuario(Base):
    __tablename__ = "usuarios"
    
    id_usuarios = Column(Integer, primary_key=True, index=True)
    rol = Column(String(50), default='cliente')
    email = Column(String(50), nullable=False)
    contraseña = Column(String(50), nullable=False)
    
    pedidos = relationship("Pedido", back_populates="usuario")

class Categoria(Base):
    __tablename__ = "categoria"
    
    id_categoria = Column(Integer, primary_key=True, index=True)
    nombre_categoria = Column(String(50), nullable=False)
    descripcion = Column(String(50))
    
    productos = relationship("Producto", back_populates="categoria")

class Producto(Base):
    __tablename__ = "producto"
    
    id_producto = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(20), nullable=False)
    precio = Column(DECIMAL(10, 2), nullable=False)
    descripcion = Column(String(50))
    id_categoria = Column(Integer, ForeignKey("categoria.id_categoria"))
    
    categoria = relationship("Categoria", back_populates="productos")
    detalles = relationship("DetallePedido", back_populates="producto")

class Personal(Base):
    __tablename__ = "personal"
    
    id_personal = Column(Integer, primary_key=True, index=True)
    nombre_completo = Column(String(50), nullable=False)
    puesto = Column(String(50), nullable=False)
    telefono = Column(String(15))
    email = Column(String(50), nullable=False)
    
    turnos = relationship("Turno", back_populates="personal")
    detalles = relationship("DetallePedido", back_populates="personal")

class Turno(Base):
    __tablename__ = "turnos"
    
    id_turno = Column(Integer, primary_key=True, index=True)
    id_personal = Column(Integer, ForeignKey("personal.id_personal"), nullable=False)
    sector = Column(String(50), nullable=False)
    turno = Column(String(20), nullable=False)
    dia_semana = Column(String(20))
    fecha_inicio = Column(Date)
    fecha_fin = Column(Date)
    activo = Column(Boolean, default=True)
    
    personal = relationship("Personal", back_populates="turnos")

class Cliente(Base):
    __tablename__ = "cliente"
    
    id_cliente = Column(Integer, primary_key=True, index=True)
    nombre_completo = Column(String(50), nullable=False)
    telefono = Column(String(15))
    email = Column(String(50))
    direccion = Column(String(50))
    fecha_registro = Column(DateTime, default=datetime.now)
    
    pedidos = relationship("Pedido", back_populates="cliente")

class Pedido(Base):
    __tablename__ = "pedidos"
    
    id_pedido = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuarios"), nullable=False)
    id_cliente = Column(Integer, ForeignKey("cliente.id_cliente"))
    fecha = Column(DateTime, default=datetime.now)
    total = Column(DECIMAL(10, 2))
    estado = Column(String(20), default='Pendiente')
    
    usuario = relationship("Usuario", back_populates="pedidos")
    cliente = relationship("Cliente", back_populates="pedidos")
    detalles = relationship("DetallePedido", back_populates="pedido")

class DetallePedido(Base):
    __tablename__ = "detallePedido"
    
    id_detalle = Column(Integer, primary_key=True, index=True)
    id_pedido = Column(Integer, ForeignKey("pedidos.id_pedido"), nullable=False)
    id_producto = Column(Integer, ForeignKey("producto.id_producto"), nullable=False)
    id_personal = Column(Integer, ForeignKey("personal.id_personal"))
    cantidad = Column(Integer, nullable=False, default=1)
    subtotal = Column(DECIMAL(10, 2))
    
    pedido = relationship("Pedido", back_populates="detalles")
    producto = relationship("Producto", back_populates="detalles")
    personal = relationship("Personal", back_populates="detalles")