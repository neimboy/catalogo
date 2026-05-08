export function guardarDatos(inventario) {
  localStorage.setItem("inventario", JSON.stringify(inventario));
}
