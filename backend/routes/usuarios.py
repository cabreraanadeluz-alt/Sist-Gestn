from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/api/usuarios", tags=["Usuarios"])

@router.post("/login")
def login_usuario(login: schemas.UsuarioLogin, db: Session = Depends(get_db)):

    usuario = db.query(models.Usuario).filter(
        models.Usuario.email == login.email
    ).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Correo no registrado.")

    # Comparación directa porque ahora guardás contraseñas sin hash
    if usuario.contraseña != login.contraseña:
        raise HTTPException(status_code=400, detail="Contraseña incorrecta.")

    return {
        "mensaje": "Inicio de sesión exitoso",
        "usuario": {
            "id": usuario.id_usuarios,
            "email": usuario.email,
            "nombreCompleto": usuario.nombreCompleto,
            "telefono": usuario.telefono,
            "rol": usuario.rol
        }
    }

@router.get("/{user_id}", response_model=schemas.UsuarioResponse)
def obtener_usuario(user_id: int, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(
        models.Usuario.id_usuarios == user_id
    ).first()
    
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    return usuario

@router.post("/", response_model=schemas.UsuarioResponse)
def crear_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):

    # Verificar si el email ya existe
    existe = db.query(models.Usuario).filter(models.Usuario.email == usuario.email).first()
    if existe:
        raise HTTPException(status_code=400, detail="El correo ya está registrado.")

    # Crear usuario
    nuevo_usuario = models.Usuario(
        email=usuario.email,
        contraseña=usuario.contraseña,  
        nombreCompleto=usuario.nombreCompleto,
        telefono=usuario.telefono,
        rol="cliente"
    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return nuevo_usuario
