/* array y sus metodos
 */
/* const arrayVacio = [];
console.log(arrayVacio); */
/* 
const numeros = [1, 2, 3, 4, 5];
console.log(numeros);
 */
/* const palabras = [`Hola`, "Mundo", `javascript`];

const booleanos = [true, false, true, false];
console.log(booleanos);

const mixto = [1, "Hola", true, null, undefined, { nombre: "Juan", edad: 30 }, [1, 2, 3]];
console.log(mixto);

const numeros = [1, 2, 3, 4, 5];
for (let i = 0; i < numeros.length; i++) {
    console.log(numeros[i]);
}

console.log(numeros[0]); // Primer elemento

palabras.push(`es`, `genial`);
console.log(palabras);

let ultimoElemento = palabras.pop();
console.log(ultimoElemento);  /* se usa para eliminar el ultimo elemento de un array */
/* console.log(palabras); */

/* let primerElemento = palabras.shift(); */ /* se usa para eliminar el primer elemento de un array */
/* console.log(primerElemento); */
/* console.log(palabras); */

/* palabras.unshift(`Hola`);  *//* se usa para agregar un elemento al inicio de un array */
/* console.log(palabras);  */ 

/* let posicion = palabras.indexOf("Mundo"); */ /* se usa para buscar la posicion de un elemento en un array */
/* console.log(posicion); */
/* 
let contiene = palabras.includes("javascript"); */ /* se usa para saber si un elemento existe en un array */
/* console.log(contiene); */



/* objetos y sus metodos */

/* const objetoVacio = {}; */

const persona = {
    nombre: "Juan",
    edad: 30,
    esEstudiante: true,
    hobbies: ['leer', 'viaje', 'programar']
}

const persona2 = {
    nombre: "maria",
    edad: 25,
    esEstudiante: true,
    hobbies: ['leer', 'viaje', 'programar']
}
console.log(persona);

console.log(persona.esEstudiante); /* acceder a una propiedad del objeto */
console.log(persona.hobbies[1]); /* acceder a un elemento de un array dentro de un objeto */

const usuario = [];
usuario.push(persona);
usuario.push(persona2)

console.log(usuario);

usuario.sort((a, b) => a.edad - b.edad); /* ordenar un array de objetos por una propiedad */
console.log(usuario);

const mayorEdad = usuario.filter((user) => user.edad > 25); /* filtrar un array de objetos por una propiedad */
console.log(mayorEdad);

const juan = usuario.find((user) => user.nombre === "Juan"); /* buscar un objeto en un array por una propiedad */
console.log(juan);

const nombres = usuario.map((user) => user.nombre); /* crear un nuevo array con una propiedad de los objetos */
console.log(nombres);

const numeros = [1, 2, 3, 4, 5];
numeros.forEach((num) => console.log(num * 2)); /* recorrer un array y ejecutar una funcion por cada elemento */