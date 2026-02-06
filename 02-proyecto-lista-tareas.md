# Proyecto Práctico: Lista de Tareas (To-Do App)

## ¿Qué vamos a construir?

Una aplicación de lista de tareas donde podrás:
- Agregar nuevas tareas
- Marcar tareas como completadas
- Eliminar tareas
- Las tareas se guardan en el navegador (no se pierden al recargar)

---

## Estructura del Proyecto

```
CursoDeJS/
├── proyecto-todo/
│   ├── index.html      ← Estructura de la página
│   ├── styles.css      ← Estilos visuales
│   └── script.js       ← Lógica de JavaScript
```

---

## Paso 1: Crear la estructura HTML

Abre VS Code y crea un archivo `index.html` en la carpeta `proyecto-todo`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Lista de Tareas</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>📝 Mi Lista de Tareas</h1>

        <!-- Formulario para agregar tareas -->
        <form id="form-tarea">
            <input
                type="text"
                id="input-tarea"
                placeholder="¿Qué necesitas hacer?"
                required
            >
            <button type="submit">Agregar</button>
        </form>

        <!-- Filtros -->
        <div class="filtros">
            <button class="filtro activo" data-filtro="todas">Todas</button>
            <button class="filtro" data-filtro="pendientes">Pendientes</button>
            <button class="filtro" data-filtro="completadas">Completadas</button>
        </div>

        <!-- Lista de tareas -->
        <ul id="lista-tareas">
            <!-- Las tareas se agregarán aquí con JavaScript -->
        </ul>

        <!-- Contador -->
        <p class="contador">
            <span id="contador-pendientes">0</span> tareas pendientes
        </p>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

**Explicación:**
- El `form` captura cuando el usuario quiere agregar una tarea
- `data-filtro` es un atributo personalizado que usaremos en JavaScript
- El `ul` vacío es donde aparecerán las tareas dinámicamente
- El `script` va al final para que el HTML cargue primero

---

## Paso 2: Agregar los estilos CSS

Crea el archivo `styles.css`:

```css
/* Reset básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 40px 20px;
}

.container {
    max-width: 500px;
    margin: 0 auto;
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 2rem;
}

/* Formulario */
#form-tarea {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

#input-tarea {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

#input-tarea:focus {
    outline: none;
    border-color: #667eea;
}

#form-tarea button {
    padding: 12px 24px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
}

#form-tarea button:hover {
    background: #5a67d8;
}

/* Filtros */
.filtros {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
}

.filtro {
    padding: 8px 16px;
    background: #f0f0f0;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.9rem;
}

.filtro:hover {
    background: #e0e0e0;
}

.filtro.activo {
    background: #667eea;
    color: white;
}

/* Lista de tareas */
#lista-tareas {
    list-style: none;
}

.tarea {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 10px;
    transition: all 0.3s;
}

.tarea:hover {
    background: #f0f0f0;
    transform: translateX(5px);
}

.tarea.completada {
    opacity: 0.6;
}

.tarea.completada .tarea-texto {
    text-decoration: line-through;
    color: #999;
}

/* Checkbox personalizado */
.tarea input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: #667eea;
}

.tarea-texto {
    flex: 1;
    font-size: 1rem;
    color: #333;
}

/* Botón eliminar */
.btn-eliminar {
    background: none;
    border: none;
    color: #dc3545;
    cursor: pointer;
    font-size: 1.2rem;
    opacity: 0;
    transition: opacity 0.3s;
}

.tarea:hover .btn-eliminar {
    opacity: 1;
}

.btn-eliminar:hover {
    color: #c82333;
}

/* Contador */
.contador {
    text-align: center;
    color: #666;
    margin-top: 20px;
    font-size: 0.9rem;
}

/* Animación para nuevas tareas */
@keyframes aparecer {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.tarea {
    animation: aparecer 0.3s ease;
}
```

**Explicación:**
- Usamos Flexbox para organizar los elementos
- Las transiciones hacen la app más fluida
- El botón de eliminar solo aparece al pasar el mouse
- Las animaciones dan feedback visual al usuario

---

## Paso 3: La lógica de JavaScript

Ahora viene lo importante. Crea el archivo `script.js`:

