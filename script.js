// ============================================
// LISTA DE TAREAS - VERSIÓN EXTENDIDA
// ============================================

// ----------------------
// Selección del DOM
// ----------------------
const formulario = document.getElementById('form-tarea');
const inputTarea = document.getElementById('input-tarea');
const inputFecha = document.getElementById('input-fecha');
const inputCategoria = document.getElementById('input-categoria');
const listaTareas = document.getElementById('lista-tareas');
const contadorPendientes = document.getElementById('contador-pendientes');
const botonesFiltro = document.querySelectorAll('.filtro');
const toggleTemaBtn = document.getElementById('toggle-tema');

// ----------------------
// Estado
// ----------------------
let tareas = [];
let filtroActual = 'todas';

// ----------------------
// LocalStorage
// ----------------------
function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    const temaGuardado = localStorage.getItem('tema');

    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
    }

    if (temaGuardado === 'oscuro') {
        document.body.classList.add('oscuro');
    }

    renderizarTareas();
}

function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// ----------------------
// Agregar tarea
// ----------------------
function agregarTarea(texto, fecha, categoria) {
    const nuevaTarea = {
        id: Date.now(),
        texto,
        completada: false,
        fechaLimite: fecha || null,
        categoria: categoria || 'personal'
    };

    tareas.unshift(nuevaTarea);
    guardarTareas();
    renderizarTareas();
}

// ----------------------
// Editar tarea
// ----------------------
function editarTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    const nuevoTexto = prompt('Editar tarea:', tarea.texto);

    if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
        tarea.texto = nuevoTexto.trim();
        guardarTareas();
        renderizarTareas();
    }
}

// ----------------------
// Toggle completada
// ----------------------
function toggleTarea(id) {
    tareas = tareas.map(t =>
        t.id === id ? { ...t, completada: !t.completada } : t
    );

    guardarTareas();
    renderizarTareas();
}

// ----------------------
// Eliminar con animación
// ----------------------
function eliminarTarea(id) {
    const li = document.querySelector(`[data-id="${id}"]`);
    li.classList.add('eliminando');

    setTimeout(() => {
        tareas = tareas.filter(t => t.id !== id);
        guardarTareas();
        renderizarTareas();
    }, 300);
}

// ----------------------
// Filtros
// ----------------------
function filtrarTareas() {
    const hoy = new Date().toISOString().split('T')[0];

    switch (filtroActual) {
        case 'pendientes':
            return tareas.filter(t => !t.completada);

        case 'completadas':
            return tareas.filter(t => t.completada);

        case 'vencen':
            return tareas.filter(
                t => t.fechaLimite && t.fechaLimite <= hoy && !t.completada
            );

        default:
            return tareas;
    }
}

// ----------------------
// Renderizar
// ----------------------
function renderizarTareas() {
    const tareasFiltradas = filtrarTareas();
    listaTareas.innerHTML = '';

    if (tareasFiltradas.length === 0) {
        listaTareas.innerHTML = `
            <li class="sin-tareas">
                No hay tareas para mostrar.
            </li>
        `;
        actualizarContador();
        return;
    }

    tareasFiltradas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = `tarea ${tarea.completada ? 'completada' : ''}`;
        li.dataset.id = tarea.id;

        li.innerHTML = `
            <input type="checkbox" ${tarea.completada ? 'checked' : ''}>
            <span class="tarea-texto">${escaparHTML(tarea.texto)}</span>
            ${tarea.fechaLimite ? `<small class="fecha">📅 ${tarea.fechaLimite}</small>` : ''}
            <small class="categoria">🏷️ ${tarea.categoria}</small>
            <button class="btn-editar">✏️</button>
            <button class="btn-eliminar">🗑️</button>
        `;

        li.querySelector('input[type="checkbox"]')
            .addEventListener('change', () => toggleTarea(tarea.id));

        li.querySelector('.btn-editar')
            .addEventListener('click', () => editarTarea(tarea.id));

        li.querySelector('.btn-eliminar')
            .addEventListener('click', () => eliminarTarea(tarea.id));

        listaTareas.appendChild(li);
    });

    actualizarContador();
}

// ----------------------
// Contador
// ----------------------
function actualizarContador() {
    const pendientes = tareas.filter(t => !t.completada).length;
    contadorPendientes.textContent = pendientes;
}

// ----------------------
// Seguridad
// ----------------------
function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// ----------------------
// Eventos
// ----------------------
formulario.addEventListener('submit', e => {
    e.preventDefault();

    const texto = inputTarea.value.trim();
    const fecha = inputFecha.value;
    const categoria = inputCategoria.value;

    if (texto) {
        agregarTarea(texto, fecha, categoria);
        inputTarea.value = '';
        inputFecha.value = '';
        inputTarea.focus();
    }
});

botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        botonesFiltro.forEach(b => b.classList.remove('activo'));
        boton.classList.add('activo');
        filtroActual = boton.dataset.filtro;
        renderizarTareas();
    });
});

toggleTemaBtn.addEventListener('click', () => {
    document.body.classList.toggle('oscuro');
    const temaActual = document.body.classList.contains('oscuro')
        ? 'oscuro'
        : 'claro';
    localStorage.setItem('tema', temaActual);
});

// ----------------------
// Inicializar
// ----------------------
cargarTareas();
