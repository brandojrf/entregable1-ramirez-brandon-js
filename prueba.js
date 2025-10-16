const lista = ["Fernando","Juan"]

//entidad / objeto
/* const task = {
    id: 1,
    descripcion: "Hacer las compras",
    vencimientro: "2025-09-11",
    estado: "pendiente",

} */

class Task {
    constructor(id, descripcion, vencimientro, estado) {
        this.id = id;
        this.descripcion = descripcion;
        this.vencimiento = vencimientro;
        this.estado = estado;
    }
}

console.log(task1);

class TaskList {
    constructor() {
        this.tasks = [];
    }

    addTask(NewTask) {
        this.tasks.push();
    }
}

const myTaskList = new TaskList();

const task1 = new Task(1, "Hacer las compras", "2025-09-11", "pendiente");

myTaskList.addTask(task1);

//myTaskList.editTask();
console.log(myTaskList);