```javascript
// ============================================
// PASO 3.1: Seleccionar elementos del DOM
// ============================================

// Seleccionamos los elementos que vamos a manipular
const formulario = document.getElementById('form-tarea');
const inputTarea = document.getElementById('input-tarea');
const listaTareas = document.getElementById('lista-tareas');
const contadorPendientes = document.getElementById('contador-pendientes');
const botonesFiltro = document.querySelectorAll('.filtro');

// ============================================
// PASO 3.2: Estado de la aplicación
// ============================================

// Este array guardará todas nuestras tareas
let tareas = [];

// El filtro actualmente seleccionado
let filtroActual = 'todas';

// ============================================
// PASO 3.3: Cargar tareas guardadas
// ============================================

// Cuando la página carga, recuperamos las tareas del localStorage
function cargarTareas() {
    // Intentamos obtener las tareas guardadas
    const tareasGuardadas = localStorage.getItem('tareas');

    // Si hay tareas guardadas, las convertimos de JSON a array
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
    }

    // Mostramos las tareas en pantalla
    renderizarTareas();
}

// ============================================
// PASO 3.4: Guardar tareas en localStorage
// ============================================

function guardarTareas() {
    // Convertimos el array a texto JSON y lo guardamos
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// ============================================
// PASO 3.5: Agregar nueva tarea
// ============================================

function agregarTarea(texto) {
    // Creamos un objeto con la información de la tarea
    const nuevaTarea = {
        id: Date.now(),        // ID único basado en timestamp
        texto: texto,          // El texto de la tarea
        completada: false      // Inicialmente no está completada
    };

    // Agregamos la tarea al array
    tareas.push(nuevaTarea);

    // Guardamos en localStorage
    guardarTareas();

    // Actualizamos la pantalla
    renderizarTareas();
}

// ============================================
// PASO 3.6: Cambiar estado de tarea (completar/descompletar)
// ============================================

function toggleTarea(id) {
    // Buscamos la tarea por su ID y cambiamos su estado
    tareas = tareas.map(tarea => {
        if (tarea.id === id) {
            // Invertimos el valor de completada
            return { ...tarea, completada: !tarea.completada };
        }
        return tarea;
    });

    guardarTareas();
    renderizarTareas();
}

// ============================================
// PASO 3.7: Eliminar tarea
// ============================================

function eliminarTarea(id) {
    // Filtramos el array, dejando solo las tareas con ID diferente
    tareas = tareas.filter(tarea => tarea.id !== id);

    guardarTareas();
    renderizarTareas();
}

// ============================================
// PASO 3.8: Filtrar tareas
// ============================================

function filtrarTareas() {
    // Según el filtro activo, devolvemos las tareas correspondientes
    switch (filtroActual) {
        case 'pendientes':
            return tareas.filter(tarea => !tarea.completada);
        case 'completadas':
            return tareas.filter(tarea => tarea.completada);
        default:
            return tareas;
    }
}

// ============================================
// PASO 3.9: Renderizar (mostrar) tareas en pantalla
// ============================================

function renderizarTareas() {
    // Obtenemos las tareas filtradas
    const tareasFiltradas = filtrarTareas();

    // Limpiamos la lista actual
    listaTareas.innerHTML = '';

    // Creamos el HTML para cada tarea
    tareasFiltradas.forEach(tarea => {
        // Creamos el elemento li
        const li = document.createElement('li');
        li.className = `tarea ${tarea.completada ? 'completada' : ''}`;

        // Agregamos el contenido HTML
        li.innerHTML = `
            <input
                type="checkbox"
                ${tarea.completada ? 'checked' : ''}
            >
            <span class="tarea-texto">${tarea.texto}</span>
            <button class="btn-eliminar">🗑️</button>
        `;

        // Agregamos eventos al checkbox y botón eliminar
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => toggleTarea(tarea.id));

        const btnEliminar = li.querySelector('.btn-eliminar');
        btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

        // Agregamos el li a la lista
        listaTareas.appendChild(li);
    });

    // Actualizamos el contador
    actualizarContador();
}

// ============================================
// PASO 3.10: Actualizar contador de tareas pendientes
// ============================================

function actualizarContador() {
    // Contamos las tareas que NO están completadas
    const pendientes = tareas.filter(tarea => !tarea.completada).length;
    contadorPendientes.textContent = pendientes;
}

// ============================================
// PASO 3.11: Configurar eventos
// ============================================

// Evento para el formulario (agregar tarea)
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const texto = inputTarea.value.trim(); // Quitamos espacios extras

    if (texto) {
        agregarTarea(texto);
        inputTarea.value = ''; // Limpiamos el input
        inputTarea.focus();    // Devolvemos el foco al input
    }
});

// Eventos para los botones de filtro
botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        // Quitamos la clase 'activo' de todos los botones
        botonesFiltro.forEach(b => b.classList.remove('activo'));

        // Agregamos 'activo' al botón clickeado
        boton.classList.add('activo');

        // Actualizamos el filtro actual
        filtroActual = boton.dataset.filtro;

        // Volvemos a renderizar
        renderizarTareas();
    });
});

// ============================================
// PASO 3.12: Iniciar la aplicación
// ============================================

// Cuando la página carga, ejecutamos cargarTareas
cargarTareas();

console.log('✅ Aplicación de tareas iniciada');
```

---

## Paso 4: Probar la aplicación

1. **Abre VS Code** y asegúrate de tener la extensión **Live Server** instalada

2. **Haz clic derecho** en `index.html` y selecciona **"Open with Live Server"**

3. **Prueba todas las funcionalidades:**
   - Escribe una tarea y presiona Enter o el botón "Agregar"
   - Haz clic en el checkbox para completar una tarea
   - Pasa el mouse sobre una tarea y haz clic en 🗑️ para eliminarla
   - Usa los filtros para ver solo las tareas pendientes o completadas
   - Recarga la página y verifica que las tareas persisten

---

## Conceptos que aprendiste

| Concepto | Dónde lo usamos |
|----------|-----------------|
| Variables (let, const) | Estado de la app, elementos DOM |
| Arrays y sus métodos | `push`, `map`, `filter` para manejar tareas |
| Objetos | Cada tarea es un objeto con id, texto y completada |
| Funciones | Todas las operaciones están en funciones |
| DOM manipulation | Seleccionar elementos, crear HTML dinámico |
| Eventos | submit, click, change |
| localStorage | Guardar y cargar tareas |
| Template literals | Crear HTML con \`backticks\` |
| Spread operator | `{ ...tarea, completada: !tarea.completada }` |
| Arrow functions | `() => {}` en eventos y callbacks |

---

## Retos adicionales (para practicar)

1. **Editar tareas:** Agrega un botón para editar el texto de una tarea existente

2. **Fecha límite:** Agrega un campo para fecha límite y muestra las tareas que están por vencer

3. **Categorías:** Permite clasificar tareas por categorías (trabajo, personal, etc.)

4. **Modo oscuro:** Agrega un botón para cambiar entre modo claro y oscuro

5. **Animación al eliminar:** Agrega una animación antes de eliminar una tarea

---

## Archivos del proyecto

Los archivos completos están en la carpeta `proyecto-todo/`.
¡Abre esa carpeta en VS Code y empieza a experimentar!
