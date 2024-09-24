const url = ('http://localhost:8080/prd/product');

document.addEventListener('DOMContentLoaded', () =>{
        var contenedorProductos = document.getElementById('grid-product');

    fetch(url).then(response => {
        switch(response.status){
            case 202:
                contenedorProductos = createElement("div");
                contenedorProductos.innerHTML= "Hola malpardidos"
            case 404:
                console.log("no encontrao")
                break
            default:
                throw new Error(`Error inesperado: ${response.status}`)
        }
    })
})