import { useEffect, useState } from "react";
import { getProductos } from "../../api/api.js";
import Carta from "./carta";
import "./menu.css";

function Menu() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductos()
      .then((data) => {
        console.log('📦 Productos recibidos:', data); // ← PARA DEBUG
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('❌ Error al cargar productos:', err);
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando menú...</p>;
  if (error) return <p>Error: {error}</p>;

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
        <div key={cat} className="menu-section" id={cat.toLowerCase()}>
          <h2 className="section-title">Categoría {cat}</h2>
          {categorias[cat].map((p) => (
            <Carta
              key={p.id_producto}  // ← CAMBIAR de p.id a p.id_producto
              id_producto={p.id_producto}  // ← AGREGAR ESTO (IMPORTANTE)
              nombre={p.nombre}
              descripcion={p.descripcion}
              precio={`$${p.precio}`}
              imagen={`img/${p.imagen}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Menu;