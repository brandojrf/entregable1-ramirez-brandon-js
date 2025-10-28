export function confirmarAgregarProducto(nombreProducto) {
  return Swal.fire({
    title: "¿Agregar al inventario?",
    text: `¿Deseas agregar "${nombreProducto}" al inventario?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, agregar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#3498db",
    cancelButtonColor: "#95a5a6",
  });
}

export function confirmarEliminarProducto(nombreProducto) {
  return Swal.fire({
    title: "¿Eliminar del inventario?",
    text: `¿Deseas eliminar "${nombreProducto}" del inventario?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#e74c3c",
    cancelButtonColor: "#95a5a6",
  });
}

export function solicitarCantidadProducto(nombreProducto) {
  return Swal.fire({
    title: `Cantidad para "${nombreProducto}"`,
    input: "number",
    inputLabel: "Ingrese la cantidad",
    inputAttributes: { min: 1, step: 1 },
    inputValue: 1,
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#3498db",
    cancelButtonColor: "#95a5a6",
    preConfirm: (value) => {
      const n = Number.parseInt(value, 10);
      if (!Number.isInteger(n) || n <= 0) {
        Swal.showValidationMessage("Ingrese un entero mayor o igual a 1");
      }
      return n;
    },
  });
}

export function mostrarToastExito(mensaje) {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: mensaje,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
}

export function mostrarToastError(mensaje) {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "error",
    title: mensaje,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
}