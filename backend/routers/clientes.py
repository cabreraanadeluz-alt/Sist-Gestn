from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/clientes", tags=["Clientes"])

@router.get("/", response_model=List[schemas.ClienteResponse])
def get_clientes(db: Session = Depends(get_db)):
    return db.query(models.Cliente).all()

@router.get("/{id_cliente}", response_model=schemas.ClienteResponse)
def get_cliente(id_cliente: int, db: Session = Depends(get_db)):
    cliente = db.query(models.Cliente).filter(models.Cliente.id_cliente == id_cliente).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente

@router.post("/", response_model=schemas.ClienteResponse)
def create_cliente(
    cliente: schemas.ClienteCreate,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_cliente = models.Cliente(**cliente.dict())
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

@router.put("/{id_cliente}", response_model=schemas.ClienteResponse)
def update_cliente(
    id_cliente: int,
    cliente: schemas.ClienteUpdate,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_cliente = db.query(models.Cliente).filter(models.Cliente.id_cliente == id_cliente).first()
    if not db_cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    
    for key, value in cliente.dict(exclude_unset=True).items():
        setattr(db_cliente, key, value)
    
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

@router.delete("/{id_cliente}")
def delete_cliente(
    id_cliente: int,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_cliente = db.query(models.Cliente).filter(models.Cliente.id_cliente == id_cliente).first()
    if not db_cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    
    db.delete(db_cliente)
    db.commit()
    return {"message": "Cliente eliminado"}