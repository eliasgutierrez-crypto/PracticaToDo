// ============================================
// LISTA DE TAREAS - CURSO DE JAVASCRIPT
// ============================================
// Este archivo contiene toda la lógica de nuestra
// aplicación de lista de tareas (To-Do App)
// ============================================

// ============================================
// PASO 1: Seleccionar elementos del DOM
// ============================================
// Primero necesitamos "agarrar" los elementos HTML
// con los que vamos a trabajar

const formulario = document.getElementById('form-tarea');
const inputTarea = document.getElementById('input-tarea');
const listaTareas = document.getElementById('lista-tareas');
const contadorPendientes = document.getElementById('contador-pendientes');
const botonesFiltro = document.querySelectorAll('.filtro');

// ============================================
// PASO 2: Estado de la aplicación
// ============================================
// El "estado" son los datos que nuestra app necesita
// para funcionar correctamente

// Array que guarda todas las tareas
let tareas = [];

// El filtro actualmente seleccionado
let filtroActual = 'todas';

// ============================================
// PASO 3: Cargar tareas del localStorage
// ============================================
// Cuando abrimos la página, queremos recuperar
// las tareas que guardamos anteriormente

function cargarTareas() {
    // Intentamos obtener las tareas guardadas
    const tareasGuardadas = localStorage.getItem('tareas');

    // Si hay tareas guardadas, las convertimos de JSON a array
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
        console.log('✅ Tareas cargadas:', tareas.length);
    } else {
        console.log('📝 No hay tareas guardadas, empezando desde cero');
    }

    // Mostramos las tareas en pantalla
    renderizarTareas();
}

// ============================================
// PASO 4: Guardar tareas en localStorage
// ============================================
// Cada vez que modificamos las tareas, las guardamos
// para que persistan al cerrar el navegador

function guardarTareas() {
    // Convertimos el array a texto JSON y lo guardamos
    localStorage.setItem('tareas', JSON.stringify(tareas));
    console.log('💾 Tareas guardadas');
}

// ============================================
// PASO 5: Agregar nueva tarea
// ============================================
// Función que se ejecuta cuando el usuario
// quiere agregar una nueva tarea

function agregarTarea(texto) {
    // Creamos un objeto con la información de la tarea
    const nuevaTarea = {
        id: Date.now(),        // ID único basado en la fecha/hora actual
        texto: texto,          // El texto que escribió el usuario
        completada: false      // Inicialmente no está completada
    };

    // Agregamos la tarea al inicio del array (para que aparezca arriba)
    tareas.unshift(nuevaTarea);

    // Guardamos en localStorage
    guardarTareas();

    // Actualizamos la pantalla
    renderizarTareas();

    console.log('➕ Nueva tarea agregada:', texto);
}

// ============================================
// PASO 6: Cambiar estado de tarea
// ============================================
// Cuando el usuario hace clic en el checkbox,
// cambiamos entre completada/pendiente

function toggleTarea(id) {
    // Usamos map para crear un nuevo array
    // modificando solo la tarea con el ID indicado
    tareas = tareas.map(tarea => {
        if (tarea.id === id) {
            // Invertimos el valor de completada (true -> false, false -> true)
            return { ...tarea, completada: !tarea.completada };
        }
        return tarea;
    });

    guardarTareas();
    renderizarTareas();

    console.log('🔄 Tarea actualizada:', id);
}

// ============================================
// PASO 7: Eliminar tarea
// ============================================
// Cuando el usuario hace clic en el botón de eliminar

function eliminarTarea(id) {
    // Usamos filter para crear un nuevo array
    // SIN la tarea que queremos eliminar
    tareas = tareas.filter(tarea => tarea.id !== id);

    guardarTareas();
    renderizarTareas();

    console.log('🗑️ Tarea eliminada:', id);
}

// ============================================
// PASO 8: Filtrar tareas
// ============================================
// Devuelve las tareas según el filtro seleccionado

