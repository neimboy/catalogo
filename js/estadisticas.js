export function actualizarEstadisticas(inventario) {

  const totalProductos =
    document.getElementById("totalProductos");

  const valorInventario =
    document.getElementById("valorInventario");

  totalProductos.textContent = inventario.length;

  const total = inventario.reduce((acc, producto) => {
    return acc + (producto.precio * producto.stock);
  }, 0);

  valorInventario.textContent = `S/. ${total}`;
}