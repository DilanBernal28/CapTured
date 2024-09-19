const btnRegistrar = document.getElementById('btnRegistrar');

btnRegistrar.addEventListener('click', () =>{
    const entrada = document.getElementById('entrada');
    const nombre = entrada.value;
    localStorage.setItem('nombre', nombre);
}) ;

const btnImprimir = document.getElementById('btnImprimir');
btnImprimir.addEventListener('click', () =>{
    const nombre = localStorage.getItem('nombre');
    const parrafo = document.getElementById('parrafo');
    parrafo.innerText = nombre
})

document.addEventListener('DOMContentLoaded', () =>{
    document.title = document.title + " " + localStorage.getItem('nombre');
})
const btnEliminar = document.getElementById('btnEliminar');
btnEliminar.addEventListener('click', () => {
    localStorage.removeItem('nombre');
    localStorage.clear()
})