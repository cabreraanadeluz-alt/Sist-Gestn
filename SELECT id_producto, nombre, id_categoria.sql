SELECT id_producto, nombre, id_categoria, subcategoria
FROM producto
WHERE id_categoria IN (4, 5);

UPDATE producto
SET imagen = 'malbec.jpg'
WHERE id_producto = 16;

UPDATE producto
SET imagen = 'chardonnay.jpg'
WHERE id_producto = 17;