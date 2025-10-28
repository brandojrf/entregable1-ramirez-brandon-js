import { manejarAgregarAlInventario } from "./inventario.js";

/* Obtiene el listado de productos desde la API*/
async function obtenerListaProductos() {
  const response = await fetch("https://fakestoreapi.com/products?limit=6");
  const data = await response.json();
  return data;
}

/* Muestra las tarjetas de productos*/

export async function mostrarCardsProductos() {
  try {
    const productList = await obtenerListaProductos();
    productList.forEach((producto) => {
      crearTarjetaProducto(producto);
    });
  } catch (error) {
    console.log(error);
  }
}


 /* Crea la tarjeta de un producto*/

function crearTarjetaProducto(producto) {
  const div = document.getElementById("output");
  const tarjeta = document.createElement("article");
  tarjeta.className = "product-card";

  tarjeta.innerHTML = `
    <img src="${producto.image}" alt="${producto.title}" class="product-image">
    <div class="product-body">
      <h4 class="product-title">${producto.title}</h4>
      <p class="product-desc">${(producto.description || "").slice(0, 110)}${producto.description?.length > 110 ? "…" : ""}</p>
      <p class="product-price">$${producto.price}</p>
      <button class="btn-agregar" type="button">Agregar al inventario</button>
    </div>
  `;

  const botonAgregar = tarjeta.querySelector(".btn-agregar");
  botonAgregar.addEventListener("click", function () {
    manejarAgregarAlInventario(producto.id, producto.title, producto.price);
  });

  div.appendChild(tarjeta);
}