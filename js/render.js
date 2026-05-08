import { comprarProducto } from "./compras.js";

export function mostrarProductos(
  lista,
  inventario,
  aplicarFiltros,
  mostrarDetalle
) {

  const contenedor =
    document.getElementById("contenedorProductos");

  contenedor.innerHTML = "";

  lista.forEach(producto => {

    const card = document.createElement("div");

    card.classList.add("card");

    if (producto.stock === 0) {
      card.classList.add("agotado");
    }

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">

      <h3>${producto.nombre}</h3>

      <p>S/. ${producto.precio}</p>

      <p>${producto.categoria}</p>

      <p>
        ${
          producto.stock > 0
            ? `Stock: ${producto.stock}`
            : "AGOTADO"
        }
      </p>

      <button
        class="btn-comprar"
        ${producto.stock === 0 ? "disabled" : ""}
      >
        Comprar
      </button>
    `;

    // Selección card
    card.addEventListener("click", (e) => {

      if (e.target.classList.contains("btn-comprar")) return;

      document
        .querySelectorAll(".card")
        .forEach(c => c.classList.remove("seleccionado"));

      card.classList.add("seleccionado");

      mostrarDetalle(producto);
    });

    // Comprar
    const botonComprar =
      card.querySelector(".btn-comprar");

    botonComprar.addEventListener("click", () => {

      comprarProducto(
        producto.id,
        inventario,
        aplicarFiltros,
        mostrarDetalle
      );
    });

    contenedor.appendChild(card);
  });
}