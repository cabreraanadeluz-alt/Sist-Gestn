from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas
from datetime import datetime

router = APIRouter(prefix="/api/pedidos", tags=["Pedidos"])

@router.post("/", response_model=schemas.PedidoResponse, status_code=status.HTTP_201_CREATED)
def crear_pedido(pedido: schemas.PedidoCreate, user_id: int, db: Session = Depends(get_db)):
    nuevo_pedido = models.Pedido(
        id_usuario=user_id,
        id_cliente=pedido.id_cliente,
        total=pedido.total,
        estado="Pendiente",
        metodo_pago=pedido.metodo_pago,
        notas=pedido.notas,
        fecha=datetime.utcnow()
    )
    
    db.add(nuevo_pedido)
    db.flush()
    
    for detalle in pedido.detalles:
        nuevo_detalle = models.DetallePedido(
            id_pedido=nuevo_pedido.id_pedido,
            id_producto=detalle.id_producto,
            cantidad=detalle.cantidad,
            subtotal=detalle.subtotal
        )
        db.add(nuevo_detalle)
    
    db.commit()
    db.refresh(nuevo_pedido)
    
    return nuevo_pedido

@router.get("/usuario/{user_id}", response_model=List[schemas.PedidoResponse])
def obtener_pedidos_usuario(user_id: int, db: Session = Depends(get_db)):
    pedidos = db.query(models.Pedido).filter(
        models.Pedido.id_usuario == user_id
    ).order_by(models.Pedido.fecha.desc()).all()
    
    return pedidos