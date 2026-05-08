export function mostrarDetalle(producto) {

  const detalle =
    document.getElementById("detalleProducto");

  detalle.innerHTML = `
    <h2>${producto.nombre}</h2>

    <img src="${producto.imagen}" width="200">

    <p><strong>Precio:</strong> S/. ${producto.precio}</p>

    <p><strong>Categoría:</strong> ${producto.categoria}</p>

    <p><strong>Stock:</strong> ${producto.stock}</p>

    <p>${producto.descripcion}</p>
  `;
}