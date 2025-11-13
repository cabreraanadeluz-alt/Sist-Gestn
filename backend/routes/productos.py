from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas

router = APIRouter(prefix="/api/productos", tags=["Productos"])

@router.get("/", response_model=List[schemas.ProductoResponse])
def obtener_productos(db: Session = Depends(get_db)):
    productos = db.query(models.Producto).filter(models.Producto.disponible == 1).all()
    return productos

@router.get("/{id}", response_model=schemas.ProductoResponse)
def obtener_producto(id: int, db: Session = Depends(get_db)):
    producto = db.query(models.Producto).filter(models.Producto.id_producto == id).first()
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto