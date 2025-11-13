from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db
import models
import schemas
from . import auth

router = APIRouter(prefix="/categorias", tags=["Categorías"])

@router.get("/", response_model=List[schemas.CategoriaResponse])
def get_categorias(db: Session = Depends(get_db)):
    return db.query(models.Categoria).all()

@router.post("/", response_model=schemas.CategoriaResponse)
def create_categoria(
    categoria: schemas.CategoriaCreate,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_categoria = models.Categoria(**categoria.dict())
    db.add(db_categoria)
    db.commit()
    db.refresh(db_categoria)
    return db_categoria

@router.put("/{id_categoria}", response_model=schemas.CategoriaResponse)
def update_categoria(
    id_categoria: int,
    categoria: schemas.CategoriaUpdate,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_categoria = db.query(models.Categoria).filter(models.Categoria.id_categoria == id_categoria).first()
    if not db_categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    
    for key, value in categoria.dict(exclude_unset=True).items():
        setattr(db_categoria, key, value)
    
    db.commit()
    db.refresh(db_categoria)
    return db_categoria

@router.delete("/{id_categoria}")
def delete_categoria(
    id_categoria: int,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_categoria = db.query(models.Categoria).filter(models.Categoria.id_categoria == id_categoria).first()
    if not db_categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    
    db.delete(db_categoria)
    db.commit()
    return {"message": "Categoría eliminada"}