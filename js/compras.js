import { guardarDatos } from "./storage.js";
import { actualizarEstadisticas } from "./estadisticas.js";

export function comprarProducto(
  id,
  inventario,
  aplicarFiltros,
  mostrarDetalle
) {

  const producto =
    inventario.find(p => p.id === id);

  // Evitar stock negativo
  if (producto.stock <= 0) return;

  producto.stock--;

  guardarDatos(inventario);

  aplicarFiltros();

  actualizarEstadisticas(inventario);

  mostrarDetalle(producto);
}