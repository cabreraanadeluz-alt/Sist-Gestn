const API_URL = "http://localhost:8000/api"; // ahora apunta a /api

// Obtener todos los productos
export async function getProductos() {
  const res = await fetch(`${API_URL}/productos`); // /api/productos
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

// Crear un pedido
export async function crearPedido(userId, pedido) {
  const res = await fetch(`${API_URL}/pedidos?user_id=${userId}`, { // /api/pedidos
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error al crear el pedido: ${error}`);
  }

  return res.json();
}

// Obtener pedidos del usuario
export async function getPedidos() {
  const res = await fetch(`${API_URL}/pedidos`); // /api/pedidos
  if (!res.ok) throw new Error("Error al obtener pedidos");
  return res.json();
}
