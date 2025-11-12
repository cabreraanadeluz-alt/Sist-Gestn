import React, { useState } from "react";

export default function GestionVentas() {
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      cliente: "Juan Pérez",
      productos: "Pizza Napolitana x2, Coca Cola x1",
      total: 3500,
      empleado: "María López",
      estado: "pendiente",
      fecha: "2025-11-11 12:30",
    },
    {
      id: 2,
      cliente: "Ana García",
      productos: "Hamburguesa completa, Papas fritas",
      total: 2800,
      empleado: "Carlos Díaz",
      estado: "en preparación",
      fecha: "2025-11-11 12:45",
    },
    {
      id: 3,
      cliente: "Pedro Martínez",
      productos: "Milanesa napolitana, Ensalada",
      total: 4200,
      empleado: "Julián Pérez",
      estado: "pendiente",
      fecha: "2025-11-11 13:00",
    },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [pedidoEditando, setPedidoEditando] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  
  const [formData, setFormData] = useState({
    cliente: "",
    productos: "",
    total: "",
    empleado: "",
    estado: "pendiente",
  });

  const cambiarEstado = (id, nuevoEstado) => {
    setPedidos(
      pedidos.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    );
  };

  const eliminarPedido = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este pedido?")) {
      setPedidos(pedidos.filter((p) => p.id !== id));
    }
  };

  const editarPedido = (pedido) => {
    setPedidoEditando(pedido);
    setFormData({
      cliente: pedido.cliente,
      productos: pedido.productos,
      total: pedido.total,
      empleado: pedido.empleado,
      estado: pedido.estado,
    });
    setMostrarModal(true);
  };

  const abrirModalNuevo = () => {
    setPedidoEditando(null);
    setFormData({
      cliente: "",
      productos: "",
      total: "",
      empleado: "",
      estado: "pendiente",
    });
    setMostrarModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const guardarPedido = () => {
    if (pedidoEditando) {
      // Editar existente
      setPedidos(
        pedidos.map((p) =>
          p.id === pedidoEditando.id
            ? { ...pedidoEditando, ...formData, total: parseFloat(formData.total) }
            : p
        )
      );
    } else {
      // Crear nuevo
      const nuevoPedido = {
        id: Math.max(...pedidos.map((p) => p.id)) + 1,
        ...formData,
        total: parseFloat(formData.total),
        fecha: new Date().toLocaleString("es-AR"),
      };
      setPedidos([...pedidos, nuevoPedido]);
    }
    setMostrarModal(false);
  };

  const pedidosFiltrados =
    filtroEstado === "todos"
      ? pedidos
      : pedidos.filter((p) => p.estado === filtroEstado);

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente: "bg-warning text-dark",
      "en preparación": "bg-info",
      entregado: "bg-success",
      cancelado: "bg-danger",
    };
    return badges[estado] || "bg-secondary";
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Ventas</h1>
        <button className="btn btn-primary" onClick={abrirModalNuevo}>
          + Nuevo Pedido
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-3">
        <label className="me-2">Filtrar por estado:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="en preparación">En preparación</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      {/* Tabla de pedidos */}
      <div className="card shadow">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Productos</th>
                  <th>Total</th>
                  <th>Empleado</th>
                  <th>Estado</th>
                  <th>Fecha/Hora</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>#{pedido.id}</td>
                    <td>{pedido.cliente}</td>
                    <td>{pedido.productos}</td>
                    <td>${pedido.total.toLocaleString()}</td>
                    <td>{pedido.empleado}</td>
                    <td>
                      <select
                        className={`form-select form-select-sm ${getEstadoBadge(
                          pedido.estado
                        )}`}
                        value={pedido.estado}
                        onChange={(e) =>
                          cambiarEstado(pedido.id, e.target.value)
                        }
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="en preparación">En preparación</option>
                        <option value="entregado">Entregado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td>{pedido.fecha}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => editarPedido(pedido)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarPedido(pedido.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para crear/editar */}
      {mostrarModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {pedidoEditando ? "Editar Pedido" : "Nuevo Pedido"}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setMostrarModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Cliente</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Productos</label>
                  <textarea
                    className="form-control"
                    name="productos"
                    value={formData.productos}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Total ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="total"
                    value={formData.total}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Empleado encargado</label>
                  <input
                    type="text"
                    className="form-control"
                    name="empleado"
                    value={formData.empleado}
                    onChange={handleInputChange}
                  />
                </div>
                {pedidoEditando && (
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                      className="form-select"
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en preparación">En preparación</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={guardarPedido}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}