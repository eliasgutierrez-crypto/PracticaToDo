# Guía Básica de JavaScript

## Introducción

JavaScript es el lenguaje de programación de la web. Con él puedes crear páginas interactivas, aplicaciones web, servidores y mucho más.

---

## 1. Variables

Las variables son contenedores para almacenar datos.

```javascript
// Tres formas de declarar variables
let nombre = "Michel";      // Variable que puede cambiar
const edad = 25;            // Constante (no puede cambiar)
var ciudad = "Guadalajara"; // Forma antigua (evitar usar)

// Ejemplos
let contador = 0;
contador = 1;  // ✅ Funciona con let

const PI = 3.14159;
// PI = 3;     // ❌ Error! No puedes cambiar una constante
```

**Regla de oro:** Usa `const` por defecto, y `let` solo cuando necesites cambiar el valor.

---

## 2. Tipos de Datos

```javascript
// Strings (texto)
let saludo = "Hola mundo";
let mensaje = 'También con comillas simples';
let plantilla = `Hola ${nombre}, tienes ${edad} años`; // Template literals

// Números
let entero = 42;
let decimal = 3.14;
let negativo = -10;

// Booleanos (verdadero/falso)
let activo = true;
let terminado = false;

// Undefined y Null
let sinValor;           // undefined (no se ha asignado valor)
let vacio = null;       // null (valor vacío intencional)

// Arrays (listas)
let frutas = ["manzana", "plátano", "naranja"];
let numeros = [1, 2, 3, 4, 5];

// Objetos
let persona = {
    nombre: "Michel",
    edad: 25,
    ciudad: "Guadalajara"
};
```

---

## 3. Operadores

```javascript
// Aritméticos
let suma = 5 + 3;        // 8
let resta = 10 - 4;      // 6
let multiplicacion = 6 * 7;  // 42
let division = 20 / 4;   // 5
let modulo = 17 % 5;     // 2 (residuo)
let potencia = 2 ** 3;   // 8 (2 elevado a 3)

// Comparación
let igual = 5 == "5";       // true (compara valor)
let estrictamenteIgual = 5 === "5";  // false (compara valor Y tipo)
let diferente = 5 != 3;     // true
let mayor = 10 > 5;         // true
let menorIgual = 5 <= 5;    // true

// Lógicos
let and = true && false;    // false (ambos deben ser true)
let or = true || false;     // true (al menos uno true)
let not = !true;            // false (invierte el valor)

// Asignación
let x = 10;
x += 5;   // x = x + 5  → 15
x -= 3;   // x = x - 3  → 12
x *= 2;   // x = x * 2  → 24
x /= 4;   // x = x / 4  → 6
```

---

## 4. Condicionales

```javascript
// if, else if, else
let hora = 14;

if (hora < 12) {
    console.log("Buenos días");
} else if (hora < 18) {
    console.log("Buenas tardes");
} else {
    console.log("Buenas noches");
}

// Operador ternario (forma corta)
let mensaje = hora < 12 ? "Buenos días" : "Buenas tardes";

// Switch
let dia = "lunes";

switch (dia) {
    case "lunes":
        console.log("Inicio de semana");
        break;
    case "viernes":
        console.log("¡Por fin viernes!");
        break;
    default:
        console.log("Día normal");
}
```

---

## 5. Bucles (Loops)

```javascript
// for - cuando sabes cuántas veces iterar
for (let i = 0; i < 5; i++) {
    console.log(`Iteración ${i}`);
}

// while - mientras se cumpla la condición
let contador = 0;
while (contador < 3) {
    console.log(contador);
    contador++;
}

// do...while - ejecuta al menos una vez
let num = 0;
do {
    console.log(num);
    num++;
} while (num < 3);

// for...of - para recorrer arrays
let colores = ["rojo", "verde", "azul"];
for (let color of colores) {
    console.log(color);
}

// for...in - para recorrer propiedades de objetos
let carro = { marca: "Toyota", modelo: "Corolla", año: 2020 };
for (let propiedad in carro) {
    console.log(`${propiedad}: ${carro[propiedad]}`);
}
```

---

## 6. Funciones

```javascript
// Función tradicional
function saludar(nombre) {
    return `¡Hola, ${nombre}!`;
}
console.log(saludar("Michel")); // ¡Hola, Michel!

// Función con valor por defecto
function sumar(a, b = 0) {
    return a + b;
}
console.log(sumar(5));      // 5
console.log(sumar(5, 3));   // 8

// Arrow function (función flecha) - forma moderna
const multiplicar = (a, b) => a * b;
console.log(multiplicar(4, 5)); // 20

// Arrow function con múltiples líneas
const calcularArea = (base, altura) => {
    const area = (base * altura) / 2;
    return area;
};

// Función que recibe otra función (callback)
function procesarNumero(num, operacion) {
    return operacion(num);
}

const doble = n => n * 2;
console.log(procesarNumero(5, doble)); // 10
```

---

## 7. Arrays (Métodos Importantes)

```javascript
let frutas = ["manzana", "plátano", "naranja"];

// Agregar y quitar elementos
frutas.push("uva");           // Agrega al final
frutas.pop();                 // Quita del final
frutas.unshift("fresa");      // Agrega al inicio
frutas.shift();               // Quita del inicio

// Buscar elementos
let indice = frutas.indexOf("plátano");  // 1
let existe = frutas.includes("mango");    // false

// Métodos de transformación
let numeros = [1, 2, 3, 4, 5];

// map - transforma cada elemento
let dobles = numeros.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter - filtra elementos
let mayoresA2 = numeros.filter(n => n > 2);
// [3, 4, 5]

// find - encuentra el primer elemento que cumple la condición
let primerMayor = numeros.find(n => n > 3);
// 4

// reduce - reduce a un solo valor
let suma = numeros.reduce((total, n) => total + n, 0);
// 15

// forEach - ejecuta una función para cada elemento
numeros.forEach(n => console.log(n));
```

