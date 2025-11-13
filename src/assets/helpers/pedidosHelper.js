// Configuración
const USE_API = true;
const API_URL = 'http://localhost:8000';

/**
 * Crea un pedido
 */
export const crearPedido = async (userId, productos, total) => {
  if (!USE_API) {
    return crearPedidoLocal(userId, productos, total);
  }
  
  try {
    const id_cliente = parseInt(userId);
    
    const detalles = productos.map(producto => ({
      id_producto: producto.id_producto || producto.id,
      cantidad: producto.cantidad,
      subtotal: parseFloat(producto.precio) * producto.cantidad
    }));

    const response = await fetch(`${API_URL}/api/pedidos/?user_id=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_cliente: id_cliente,
        total: total,
        metodo_pago: 'efectivo',
        notas: '',
        detalles: detalles
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al crear el pedido');
    }

    const nuevoPedido = await response.json();
    
    return {
      id: nuevoPedido.id_pedido,
      numeroPedido: String(nuevoPedido.id_pedido).padStart(3, '0'),
      estado: nuevoPedido.estado,
      productos: productos.map(p => `${p.nombre} x${p.cantidad}`).join(', '),
      productosDetalle: productos,
      fecha: formatearFecha(new Date(nuevoPedido.fecha)),
      total: nuevoPedido.total,
      userId: nuevoPedido.id_usuario
    };
    
  } catch (error) {
    console.error('Error en crearPedido:', error);
    throw error;
  }
};

/**
 * Obtiene los pedidos de un usuario
 */
export const obtenerPedidos = async (userId) => {
  if (!USE_API) {
    return obtenerPedidosLocal(userId);
  }
  
  try {
    const response = await fetch(`${API_URL}/api/pedidos/usuario/${userId}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener pedidos');
    }

    const pedidos = await response.json();
    
    return pedidos.map(pedido => ({
      id: pedido.id_pedido,
      numeroPedido: String(pedido.id_pedido).padStart(3, '0'),
      estado: pedido.estado,
      productos: pedido.detalles?.map(d => `${d.producto?.nombre || 'Producto'} x${d.cantidad}`).join(', ') || 'Sin productos',
      productosDetalle: pedido.detalles || [],
      fecha: formatearFecha(new Date(pedido.fecha)),
      total: pedido.total,
      userId: pedido.id_usuario
    }));
    
  } catch (error) {
    console.error('Error en obtenerPedidos:', error);
    return [];
  }
};

// Funciones auxiliares
const formatearFecha = (fecha) => {
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const año = fecha.getFullYear();
  const hora = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  const segundos = String(fecha.getSeconds()).padStart(2, '0');
  
  return `${dia}/${mes}/${año}, ${hora}:${minutos}:${segundos}`;
};

// Versión localStorage (backup)
const crearPedidoLocal = (userId, productos, total) => {
  const pedidosExistentes = obtenerPedidosLocal(userId);
  
  const nuevoPedido = {
    id: Date.now(),
    numeroPedido: String(pedidosExistentes.length + 1).padStart(3, '0'),
    estado: 'Pendiente',
    productos: productos.map(p => `${p.nombre} x${p.cantidad}`).join(', '),
    productosDetalle: productos,
    fecha: formatearFecha(new Date()),
    total: total,
    userId: userId
  };

  pedidosExistentes.unshift(nuevoPedido);
  localStorage.setItem(`pedidos_${userId}`, JSON.stringify(pedidosExistentes));
  
  return nuevoPedido;
};

const obtenerPedidosLocal = (userId) => {
  const pedidosGuardados = localStorage.getItem(`pedidos_${userId}`);
  return pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
};