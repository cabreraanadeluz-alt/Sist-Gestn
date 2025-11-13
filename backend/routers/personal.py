from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/personal", tags=["Personal"])

@router.get("/", response_model=List[schemas.PersonalResponse])
def get_personal(db: Session = Depends(get_db)):
    return db.query(models.Personal).all()

@router.get("/puesto/{puesto}", response_model=List[schemas.PersonalResponse])
def get_personal_por_puesto(puesto: str, db: Session = Depends(get_db)):
    return db.query(models.Personal).filter(models.Personal.puesto == puesto).all()

@router.get("/{id_personal}", response_model=schemas.PersonalResponse)
def get_personal_by_id(id_personal: int, db: Session = Depends(get_db)):
    personal = db.query(models.Personal).filter(models.Personal.id_personal == id_personal).first()
    if not personal:
        raise HTTPException(status_code=404, detail="Personal no encontrado")
    return personal

@router.post("/", response_model=schemas.PersonalResponse)
def create_personal(
    personal: schemas.PersonalCreate,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_personal = models.Personal(**personal.dict())
    db.add(db_personal)
    db.commit()
    db.refresh(db_personal)
    return db_personal

@router.put("/{id_personal}", response_model=schemas.PersonalResponse)
def update_personal(
    id_personal: int,
    personal: schemas.PersonalUpdate,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_personal = db.query(models.Personal).filter(models.Personal.id_personal == id_personal).first()
    if not db_personal:
        raise HTTPException(status_code=404, detail="Personal no encontrado")
    
    for key, value in personal.dict(exclude_unset=True).items():
        setattr(db_personal, key, value)
    
    db.commit()
    db.refresh(db_personal)
    return db_personal

@router.delete("/{id_personal}")
def delete_personal(
    id_personal: int,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_personal = db.query(models.Personal).filter(models.Personal.id_personal == id_personal).first()
    if not db_personal:
        raise HTTPException(status_code=404, detail="Personal no encontrado")
    
    db.delete(db_personal)
    db.commit()
    return {"message": "Personal eliminado correctamente"}