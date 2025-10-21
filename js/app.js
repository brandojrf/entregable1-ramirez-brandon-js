const form = document.getElementById('productForm');
const container = document.getElementById('productsContainer');

const IVA = 0.21;
let productId = 1;
let products = [];

// Cargar productos guardados
const saved = localStorage.getItem('inventario');
if (saved) {
  products = JSON.parse(saved);
  if (products.length > 0) {
    productId = products[products.length - 1].id + 1;
    products.forEach(p => renderProduct(p));
    mostrarTotalInventario();
  }
}

// Agregar producto
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const precioLista = parseFloat(document.getElementById("precioLista").value);
  const cantidad = parseInt(document.getElementById("cantidad").value, 10);

  if (!nombre || isNaN(precioLista) || isNaN(cantidad) || precioLista < 0 || cantidad <= 0) {
    alert("Por favor ingresa datos válidos.");
    return;
  }

  const precioConIva = +(precioLista * (1 + IVA)).toFixed(2);
  const subtotal = +(precioConIva * cantidad).toFixed(2);

  const producto = {
    id: productId++,
    nombre,
    precioLista,
    precioConIva,
    cantidad,
    subtotal
  };

  products.push(producto);
  localStorage.setItem('inventario', JSON.stringify(products));

  renderProduct(producto);
  mostrarTotalInventario(); // se actualiza el total
  form.reset();
});

// Renderizar un producto
function renderProduct(producto) {
  const productDiv = document.createElement('div');
  productDiv.dataset.id = producto.id;

  productDiv.innerHTML = `
    <div>
      <p><strong>${producto.nombre}</strong></p>
      <p>Precio lista: $${producto.precioLista}</p>
      <p>Precio c/IVA: $${producto.precioConIva}</p>
      <p>Cantidad: ${producto.cantidad}</p>
      <p><strong>Subtotal: $${producto.subtotal}</strong></p>
      <button>Eliminar</button>
    </div>
  `;

  productDiv.querySelector("button").addEventListener("click", () => {
    deleteProduct(producto.id);
  });

  container.appendChild(productDiv);
}

// Eliminar producto
function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  localStorage.setItem('inventario', JSON.stringify(products));

  const productDiv = container.querySelector(`[data-id='${id}']`);
  if (productDiv) productDiv.remove();

  mostrarTotalInventario(); //  actualiza el total después de eliminar
}

function mostrarTotalInventario() {
  // Eliminar total previo (si existe)
  let totalDiv = document.getElementById('totalInventario');
  if (totalDiv) totalDiv.remove();

  // Calcular total general
  const total = products.reduce((acc, p) => acc + p.subtotal, 0);

  // Crear y agregar elemento al HTML
  totalDiv = document.createElement('div');
  totalDiv.id = 'totalInventario';
  totalDiv.innerHTML = `<h3>Total del inventario (con IVA): $${total.toFixed(2)}</h3>`;

  container.appendChild(totalDiv);
}