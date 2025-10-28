import { mostrarCardsProductos } from "./productos.js";
import { initInventarioUI, cerrarGestorInventario, vaciarInventario } from "./inventario.js";

document.addEventListener("DOMContentLoaded", function () {
  initInventarioUI();
  mostrarCardsProductos();

  document.getElementById("btnCerrar")?.addEventListener("click", cerrarGestorInventario);
  document.getElementById("btnVaciar")?.addEventListener("click", vaciarInventario);
});