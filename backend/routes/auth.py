from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
from pydantic import BaseModel, EmailStr
import bcrypt
from datetime import datetime

router = APIRouter(prefix="/api/auth", tags=["Autenticación"])


# Schemas
class UsuarioRegistro(BaseModel):
    nombreCompleto: str
    email: EmailStr
    contraseña: str
    telefono: str

class UsuarioLogin(BaseModel):
    email: EmailStr
    contraseña: str

class UsuarioResponse(BaseModel):
    id_usuarios: int
    nombreCompleto: str
    email: str
    telefono: str
    rol: str
    
    class Config:
        from_attributes = True

# Funciones auxiliares
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# ============ REGISTRO ============
@router.post("/registro", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def registrar_usuario(usuario: UsuarioRegistro, db: Session = Depends(get_db)):
    """
    Registra un nuevo usuario
    """
    # Verificar si el email ya existe
    usuario_existente = db.query(models.Usuario).filter(
        models.Usuario.email == usuario.email
    ).first()
    
    if usuario_existente:
        raise HTTPException(
            status_code=400, 
            detail="El email ya está registrado"
        )
    
    # Hashear la contraseña
    contraseña_hasheada = hash_password(usuario.contraseña)
    
    # Crear el usuario
    nuevo_usuario = models.Usuario(
        nombreCompleto=usuario.nombreCompleto,
        email=usuario.email,
        contraseña=contraseña_hasheada,
        telefono=usuario.telefono,
        rol='cliente'
    )
    
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    
    # Crear el cliente asociado automáticamente
    nuevo_cliente = models.Cliente(
        id_usuario=nuevo_usuario.id_usuarios,
        nombre_completo=usuario.nombreCompleto,
        telefono=usuario.telefono,
        email=usuario.email,
        direccion="",
        fecha_registro=datetime.utcnow()
    )
    
    db.add(nuevo_cliente)
    db.commit()
    
    return nuevo_usuario

# ============ LOGIN ============
@router.post("/login")
def login(credentials: UsuarioLogin, db: Session = Depends(get_db)):
    """
    Inicia sesión con email y contraseña
    """
    # Buscar usuario por email
    usuario = db.query(models.Usuario).filter(
        models.Usuario.email == credentials.email
    ).first()
    
    if not usuario:
        raise HTTPException(
            status_code=401, 
            detail="Email o contraseña incorrectos"
        )
    
    # Verificar contraseña
    if not verify_password(credentials.contraseña, usuario.contraseña):
        raise HTTPException(
            status_code=401, 
            detail="Email o contraseña incorrectos"
        )
    
    # Retornar información del usuario
    return {
        "message": "Login exitoso",
        "user": {
            "id_usuarios": usuario.id_usuarios,
            "nombreCompleto": usuario.nombreCompleto,
            "email": usuario.email,
            "telefono": usuario.telefono,
            "rol": usuario.rol
        }
    }