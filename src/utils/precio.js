export const parsearPrecio = (valor) => {
  if (typeof valor === 'number') return valor;

  let s = String(valor).replace(/[^0-9.,-]/g, '');

  if (s.includes(',')) {
    s = s.replace(/\./g, '').replace(',', '.');
  } else if (/^\d{1,3}(\.\d{3})+$/.test(s)) {
    s = s.replace(/\./g, '');
  }

  return parseFloat(s) || 0;
};

export const formatearPrecio = (valor) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(valor);