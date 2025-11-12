from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/api/usuarios", tags=["Usuarios"])

@router.get("/{user_id}", response_model=schemas.UsuarioResponse)
def obtener_usuario(user_id: int, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(
        models.Usuario.id_usuarios == user_id
    ).first()
    
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    return usuario