import { manejarAgregarAlInventario } from "./inventario.js";

/* Obtiene el listado de productos desde la API */
async function obtenerListaProductos() {
  const estado = document.getElementById("estado");
  try {
    estado.textContent = "Cargando productos…";
    const response = await fetch("https://fakestoreapi.com/products?limit=6");
    if (!response.ok) throw new Error("Error de red");
    const data = await response.json();
    estado.textContent = "";
    return data;
  } catch (err) {
    console.error(err);
    estado.textContent = "No se pudieron cargar los productos. Intenta nuevamente.";
    return [];
  }
}

/* Muestra las tarjetas de productos */
export async function mostrarCardsProductos() {
  const productList = await obtenerListaProductos();
  const cont = document.getElementById("output");
  cont.innerHTML = "";
  productList.forEach((producto) => crearTarjetaProducto(producto));
}

/* Crea la tarjeta de un producto */
function crearTarjetaProducto(producto) {
  const div = document.getElementById("output");
  const tarjeta = document.createElement("article");
  tarjeta.className = "product-card";

  const money = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 });

  tarjeta.innerHTML = `
    <img src="${producto.image}" alt="${producto.title}" class="product-image">
    <div class="product-body">
      <h4 class="product-title">${producto.title}</h4>
      <p class="product-desc">${(producto.description || "").slice(0, 110)}${producto.description?.length > 110 ? "…" : ""}</p>
      <p class="product-price">${money.format(producto.price)}</p>
      <button class="btn-agregar" type="button">Agregar al inventario</button>
    </div>
  `;

  const btn = tarjeta.querySelector(".btn-agregar");
  btn.addEventListener("click", () => {
    manejarAgregarAlInventario(producto.id, producto.title, producto.price);
  });

  div.appendChild(tarjeta);
}