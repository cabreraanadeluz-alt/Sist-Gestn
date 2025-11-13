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

router = APIRouter(prefix="/productos", tags=["Productos"])

@router.get("/", response_model=List[schemas.ProductoResponse])
def get_productos(db: Session = Depends(get_db)):
    return db.query(models.Producto).all()

@router.post("/", response_model=schemas.ProductoResponse)
def create_producto(
    producto: schemas.ProductoCreate,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_producto = models.Producto(**producto.dict())
    db.add(db_producto)
    db.commit()
    db.refresh(db_producto)
    return db_producto

@router.put("/{id_producto}", response_model=schemas.ProductoResponse)
def update_producto(
    id_producto: int,
    producto: schemas.ProductoUpdate,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_producto = db.query(models.Producto).filter(models.Producto.id_producto == id_producto).first()
    if not db_producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    for key, value in producto.dict(exclude_unset=True).items():
        setattr(db_producto, key, value)
    
    db.commit()
    db.refresh(db_producto)
    return db_producto

@router.delete("/{id_producto}")
def delete_producto(
    id_producto: int,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_producto = db.query(models.Producto).filter(models.Producto.id_producto == id_producto).first()
    if not db_producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    db.delete(db_producto)
    db.commit()
    return {"message": "Producto eliminado"}