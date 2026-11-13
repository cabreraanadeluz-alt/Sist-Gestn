import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductos } from "../../api/api.js";
import Carta from "./carta";
import "./menu.css";

const CATEGORIAS = {
  1: { nombre: 'Pizzas', tipo: 'comida' },
  2: { nombre: 'Entre Panes', tipo: 'comida' },
  3: { nombre: 'Al Plato', tipo: 'comida' },
  4: { nombre: 'Bebidas', tipo: 'bebida' },
  5: { nombre: 'Picadas & Tablas', tipo: 'comida' },
};

const NOMBRE_A_ID = Object.fromEntries(
  Object.entries(CATEGORIAS).map(([id, c]) => [c.nombre, id])
);

function Menu() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getProductos()
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('❌ Error al cargar productos:', err);
        setError(err.message);
        setCargando(false);
      });
  }, []);

  // Al llegar desde Inicio, baja a la categoría elegida
  useEffect(() => {
    if (cargando) return;
    const categoria = location.state?.categoria;
    if (!categoria) return;
    const el = document.getElementById(`categoria-${NOMBRE_A_ID[categoria]}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [cargando, location.state]);

  if (cargando) return <p className="menu-estado">Cargando menú...</p>;
  if (error) return <p className="menu-estado">Error: {error}</p>;

  // Agrupamos productos por categoría
  const categorias = productos.reduce((acc, prod) => {
    const key = prod.id_categoria;
    acc[key] = acc[key] || [];
    acc[key].push(prod);
    return acc;
  }, {});

  return (
    <div className="menu-container">
      {Object.keys(categorias).map((cat) => (
        <div key={cat} className="menu-section" id={`categoria-${cat}`}>
          <h2 className="section-title">
            {CATEGORIAS[cat]?.nombre || `Categoría ${cat}`}
          </h2>
          <div className="menu-grid">
            {categorias[cat].map((p) => (
              <Carta
                key={p.id_producto}
                id_producto={p.id_producto}
                nombre={p.nombre}
                descripcion={p.descripcion}
                precio={p.precio}
                imagen={`/img/${p.imagen}`}
                tipo={CATEGORIAS[cat]?.tipo || 'comida'}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menu;