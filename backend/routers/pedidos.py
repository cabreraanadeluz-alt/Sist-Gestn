from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/pedidos", tags=["Pedidos"])

@router.get("/", response_model=List[schemas.PedidoResponse])
def get_pedidos(
    estado: str = None,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_user)
):
    query = db.query(models.Pedido)
    if estado:
        query = query.filter(models.Pedido.estado == estado)
    
    pedidos = query.order_by(models.Pedido.fecha.desc()).all()
    
    # Cargar relaciones manualmente
    for pedido in pedidos:
        pedido.detalles = db.query(models.DetallePedido).filter(
            models.DetallePedido.id_pedido == pedido.id_pedido
        ).all()
        
        for detalle in pedido.detalles:
            detalle.producto = db.query(models.Producto).filter(
                models.Producto.id_producto == detalle.id_producto
            ).first()
            if detalle.id_personal:
                detalle.personal = db.query(models.Personal).filter(
                    models.Personal.id_personal == detalle.id_personal
                ).first()
        
        if pedido.id_cliente:
            pedido.cliente = db.query(models.Cliente).filter(
                models.Cliente.id_cliente == pedido.id_cliente
            ).first()
    
    return pedidos

@router.get("/{id_pedido}", response_model=schemas.PedidoResponse)
def get_pedido(
    id_pedido: int,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_user)
):
    pedido = db.query(models.Pedido).filter(models.Pedido.id_pedido == id_pedido).first()
    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")
    
    # Cargar relaciones
    pedido.detalles = db.query(models.DetallePedido).filter(
        models.DetallePedido.id_pedido == id_pedido
    ).all()
    
    for detalle in pedido.detalles:
        detalle.producto = db.query(models.Producto).filter(
            models.Producto.id_producto == detalle.id_producto
        ).first()
        if detalle.id_personal:
            detalle.personal = db.query(models.Personal).filter(
                models.Personal.id_personal == detalle.id_personal
            ).first()
    
    if pedido.id_cliente:
        pedido.cliente = db.query(models.Cliente).filter(
            models.Cliente.id_cliente == pedido.id_cliente
        ).first()
    
    return pedido

@router.post("/", response_model=schemas.PedidoResponse)
def create_pedido(
    pedido: schemas.PedidoCreate,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_user)
):
    # Crear el pedido principal
    db_pedido = models.Pedido(
        id_usuario=current_user.id_usuarios,
        id_cliente=pedido.id_cliente,
        total=pedido.total,
        estado="Pendiente"
    )
    db.add(db_pedido)
    db.commit()
    db.refresh(db_pedido)
    
    # Crear los detalles del pedido
    for detalle in pedido.detalles:
        db_detalle = models.DetallePedido(
            id_pedido=db_pedido.id_pedido,
            **detalle.dict()
        )
        db.add(db_detalle)
    
    db.commit()
    db.refresh(db_pedido)
    
    # Cargar relaciones para la respuesta
    db_pedido.detalles = db.query(models.DetallePedido).filter(
        models.DetallePedido.id_pedido == db_pedido.id_pedido
    ).all()
    
    return db_pedido

@router.put("/{id_pedido}/estado", response_model=schemas.PedidoResponse)
def update_estado_pedido(
    id_pedido: int,
    estado: str,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_pedido = db.query(models.Pedido).filter(models.Pedido.id_pedido == id_pedido).first()
    if not db_pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")
    
    db_pedido.estado = estado
    db.commit()
    db.refresh(db_pedido)
    
    return db_pedido

@router.delete("/{id_pedido}")
def delete_pedido(
    id_pedido: int,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_admin)
):
    db_pedido = db.query(models.Pedido).filter(models.Pedido.id_pedido == id_pedido).first()
    if not db_pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")
    
    # Eliminar detalles primero
    db.query(models.DetallePedido).filter(models.DetallePedido.id_pedido == id_pedido).delete()
    
    # Eliminar pedido
    db.delete(db_pedido)
    db.commit()
    return {"message": "Pedido eliminado"}