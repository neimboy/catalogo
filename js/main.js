import { inventario } from "./data.js";

import { mostrarProductos }
  from "./render.js";

import { mostrarDetalle }
  from "./detalle.js";

import { actualizarEstadisticas }
  from "./estadisticas.js";

const buscador =
  document.getElementById("buscador");

const botonesFiltro =
  document.querySelectorAll(".btn-filtro");

let categoriaActual = "todos";

// -------- FILTROS --------
function aplicarFiltros() {

  const texto =
    buscador.value.toLowerCase();

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
        .includes(texto)
    );

  mostrarProductos(
    productosFiltrados,
    inventario,
    aplicarFiltros,
    mostrarDetalle
  );
}

// -------- BOTONES --------
botonesFiltro.forEach(boton => {

  boton.addEventListener("click", () => {

    categoriaActual =
      boton.dataset.categoria;

    aplicarFiltros();
  });
});

// -------- BUSCADOR --------
buscador.addEventListener(
  "input",
  aplicarFiltros
);

// -------- INICIO --------
mostrarProductos(
  inventario,
  inventario,
  aplicarFiltros,
  mostrarDetalle
);

actualizarEstadisticas(inventario);