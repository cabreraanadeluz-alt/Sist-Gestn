import { useState } from 'react';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  // Función para agregar un nuevo pedido (se llamará cuando llegue un pedido)
  const agregarPedido = (nuevoPedido) => {
    setPedidos([...pedidos, nuevoPedido]);
  };

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'Entregado':
        return 'success';
      case 'En proceso':
        return 'warning';
      case 'Pendiente':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <section className="py-4">
        <div className="container">
          {pedidos.length === 0 ? (
            <div className="text-center py-5">
              <h3 className="text-muted">No hay pedidos pendientes</h3>
              <p className="text-muted">Las tarjetas aparecerán cuando lleguen nuevos pedidos</p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {pedidos.map((pedido, index) => (
                <div key={index} className="col">
                  <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: '#FFF8DC' }}>
                    <div className="card-body d-flex flex-column">
                      <div className="mb-3 p-2 bg-white rounded">
                        <h6 className="mb-0 fw-bold">Hora y nombre</h6>
                        <p className="mb-0 mt-1">{pedido.horaYNombre}</p>
                      </div>
                      
                      <div className="mb-3 p-2 bg-white rounded">
                        <h6 className="mb-0 fw-bold">productos</h6>
                        <p className="mb-0 mt-1">{pedido.productos}</p>
                      </div>
                      
                      <div className="mb-3 p-2 bg-white rounded">
                        <h6 className="mb-0 fw-bold">dirección ¿</h6>
                        <p className="mb-0 mt-1">{pedido.direccion}</p>
                      </div>
                      
                      <div className="mt-auto p-2 bg-white rounded">
                        <h6 className="mb-0 fw-bold">estado¿</h6>
                        <span className={`badge bg-${getEstadoColor(pedido.estado)} mt-1`}>
                          {pedido.estado}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Botón de prueba para agregar pedidos (puedes quitarlo después) */}
      <div className="position-fixed bottom-0 end-0 p-4">
        <button 
          className="btn btn-primary btn-lg rounded-circle shadow"
          onClick={() => agregarPedido({
            horaYNombre: `${new Date().toLocaleTimeString()} - Cliente ${pedidos.length + 1}`,
            productos: 'Producto de ejemplo',
            direccion: 'Dirección de ejemplo',
            estado: 'Pendiente'
          })}
          style={{ width: '60px', height: '60px' }}
        >
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
    </main>
  );
}