---

## 8. Objetos

```javascript
// Crear un objeto
const persona = {
    nombre: "Michel",
    edad: 25,
    hobbies: ["programar", "leer", "música"],

    // Método (función dentro de objeto)
    saludar: function() {
        return `Hola, soy ${this.nombre}`;
    },

    // Método abreviado
    presentarse() {
        return `Me llamo ${this.nombre} y tengo ${this.edad} años`;
    }
};

// Acceder a propiedades
console.log(persona.nombre);        // Michel
console.log(persona["edad"]);       // 25
console.log(persona.saludar());     // Hola, soy Michel

// Agregar/modificar propiedades
persona.email = "michel@ejemplo.com";
persona.edad = 26;

// Destructuring (extraer valores)
const { nombre, edad } = persona;
console.log(nombre); // Michel

// Spread operator (copiar/combinar objetos)
const copiaPersona = { ...persona };
const personaConCiudad = { ...persona, ciudad: "Guadalajara" };
```

---

## 9. Manipulación del DOM

El DOM (Document Object Model) es la representación de tu página HTML que puedes modificar con JavaScript.

```javascript
// Seleccionar elementos
const titulo = document.getElementById("titulo");
const botones = document.getElementsByClassName("boton");
const parrafos = document.getElementsByTagName("p");

// Selectores modernos (recomendados)
const elemento = document.querySelector(".clase");      // Primer elemento
const elementos = document.querySelectorAll(".clase");  // Todos los elementos

// Modificar contenido
titulo.textContent = "Nuevo título";        // Solo texto
titulo.innerHTML = "<strong>Negrita</strong>"; // Con HTML

// Modificar estilos
titulo.style.color = "blue";
titulo.style.fontSize = "24px";

// Clases
titulo.classList.add("activo");
titulo.classList.remove("inactivo");
titulo.classList.toggle("visible");  // Agrega si no existe, quita si existe

// Atributos
const imagen = document.querySelector("img");
imagen.setAttribute("src", "nueva-imagen.jpg");
imagen.getAttribute("alt");

// Crear elementos
const nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Soy un párrafo nuevo";
document.body.appendChild(nuevoParrafo);
```

---

## 10. Eventos

```javascript
// Agregar evento con addEventListener
const boton = document.querySelector("#miBoton");

boton.addEventListener("click", function() {
    console.log("¡Hiciste clic!");
});

// Con arrow function
boton.addEventListener("click", () => {
    console.log("¡Clic con arrow function!");
});

// Evento con parámetro (event object)
boton.addEventListener("click", (event) => {
    console.log(event.target);  // El elemento que recibió el clic
    event.preventDefault();     // Previene comportamiento por defecto
});

// Eventos comunes
// click      - clic del mouse
// submit     - envío de formulario
// keydown    - tecla presionada
// keyup      - tecla liberada
// mouseover  - mouse encima del elemento
// mouseout   - mouse sale del elemento
// change     - cambio en input/select
// input      - mientras escribes en un input
// load       - cuando carga la página
// DOMContentLoaded - cuando el DOM está listo

// Evento en formulario
const formulario = document.querySelector("form");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();  // Evita que se recargue la página
    const datos = new FormData(formulario);
    console.log(datos.get("nombre"));
});
```

---

## 11. Almacenamiento Local

```javascript
// localStorage - persiste incluso al cerrar el navegador
localStorage.setItem("nombre", "Michel");
const nombre = localStorage.getItem("nombre");
localStorage.removeItem("nombre");
localStorage.clear();  // Borra todo

// Guardar objetos (convertir a JSON)
const usuario = { nombre: "Michel", edad: 25 };
localStorage.setItem("usuario", JSON.stringify(usuario));

// Recuperar objetos
const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

// sessionStorage - se borra al cerrar el navegador
sessionStorage.setItem("temporal", "valor");
```

---

## 12. Promesas y Async/Await

```javascript
// Promesa básica
const promesa = new Promise((resolve, reject) => {
    const exito = true;
    if (exito) {
        resolve("¡Éxito!");
    } else {
        reject("Error");
    }
});

promesa
    .then(resultado => console.log(resultado))
    .catch(error => console.log(error));

// Fetch API (obtener datos de internet)
fetch("https://api.ejemplo.com/datos")
    .then(response => response.json())
    .then(datos => console.log(datos))
    .catch(error => console.log("Error:", error));

// Async/Await (forma más legible)
async function obtenerDatos() {
    try {
        const response = await fetch("https://api.ejemplo.com/datos");
        const datos = await response.json();
        console.log(datos);
    } catch (error) {
        console.log("Error:", error);
    }
}
```

---

## Consejos para VS Code

1. **Extensiones recomendadas:**
   - Live Server (para ver cambios en tiempo real)
   - ESLint (detecta errores)
   - Prettier (formatea tu código)
   - JavaScript (ES6) code snippets

2. **Atajos útiles:**
   - `Ctrl + /` → Comentar línea
   - `Alt + ↑/↓` → Mover línea
   - `Ctrl + D` → Seleccionar siguiente ocurrencia
   - `Ctrl + Shift + L` → Seleccionar todas las ocurrencias

3. **Depuración:**
   - Abre la consola del navegador: `F12` o `Ctrl + Shift + I`
   - Usa `console.log()` para ver valores
   - Usa `debugger;` para pausar la ejecución

---

## Próximo paso

¡Ahora vamos a aplicar todo esto en un proyecto práctico!
Revisa el archivo `02-proyecto-lista-tareas.md` para seguir el tutorial paso a paso.
