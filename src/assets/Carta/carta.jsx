import React from 'react';
import { useCart } from '../../context/CartContext';

function Carta({ nombre, descripcion, precio, imagen }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ nombre, descripcion, precio, imagen });
  };

  return (
    <div className="menu-card">
      <img src={imagen} alt={nombre} className="menu-image" />
      <div className="menu-info">
        <h3 className="menu-name">{nombre}</h3>
        <p className="menu-description">{descripcion}</p>
        <p className="menu-price">{precio}</p>
      </div>
      <button 
        className="add-btn" 
        onClick={handleAddToCart}
        title="Agregar al carrito"
      >
        +
      </button>
    </div>
  );
}

export default Carta;