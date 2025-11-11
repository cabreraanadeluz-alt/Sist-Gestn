import React from 'react';
import { useCart } from '../../context/CartContext';
import './carrito.css';

const Carrito = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="carrito-container">
        <div className="carrito-vacio">
          <i className="bi bi-cart-x"></i>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos desde el menú</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h1 className="carrito-title">Tu Carrito</h1>
      
      <div className="carrito-items">
        {cartItems.map((item) => (
          <div key={item.nombre} className="carrito-item">
            <img src={item.imagen} alt={item.nombre} className="carrito-item-img" />
            
            <div className="carrito-item-info">
              <h3>{item.nombre}</h3>
              <p className="carrito-item-desc">{item.descripcion}</p>
              <p className="carrito-item-precio">{item.precio}</p>
            </div>

            <div className="carrito-item-controls">
              <button 
                className="btn-quantity" 
                onClick={() => removeFromCart(item.nombre)}
              >
                <i className="bi bi-dash"></i>
              </button>
              
              <span className="carrito-item-cantidad">{item.cantidad}</span>
              
              <button 
                className="btn-quantity" 
                onClick={() => addToCart(item)}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>

            <div className="carrito-item-subtotal">
              ${(parseFloat(item.precio.replace(/[$\.]/g, '').replace(',', '.')) * item.cantidad).toLocaleString('es-AR')}
            </div>
          </div>
        ))}
      </div>

      <div className="carrito-footer">
        <div className="carrito-total">
          <h3>Total:</h3>
          <h2>${getCartTotal().toLocaleString('es-AR')}</h2>
        </div>
        
        <div className="carrito-actions">
          <button className="btn-clear" onClick={clearCart}>
            Vaciar Carrito
          </button>
          <button className="btn-checkout">
            Realizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;