import { mostrarProductos } from "./render.js";

export function aplicarFiltros(
  inventario,
  categoriaActual,
  textoBusqueda,
  mostrarDetalle
) {

  let productosFiltrados = inventario;

  // Categoría
  if (categoriaActual !== "todos") {

    productosFiltrados =
      productosFiltrados.filter(producto =>
        producto.categoria === categoriaActual
      );
  }

  // Buscador
  productosFiltrados =
    productosFiltrados.filter(producto =>
      producto.nombre
        .toLowerCase()
        .includes(textoBusqueda.toLowerCase())
    );

  mostrarProductos(
    productosFiltrados,
    inventario,
    () => {},
    mostrarDetalle
  );
}