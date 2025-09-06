const iva = 0.21;
let productos = [];
let contadorProductos = 0;

alert("Bienvenido al gestor de inventario");

function mostrarOpciones() {
  return prompt("Elije una opción:\n1- Agregar producto\n2- Ver listado de productos\n3- Salir");
}

function agregarProducto() {
  const nombre = prompt("Ingresa el nombre del producto");
  if (!nombre || nombre.trim() === "" || !isNaN(nombre)) {
    alert("Nombre inválido.");
    console.log("Nombre inválido.");
    return;
  }

  const precioEntrada = prompt("Ingresa el precio de lista (sin IVA).");
  const precioLista = parseFloat(precioEntrada);
  if (!Number.isFinite(precioLista) || precioLista < 0) {
    alert("Precio inválido.");
    console.log("Precio inválido.");
    return;
  }

  const cantidadEntrada = prompt("Ingresa la cantidad");
  const cantidad = parseInt(cantidadEntrada, 10);
  if (!Number.isFinite(cantidad) || cantidad < 0) {
    alert("Cantidad inválida.");
    console.log("Cantidad inválida.");
    return;
  }

  contadorProductos++;
  const producto = {
    id: contadorProductos,
    nombre: nombre.trim(),
    precioLista: precioLista,
    cantidad: cantidad
  };
  productos.push(producto);

  alert("Producto agregado exitosamente.");
  console.log("Producto agregado exitosamente:", producto);
}

function mostrarProductos() {
  if (productos.length === 0) {
    alert("No hay productos en el inventario.");
    console.log("No hay productos en el inventario.");
    return;
  }

  let total = 0;
  let listado = "Listado de productos:\n";
  for (let i = 0; i < productos.length; i++) {
    const p = productos[i];
    const precioConIva = p.precioLista * (1 + iva);
    const subtotal = precioConIva * p.cantidad;
    total += subtotal;

    listado += `${p.id}. ${p.nombre}\n` + `Precio de lista: $${p.precioLista.toFixed(2)}\n` +
               `Precio con IVA: $${precioConIva.toFixed(2)}\n` + `Cantidad: ${p.cantidad}\n ` +
               `Subtotal: $${subtotal.toFixed(2)}\n\n`;
  }
  listado += `Total (con IVA): $${total.toFixed(2)}`;
  alert(listado);
  console.log(listado);
}

function main() {
  let opcion = mostrarOpciones();

  while (opcion !== null && opcion !== "3") {
    switch (opcion) {
      case "1":
        agregarProducto();
        break;
      case "2":
        mostrarProductos();
        break;
      default:
        alert("Opción inválida. Por favor, elige 1, 2 o 3.");
        console.log("Opción inválida. Por favor, elige 1, 2 o 3.");
    }
    // volver a preguntar dentro del while
    opcion = mostrarOpciones();
  }

  alert("Gracias por usar el gestor de inventario. ¡Hasta luego!");
  console.log("Gracias por usar el gestor de inventario. ¡Hasta luego!");
}

main();