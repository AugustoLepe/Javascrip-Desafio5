const botonAgregar = document.querySelector("#nuevaTarea")
const tbodyTareas = document.querySelector("#tareas")
const inputTarea = document.querySelector("#nuevaTarea")
const listaTareas = []
const tareasTotales = document.querySelector("#tareasTotales")
const tareasListas = document.querySelector("#tareasListas")

botonAgregar.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
        agregarTarea()
    }
})

const agregarTarea = () => {
    if (inputTarea.value === "") {
        alert("Ingrese tarea")
        return
    }

    const nuevaTarea = {
        id: listaTareas.length + 1,
        nombre: inputTarea.value,
        estado: false
    }

    listaTareas.push(nuevaTarea)
    actualizarLista()
}

const actualizarLista = () => {
    let html = ""
    let contarTareasListas = 0
    for (let tarea of listaTareas) {
        if (tarea.estado) {
            contarTareasListas++
        }
        html += `
        <tr class="${tarea.estado ? 'bg-success' : 'bg-light'}">
            <td>${tarea.id}</td>
            <td>${tarea.nombre}</td>
            <td class="text-end">
            <button onclick="actualizarEstado(${tarea.id})" class="btn btn-${tarea.estado ? 'success' : 'warning'}">${tarea.estado ? 'Realizado' : 'Pendiente'}</button>
            <button onclick="borrarTarea(${tarea.id})" class="btn btn-danger">Eliminar</button></td>
        </tr>`;
    }
    inputTarea.value = ""
    tbodyTareas.innerHTML = html

    tareasTotales.innerHTML = listaTareas.length
    tareasListas.innerHTML = contarTareasListas
}



const actualizarEstado = (tareaId) => {
    const index = listaTareas.findIndex(tarea => tarea.id === tareaId)
    if (listaTareas[index].estado === false) {
        listaTareas[index].estado = true
    } else {
        listaTareas[index].estado = false
    }
    actualizarLista()
}

const borrarTarea = (tareaId) => {
    const confirmacion = confirm("¿Seguro que desea eliminar la tarea?")
    if (confirmacion) {
        const index = listaTareas.findIndex(tarea => tarea.id === tareaId)
        listaTareas.splice(index, 1)
        actualizarLista()
    }
}