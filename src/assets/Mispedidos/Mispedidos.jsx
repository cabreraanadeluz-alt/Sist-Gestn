import React, { useEffect, useState } from "react";
import "./misPedidos.css";

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const data = [
      {
        id: 1,
        estado: "Entregado",
        productos: ["Pizza napolitana", "Pizza muzzarella"],
        fecha: "13/10/2025, 22:30:50",
        total: 22000,
      },
      {
        id: 2,
        estado: "Pendiente",
        productos: ["Hamburguesa doble", "Papas fritas"],
        fecha: "14/10/2025, 20:15:10",
        total: 12345,
      },
    ];
    setPedidos(data);
  }, []);

  const getEstadoClass = (estado) => {
    switch (estado.toLowerCase()) {
      case "entregado":
        return "estado entregado";
      case "pendiente":
        return "estado pendiente";
      default:
        return "estado";
    }
  };

  return (
    <div className="mis-pedidos-container">
      <h2>MIS PEDIDOS</h2>

      {pedidos.map((pedido) => (
        <div key={pedido.id} className="pedido-card">
          <div className={getEstadoClass(pedido.estado)}>
            {pedido.estado.toUpperCase()}
          </div>

          <p className="pedido-id">#{String(pedido.id).padStart(3, "0")}</p>
          <p className="pedido-productos">
            {pedido.productos.join(", ")}
          </p>
          <p className="pedido-fecha">{pedido.fecha}</p>
          <p className="pedido-total">${pedido.total.toLocaleString("es-AR")}</p>
        </div>
      ))}
    </div>
  );
};

export default MisPedidos;
