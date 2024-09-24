var productoContenedor = document.getElementById('grid-product');

const apiUrl = 'http://localhost:8080/prd/product';

async function getProducts() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        const products = await response.json();
        displayProducts(products); // Llamar función para mostrar productos

    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
    }
}

// Función para mostrar los productos en el HTML
function displayProducts(products) {
    productoContenedor.innerHTML = ''; // Limpiar el contenido previo

    products.forEach(product => {
        const productItem = document.createElement('li');
        productItem.id = "productItem";
        productItem.className= "product-item"
        productItem.innerHTML = `<div class="p-portada">
                                <a href="javascript:void(0);" onclick="openModal('img/Exclusivas página.jpeg')">
                                    <img src=".${product.prodImg}" alt="">
                                </a>
                                <span class="stin stin-new">Nuevo</span>
                            </div>
                            <div class="p-info">
                               <a href=""> <h3>WXB Edition Two</h3></a>
                                <div class="precio">
                                    <span>$${product.prodPrecio}</span>
                                </div>
                                <a href="#" class="hm-btn btn-primary uppercase">AGREGAR AL CARRITO</a>
                            </div>`;
        productoContenedor.appendChild(productItem);
    });
}

// Llamar la función cuando cargue la página
getProducts();