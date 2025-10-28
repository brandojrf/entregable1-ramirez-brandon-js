import {
  confirmarAgregarProducto,
  confirmarEliminarProducto,
  solicitarCantidadProducto,
  mostrarToastExito,
} from "./notificaciones.js";

const IVA = 0.21;
const money = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 });

let inventario = [];

const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

function actualizarTotalInventario() {
  const total = inventario.reduce((acc, p) => acc + p.subtotalConIva, 0);
  const totalDiv = document.getElementById("totalInventario");
  if (totalDiv) {
    totalDiv.innerHTML = `<h3>Total del inventario (con IVA): ${money.format(total)}</h3>`;
  }
}

function renderItem(p) {
  const cont = document.getElementById("inventario");
  let card = cont.querySelector(`[data-id='${p.id}']`);

  const html = `
    <span class="item-info">
      <strong>${p.title}</strong><br>
      Precio lista: ${money.format(p.precioLista)} — Precio c/IVA: ${money.format(p.precioConIva)}<br>
      Cantidad: ${p.cantidad}<br>
      <strong>Total (c/IVA): ${money.format(p.subtotalConIva)}</strong>
    </span>
    <button class="btn-eliminar" type="button">Eliminar</button>
  `;

  if (!card) {
    card = document.createElement("div");
    card.dataset.id = p.id;
    card.className = "inv-item";  
    cont.appendChild(card);
  } else {
    card.classList.add("inv-item");
  }

  card.innerHTML = html;

  const btn = card.querySelector(".btn-eliminar");
  btn.addEventListener("click", async function () {
    await manejarEliminarDelInventario(p.id);
  });
}

/* ===== Agregar productos ===== */
export async function manejarAgregarAlInventario(id, title, precioLista) {
  const confirm = await confirmarAgregarProducto(title);
  if (!confirm.isConfirmed) return;

  const cantidadRes = await solicitarCantidadProducto(title);
  if (!cantidadRes.isConfirmed) return;

  const cantidad = cantidadRes.value;

  const precioConIva = round2(precioLista * (1 + IVA));

  const existente = inventario.find(p => p.id === id);
  if (existente) {
    existente.cantidad += cantidad;
    existente.subtotalConIva = round2(existente.precioConIva * existente.cantidad);
    renderItem(existente);
  } else {
    const nuevo = {
      id,
      title,
      precioLista,
      precioConIva,
      cantidad,
      subtotalConIva: round2(precioConIva * cantidad),
    };
    inventario.push(nuevo);
    renderItem(nuevo);
  }

  actualizarTotalInventario();
  mostrarToastExito("Producto agregado al inventario");
}

/* Eliminar productos (parcial o total)  */

async function manejarEliminarDelInventario(id) {
  const producto = inventario.find(p => p.id === id);
  if (!producto) return;

  const confirm = await confirmarEliminarProducto(producto.title);
  if (!confirm.isConfirmed) return;

  if (producto.cantidad === 1) {
    inventario = inventario.filter(p => p.id !== id);
    document.querySelector(`[data-id='${id}']`)?.remove();
    actualizarTotalInventario();
    mostrarToastExito("Producto eliminado del inventario");
    return;
  }

  /* cantidad a eliminar */

  const cantidadRes = await Swal.fire({
    title: `Eliminar unidades de "${producto.title}"`,
    input: "number",
    inputLabel: `Hay ${producto.cantidad} unidades. ¿Cuántas deseas eliminar?`,
    inputAttributes: { min: 1, max: producto.cantidad, step: 1 },
    inputValue: 1,
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#e74c3c",
    cancelButtonColor: "#95a5a6",
    preConfirm: (value) => {
      const n = Number.parseInt(value, 10);
      if (!Number.isInteger(n) || n < 1 || n > producto.cantidad) {
        Swal.showValidationMessage(`Ingresa un número entre 1 y ${producto.cantidad}`);
      }
      return n;
    },
  });

  if (!cantidadRes.isConfirmed) return;

  const cantidadEliminar = cantidadRes.value;
  producto.cantidad -= cantidadEliminar;

  if (producto.cantidad <= 0) {
    inventario = inventario.filter(p => p.id !== id);
    document.querySelector(`[data-id='${id}']`)?.remove();
    mostrarToastExito("Producto eliminado del inventario");
  } else {
    producto.subtotalConIva = round2(producto.precioConIva * producto.cantidad);
    renderItem(producto);
    mostrarToastExito(`Eliminadas ${cantidadEliminar} unidades de "${producto.title}"`);
  }

  actualizarTotalInventario();
}


