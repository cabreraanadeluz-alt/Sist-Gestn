import React from 'react';
import { useCart } from '../../context/CartContext';
import { parsearPrecio, formatearPrecio } from '../../utils/precio';

function Carta({ id_producto, nombre, descripcion, precio, imagen, tipo = 'comida' }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id_producto,
      id: id_producto,
      nombre,
      descripcion,
      precio,
      imagen
    });
  };

  return (
    <div className={`menu-card menu-card--${tipo}`}>
      <img src={imagen} alt={nombre} className="menu-image" />
      <div className="menu-info">
        <h3 className="menu-name">{nombre}</h3>
        <p className="menu-description">{descripcion}</p>
        <p className="menu-price">{formatearPrecio(parsearPrecio(precio))}</p>
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