import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos } from '../../api/api.js';
import { parsearPrecio, formatearPrecio } from '../../utils/precio';
import './buscador.css';

// Nombre de cada categoría (tiene que coincidir con menu.jsx)
const CATEGORIAS = {
  1: 'Pizzas',
  2: 'Entre Panes',
  3: 'Al Plato',
  4: 'Bebidas',
  5: 'Picadas & Tablas',
};

const Buscador = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productos, setProductos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

  // Carga los productos de la base una sola vez
  useEffect(() => {
    getProductos()
      .then((data) => setProductos(data))
      .catch((err) => console.error('Error en buscador:', err));
  }, []);

  const handleChange = (e) => {
    const valor = e.target.value.toLowerCase();
    setSearchTerm(e.target.value);

    if (valor.trim() === '') {
      setResultados([]);
      return;
    }

    const filtrados = productos.filter((item) =>
      (item.nombre || '').toLowerCase().includes(valor) ||
      (item.descripcion || '').toLowerCase().includes(valor) ||
      (item.subcategoria || '').toLowerCase().includes(valor)
    );

    setResultados(filtrados);
  };

  const irAProducto = (idCategoria) => {
    navigate('/carta', { state: { categoria: CATEGORIAS[idCategoria] } });
    setResultados([]);
    setSearchTerm('');
  };

  return (
    <div className="search-box">
      <i className="bi bi-search"></i>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar"
        value={searchTerm}
        onChange={handleChange}
      />
      {resultados.length > 0 && (
        <ul className="search-results">
          {resultados.map((item) => (
            <li key={item.id_producto} onClick={() => irAProducto(item.id_categoria)}>
              <img src={`/img/${item.imagen}`} alt={item.nombre} />
              <div>
                <strong>{item.nombre}</strong>
                <p>{formatearPrecio(parsearPrecio(item.precio))}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Buscador;