function filtrarTareas() {
    switch (filtroActual) {
        case 'pendientes':
            // Solo las que NO están completadas
            return tareas.filter(tarea => !tarea.completada);
        case 'completadas':
            // Solo las que SÍ están completadas
            return tareas.filter(tarea => tarea.completada);
        default:
            // Todas las tareas
            return tareas;
    }
}

// ============================================
// PASO 9: Renderizar tareas
// ============================================
// "Renderizar" significa mostrar en pantalla
// Esta función actualiza la lista visual de tareas

function renderizarTareas() {
    // Obtenemos las tareas según el filtro activo
    const tareasFiltradas = filtrarTareas();

    // Limpiamos la lista actual
    listaTareas.innerHTML = '';

    // Si no hay tareas, mostramos un mensaje
    if (tareasFiltradas.length === 0) {
        listaTareas.innerHTML = `
            <li class="sin-tareas">
                ${filtroActual === 'todas'
                    ? '¡No hay tareas! Agrega una nueva.'
                    : `No hay tareas ${filtroActual}.`}
            </li>
        `;
        actualizarContador();
        return;
    }

    // Creamos el HTML para cada tarea
    tareasFiltradas.forEach(tarea => {
        // Creamos el elemento li (list item)
        const li = document.createElement('li');

        // Agregamos las clases CSS
        li.className = `tarea ${tarea.completada ? 'completada' : ''}`;

        // Agregamos el contenido HTML usando template literals
        li.innerHTML = `
            <input
                type="checkbox"
                ${tarea.completada ? 'checked' : ''}
                aria-label="Marcar como ${tarea.completada ? 'pendiente' : 'completada'}"
            >
            <span class="tarea-texto">${escaparHTML(tarea.texto)}</span>
            <button class="btn-eliminar" aria-label="Eliminar tarea">🗑️</button>
        `;

        // Agregamos el evento al checkbox
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => toggleTarea(tarea.id));

        // Agregamos el evento al botón eliminar
        const btnEliminar = li.querySelector('.btn-eliminar');
        btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

        // Agregamos el li a la lista
        listaTareas.appendChild(li);
    });

    // Actualizamos el contador
    actualizarContador();
}

// ============================================
// PASO 10: Actualizar contador
// ============================================
// Muestra cuántas tareas pendientes hay

function actualizarContador() {
    // Contamos las tareas que NO están completadas
    const pendientes = tareas.filter(tarea => !tarea.completada).length;
    contadorPendientes.textContent = pendientes;
}

// ============================================
// PASO 11: Función auxiliar de seguridad
// ============================================
// Evita que alguien inyecte código HTML malicioso

function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// ============================================
// PASO 12: Configurar eventos
// ============================================
// Conectamos las acciones del usuario con nuestras funciones

// Evento cuando se envía el formulario (agregar tarea)
formulario.addEventListener('submit', (e) => {
    // Prevenimos que la página se recargue
    e.preventDefault();

    // Obtenemos el texto y quitamos espacios extras
    const texto = inputTarea.value.trim();

    // Si hay texto, agregamos la tarea
    if (texto) {
        agregarTarea(texto);
        inputTarea.value = '';  // Limpiamos el input
        inputTarea.focus();     // Devolvemos el foco al input
    }
});

// Eventos para los botones de filtro
botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        // Quitamos la clase 'activo' de todos los botones
        botonesFiltro.forEach(b => b.classList.remove('activo'));

        // Agregamos 'activo' al botón que se clickeó
        boton.classList.add('activo');

        // Actualizamos el filtro actual con el valor del data-filtro
        filtroActual = boton.dataset.filtro;

        // Volvemos a renderizar para mostrar las tareas filtradas
        renderizarTareas();

        console.log('🔍 Filtro cambiado a:', filtroActual);
    });
});

// ============================================
// PASO 13: Iniciar la aplicación
// ============================================
// Cuando la página termina de cargar, iniciamos todo

cargarTareas();

console.log('🚀 ¡Aplicación de tareas lista!');
console.log('💡 Tip: Abre la consola del navegador (F12) para ver los logs');
