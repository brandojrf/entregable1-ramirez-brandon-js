import {
  confirmarAgregarProducto,
  confirmarEliminarProducto,
  solicitarCantidadProducto,
  mostrarToastExito,
  mostrarToastError,
} from "./notificaciones.js";

const IVA = 0.21;
const money = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 2,
});

let inventario = []; // { id, title, precioLista, precioConIva, cantidad, subtotalConIva }

/* ===== Helpers ===== */
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const save = () => localStorage.setItem("inventario", JSON.stringify(inventario));
const load = () => {
  try {
    const raw = localStorage.getItem("inventario");
    inventario = raw ? JSON.parse(raw) : [];
  } catch {
    inventario = [];
  }
};

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

function renderFullInventario() {
  const cont = document.getElementById("inventario");
  cont.innerHTML = "";
  inventario.forEach(renderItem);
  actualizarTotalInventario();
}

/* ===== Agregar productos ===== */
export async function manejarAgregarAlInventario(id, title, precioLista) {
  const confirm = await confirmarAgregarProducto(title);
  if (!confirm.isConfirmed) return;

  const cantidadRes = await solicitarCantidadProducto(title);
  if (!cantidadRes.isConfirmed) return;

  const cantidad = cantidadRes.value;
  const precioConIva = round2(precioLista * (1 + IVA));

  const existente = inventario.find((p) => p.id === id);
  if (existente) {
    existente.cantidad += cantidad;
    existente.subtotalConIva = round2(existente.precioConIva * existente.cantidad);
  } else {
    inventario.push({
      id,
      title,
      precioLista,
      precioConIva,
      cantidad,
      subtotalConIva: round2(precioConIva * cantidad),
    });
  }

  renderItem(inventario.find((p) => p.id === id));
  actualizarTotalInventario();
  save();
  mostrarToastExito("Producto agregado al inventario");
}

/* ===== Eliminar productos ===== */
async function manejarEliminarDelInventario(id) {
  const producto = inventario.find((p) => p.id === id);
  if (!producto) return;

  const confirm = await confirmarEliminarProducto(producto.title);
  if (!confirm.isConfirmed) return;

  if (producto.cantidad === 1) {
    inventario = inventario.filter((p) => p.id !== id);
    document.querySelector(`[data-id='${id}']`)?.remove();
    actualizarTotalInventario();
    save();
    mostrarToastExito("Producto eliminado del inventario");
    return;
  }

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
    inventario = inventario.filter((p) => p.id !== id);
    document.querySelector(`[data-id='${id}']`)?.remove();
    mostrarToastExito("Producto eliminado del inventario");
  } else {
    producto.subtotalConIva = round2(producto.precioConIva * producto.cantidad);
    renderItem(producto);
    mostrarToastExito(`Eliminadas ${cantidadEliminar} unidades de "${producto.title}"`);
  }

  actualizarTotalInventario();
  save();
}

/* ===== Cerrar gestor ===== */
export function cerrarGestorInventario() {
  if (inventario.length === 0) {
    mostrarToastError("No hay productos cargados en el inventario.");
    return;
  }

  const total = inventario.reduce((acc, p) => acc + p.subtotalConIva, 0);
  const fecha = new Date().toLocaleString("es-AR");
  const resumen = inventario
    .map(p => `• ${p.title} — ${p.cantidad} u. — ${money.format(p.subtotalConIva)}`)
    .join("<br>");

  Swal.fire({
    icon: "info",
    title: "Gestor de inventario cerrado",
    html: `
      <p><strong>Fecha:</strong> ${fecha}</p>
      <p><strong>Productos:</strong> ${inventario.length}</p>
      <hr>
      <p style="text-align:left">${resumen}</p>
      <hr>
      <p><strong>Total (con IVA):</strong> ${money.format(total)}</p>
    `,
    confirmButtonText: "Cerrar sesión",
    confirmButtonColor: "#2563eb",
  });

  inventario = [];
  renderFullInventario();
  save();
}

/* ===== Vaciar ===== */
export function vaciarInventario() {
  if (inventario.length === 0) return;
  Swal.fire({
    icon: "warning",
    title: "Vaciar inventario",
    text: "¿Seguro que deseas vaciar el inventario?",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar",
  }).then((res) => {
    if (!res.isConfirmed) return;
    inventario = [];
    renderFullInventario();
    save();
    mostrarToastExito("Inventario vaciado");
  });
}

/* ===== Inicialización ===== */
export function initInventarioUI() {
  load();
  renderFullInventario();
}