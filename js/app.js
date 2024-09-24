const headerMenu = document.querySelector('.hm-header');

console.log(headerMenu.offsetTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 80) {
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 80) {
        headerMenu.classList.add('header-fixed');
    } else {
        headerMenu.classList.remove('header-fixed');
    }
});

/*=========================================
    Tabs
==========================================*/
if (document.querySelector('.hm-tabs')) {
if (document.querySelector('.hm-tabs')) {

    const tabLinks = document.querySelectorAll('.hm-tab-link');
    const tabsContent = document.querySelectorAll('.tabs-content');

    tabLinks[0].classList.add('active');

    if (document.querySelector('.tabs-content')) {
    if (document.querySelector('.tabs-content')) {
        tabsContent[0].classList.add('tab-active');
    }

    for (let i = 0; i < tabLinks.length; i++) {

        tabLinks[i].addEventListener('click', () => {


        tabLinks[i].addEventListener('click', () => {

            tabLinks.forEach((tab) => tab.classList.remove('active'));
            tabLinks[i].classList.add('active');


            tabsContent.forEach((tabCont) => tabCont.classList.remove('tab-active'));
            tabsContent[i].classList.add('tab-active');


        });


    }

}

/*=========================================
    MENU
==========================================*/

const menu = document.querySelector('.icon-menu');
const menuClose = document.querySelector('.cerrar-menu');
const menu = document.querySelector('.icon-menu');
const menuClose = document.querySelector('.cerrar-menu');

menu.addEventListener('click', () => {
menu.addEventListener('click', () => {
    document.querySelector('.header-menu-movil').classList.add('active');
});
});

menuClose.addEventListener('click', () => {
menuClose.addEventListener('click', () => {
    document.querySelector('.header-menu-movil').classList.remove('active');
});

/*=========================================
    CARRITO DE COMPRAS
==========================================*/

// Variables globales para el carrito
let cart = [];
const cartOverlay = document.querySelector('.cart-overlay');
const cartItemsContainer = document.querySelector('.cart-items');
const totalAmountContainer = document.querySelector('.total-amount');

// Función para agregar productos al carrito
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1; // Aumentar la cantidad si el producto ya está en el carrito
    } else {
        cart.push({ ...product, quantity: 1 }); // Agregar un nuevo producto con cantidad 1
    }
    updateCartUI();
}







// Actualizar la interfaz de usuario del carrito
function updateCartUI() {
    const cartCountElement = document.querySelector('.hm-icon-cart span');
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = cartItemCount; // Mostrar la cantidad total de artículos en el carrito
    
    // Actualizar los elementos del carrito en el overlay
    cartItemsContainer.innerHTML = ''; // Limpiar el contenido anterior
    let totalAmount = 0;
    cart.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="item-info">
                <h4>${product.name}</h4>
                <p>Cantidad: 
                    <button class="decrease-quantity" data-id="${product.id}">-</button>
                    ${product.quantity}
                    <button class="increase-quantity" data-id="${product.id}">+</button>
                </p>
                <p>Precio: $${(product.price * product.quantity).toLocaleString()}</p>
                <button class="remove-item" data-id="${product.id}">Eliminar</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalAmount += product.price * product.quantity;
    });
    totalAmountContainer.innerText = `$${totalAmount.toLocaleString()}`;

    const goShopBtn = document.getElementById('go-shop-btn');
    const checkoutBtn = document.getElementById('button-comprar');

    // Mostrar u ocultar el botón de ir a comprar si el carrito está vacío
    if (cart.length === 0) {
        checkoutBtn.style.display = 'none';
        goShopBtn.style.display = 'block';
    } else {
        checkoutBtn.style.display = 'block';
        goShopBtn.style.display = 'none';
    }
    
    // Event listeners para aumentar y disminuir cantidad como el video care chimba ese
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = event.target.getAttribute('data-id');
            const product = cart.find(item => item.id === productId);
            product.quantity += 1; // Incrementar la cantidad
            updateCartUI(); // Actualizar la interfaz de usuario
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = event.target.getAttribute('data-id');
            const product = cart.find(item => item.id === productId);
            if (product.quantity > 1) {
                product.quantity -= 1; // Disminuir la cantidad
            } else {
                cart = cart.filter(item => item.id !== productId); // Eliminar el producto si la cantidad es 1
            }
            updateCartUI(); // Actualizar la interfaz de usuario
        });
    });

    // Event listeners para eliminar productos
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = event.target.getAttribute('data-id');
            cart = cart.filter(product => product.id !== productId);
            updateCartUI();
        });
    });
}
// Event listener para el botón "Ir a comprar"
document.getElementById('go-shop-btn').addEventListener('click', () => {
    // Simula un clic en la pestaña de "Gorras" o redirige a la sección de gorras
    document.querySelector('.hm-tabs li:nth-child(1)').click(); 
    cartOverlay.style.display = 'none'; // Ocultar el carrito
});

// Event Listener para el botón "Agregar al Carrito"
document.querySelectorAll('.hm-btn.btn-primary').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); 

        const productElement = button.closest('.product-item');
        const product = {
            id: productElement.querySelector('h3').innerText, 
            name: productElement.querySelector('h3').innerText,
            price: parseFloat(productElement.querySelector('.precio span').innerText.replace('$', '').replace('.', '')),
            image: productElement.querySelector('img').src,
        };
        addToCart(product); // Llama la función para agregar el producto al carrito
    });
});

// Mostrar el carrito al hacer clic en el icono del carrito
document.querySelector('.hm-icon-cart').addEventListener('click', () => {
    if (cart.length === 0) {
        showAlert("Seleccione un producto antes de realizar la compra.");
    } else {
        cartOverlay.style.display = 'flex'; // Mostrar el carrito si hay productos
    }
});


// Ocultar el carrito cuando se hace clic en la X
document.querySelector('.close-cart').addEventListener('click', () => {
    cartOverlay.style.display = 'none';
});

// Función para mostrar el mensaje de alerta personalizado
function showAlert(message) {
    console.log("Mostrando alerta: ", message);  // Verificar si se llama a la función
    const alertMessage = document.getElementById('mensaje-de-alerta');
    alertMessage.textContent = message;
    alertMessage.style.display = 'block';
    setTimeout(() => {
        alertMessage.style.display = 'none';  // sin esta linea, la linea de abajo 4000 no funciona porque le tenia otras cosas
    }, 4000); // Ocultar el mensaje después de 4 segundos o pues ya lo hablaremos xd 
}


//REDIGIR CUANDO SE ELIMINAR LOS PRODUCTOS Y SE VA A IR A COMPRAR
document.getElementById('go-shop-btn').addEventListener('click', () => {
    // Desactivar todas las pestañas
    document.querySelectorAll('.hm-tab-link').forEach(tab => tab.classList.remove('active'));

    // Activar la pestaña de Gorras, Porque gorras es la primera que esta
    const gorrasTab = document.querySelector('.hm-tab-link:nth-child(1)');
    gorrasTab.classList.add('active');

    // se oculta todo el contenido de las pestañas
    document.querySelectorAll('.tabs-content').forEach(content => content.classList.remove('tab-active'));

    // muestra el contenido de las gorras
    const gorrasContent = document.getElementById('Productos');
    gorrasContent.classList.add('tab-active');

    // desplaza la página hasta la sección de Productos populares
    const productosPopularesSection = document.getElementById('Productos');
    productosPopularesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // ajustar el desplazamiento un poco hacia arriba, mueva el 25 y 500 segun su necidad porque creo que esa cosa con pantalla grande o chica se nos va a joder :V
    setTimeout(() => {
        window.scrollBy(0, 25); // Con esta vuelta, el 25, se cuadro para que quedara  y se viera el productos populares y se vea las gorras y arriba pa que no se oculte esa chimbada
    }, 500); // y esta cosa trabaja de la mano con la de arriba
});



// Escucha los clics en las categorías
document.getElementById('clásicas').addEventListener('click', function(e) {
    e.preventDefault();
    activateTab('tab-clasicas');
});

document.getElementById('exclusivas').addEventListener('click', function(e) {
    e.preventDefault();
    activateTab('tab-exclusivas');
});

document.getElementById('limitada').addEventListener('click', function(e) {
    e.preventDefault();
    activateTab('tab-limitada');
});

document.getElementById('accesorios').addEventListener('click', function(e) {
    e.preventDefault();
    activateTab('tab-accesorios');
});



// Función para activar la pestaña
function activateTab(tabId) {
    // Desactivar todas las pestañas
    const tabs = document.querySelectorAll('.hm-tab-link');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Activar la pestaña seleccionada
    document.getElementById(tabId).classList.add('active');

    // Opción: Desplaza la página a la sección de productos
    const productosSection = document.querySelector('.hm-tabs');
    productosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}








// Función para ocultar todas las secciones de productos
function ocultarSecciones() {
    document.getElementById('Productos').style.display = 'none'; // Oculta Clásicas
    document.getElementById('productos-exclusivas').style.display = 'none'; // Oculta Exclusivas
    document.getElementById('productos-limitada').style.display = 'none'; // Oculta Edición Limitada
    document.getElementById('productos-accesorios').style.display = 'none'; // Oculta Accesorios
}

// Función para mostrar la sección seleccionada
function mostrarSeccion(id) {
    ocultarSecciones(); // Oculta todas las secciones
    document.getElementById(id).style.display = 'block'; // Muestra la sección seleccionada
}

// Asignar eventos de clic a las categorías

// Para pestaña Clásicas
document.getElementById('tab-clasicas').addEventListener('click', function() {
    mostrarSeccion('Productos'); // Muestra la sección de Clásicas
});

// Para pestaña Exclusivas
document.getElementById('tab-exclusivas').addEventListener('click', function() {
    mostrarSeccion('productos-exclusivas'); // Muestra la sección de Exclusivas
});

// Para pestaña Edición Limitada
document.getElementById('tab-limitada').addEventListener('click', function() {
    mostrarSeccion('productos-limitada'); // Muestra la sección de Edición Limitada
});

// Para pestaña Accesorios
document.getElementById('tab-accesorios').addEventListener('click', function() {
    mostrarSeccion('productos-accesorios'); // Muestra la sección de Accesorios
});

// Asignar eventos de clic a las categorías (imágenes)

// Para Clásicas (imagen)
document.getElementById('clásicas').addEventListener('click', function() {
    mostrarSeccion('Productos'); // Muestra la sección de Clásicas
    document.getElementById('tab-clasicas').click(); // Simula el clic en la pestaña de "Clásicas"
});

// Para Exclusivas (imagen)
document.getElementById('exclusivas').addEventListener('click', function() {
    mostrarSeccion('productos-exclusivas'); // Muestra la sección de Exclusivas
    document.getElementById('tab-exclusivas').click(); // Simula el clic en la pestaña de "Exclusivas"
});

// Para Edición Limitada (imagen)
document.getElementById('limitada').addEventListener('click', function() {
    mostrarSeccion('productos-limitada'); // Muestra la sección de Edición Limitada
    document.getElementById('tab-limitada').click(); // Simula el clic en la pestaña de "Edición Limitada"
});

// Para Accesorios (imagen)
document.getElementById('accesorios').addEventListener('click', function() {
    mostrarSeccion('productos-accesorios'); // Muestra la sección de Accesorios
    document.getElementById('tab-accesorios').click(); // Simula el clic en la pestaña de "Accesorios"
});

// Por defecto, mostrar la sección de Clásicas al cargar la página
mostrarSeccion('Productos');






// Función para abrir el modal con la imagen
function openModal(imageSrc) {
    var modal = document.getElementById('imageModal');
    var modalImage = document.getElementById('modalImage');

    var zoomContainer = document.querySelector('.zoom-container');
    
    modal.style.display = 'block';
    modalImage.src = imageSrc;

    // Añadir eventos de zoom y desplazamiento
    modalImage.addEventListener('mousemove', scrollImage); // Desplazar según el mouse
    modalImage.addEventListener('mouseleave', resetZoom);  // Restablecer zoom al salir
}

// Función para cerrar el modal
function closeModal() {
    var modal = document.getElementById('imageModal');
    var modalImage = document.getElementById('modalImage');
    
    modal.style.display = 'none';

    // Remover eventos de zoom y desplazamiento al cerrar
    modalImage.removeEventListener('mousemove', scrollImage);
    modalImage.removeEventListener('mouseleave', resetZoom);
}

// Función para hacer zoom
function zoomImage(event) {
    var modalImage = event.target;
    var zoomLevel = 2; // Nivel de zoom (2x)
    var x = (event.offsetX / modalImage.offsetWidth) * 100;
    var y = (event.offsetY / modalImage.offsetHeight) * 100;
    
    modalImage.style.transformOrigin = x + "% " + y + "%";
    modalImage.style.transform = "scale(" + zoomLevel + ")";
    modalImage.style.cursor = "zoom-out";
}

// Función para restablecer el zoom
function resetZoom(event) {
    var modalImage = event.target;
    modalImage.style.transform = "scale(1)";
    modalImage.style.cursor = "zoom-in";
}

// Función para desplazar la imagen automáticamente
function scrollImage(event) {
    var modalImage = event.target;
    var zoomContainer = document.querySelector('.zoom-container');
    
    var containerRect = zoomContainer.getBoundingClientRect(); // Tamaño del contenedor
    var imageRect = modalImage.getBoundingClientRect();        // Tamaño de la imagen
    
    var offsetX = event.clientX - containerRect.left; // Posición del mouse en X
    var offsetY = event.clientY - containerRect.top;  // Posición del mouse en Y

    var percentageX = offsetX / containerRect.width;  // Posición en porcentaje X
    var percentageY = offsetY / containerRect.height; // Posición en porcentaje Y

    // Calcular el desplazamiento
    var scrollLeft = (imageRect.width - containerRect.width) * percentageX;
    var scrollTop = (imageRect.height - containerRect.height) * percentageY;

    // Desplazar el contenedor
    zoomContainer.scrollLeft = scrollLeft;
    zoomContainer.scrollTop = scrollTop;
}




document.getElementById('submenuButton').addEventListener('click', function() {
    const submenu = document.querySelector('.submenu-vertical');
    submenu.classList.toggle('hidden');
    console.log("Botón presionado, mostrando/ocultando submenú");
});

// Añadir un evento a cada botón que abre un modal
const modalButtons = document.querySelectorAll('[data-toggle="modal"]');

modalButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Cerrar todos los modales abiertos
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            $(modal).modal('hide');  // Ocultar el modal si está abierto
        });

        // Abrir el modal correspondiente al botón clicado
        const targetModal = button.getAttribute('data-target');
        $(targetModal).modal('show');
    });
});






const checkoutBtn = document.getElementById('button-comprar');

// Evento para mostrar el modal de compra y ocultar el carrito
checkoutBtn.addEventListener('click', () => {
    // Ocultar el carrito (sección de productos seleccionados)
    cartOverlay.style.display = 'none'; //Oculta el carrito (sección de productos seleccionados

    // Mostrar el modal de confirmación de compra (dirección y método de pago)
    $('#confirmarCompraModal').modal('show');
});
// Evento para volver a mostrar el carrito si el modal se cierra sin confirmar la compra
$('#confirmarCompraModal').on('hidden.bs.modal', () => {
    // Mostrar el carrito nuevamente si el modal se cierra sin completar la compra
    cartOverlay.style.display = 'flex';
});





// Escuchar cambios en el método de pago para actualizar el formulario
document.getElementById('metodoPago').addEventListener('change', function () {
    const metodoSeleccionado = this.value;
    const metodoPagoInfo = document.getElementById('metodoPagoInfo');
    
    // Limpiar el contenedor
    metodoPagoInfo.innerHTML = '';

    // Mostrar campos según el método de pago seleccionado
    if (metodoSeleccionado === 'tarjeta') {
        metodoPagoInfo.innerHTML = `
            <div class="form-group">
                <label for="numeroTarjeta">Número de Tarjeta</label>
                <input type="text" class="form-control" id="numeroTarjeta" placeholder="Introduce tu número de tarjeta">
            </div>
            <div class="form-group">
                <label for="fechaExpiracion">Fecha de Expiración</label>
                <input type="text" class="form-control" id="fechaExpiracion" placeholder="MM/AA">
            </div>
            <div class="form-group">
                <label for="cvv">CVV</label>
                <input type="text" class="form-control" id="cvv" placeholder="Código CVV">
            </div>
        `;
    } else if (metodoSeleccionado === 'pse') {
        metodoPagoInfo.innerHTML = `
            <div class="form-group">
                <label for="banco">Banco</label>
                <select class="form-control" id="banco">
                    <option value="banco1">Banco pichincha:v</option>
                    <option value="banco2">Bancolombia</option>
                    <!-- Añadir más bancos si es necesario -->
                </select>
            </div>
        `;
    } else if (metodoSeleccionado === 'efectivo') {
        metodoPagoInfo.innerHTML = `
            <p class="texto-blanco">Te proporcionaremos un código para que puedas pagar en puntos de recaudo como Efecty o Baloto.</p>
            <button id="generarCodigoBtn" class="btn btn-warning">Generar Código</button>
            <p id="codigoEfectivo" class="texto-blanco"></p>
        `;




        
        // Añadir el evento para generar código
        document.getElementById('generarCodigoBtn').addEventListener('click', function () {
            const codigo = 'CHINACOTALAMARIKA' + Math.floor(Math.random() * 1000000); // Generar código aleatorio
            document.getElementById('codigoEfectivo').innerText = 'Tu código de pago es: ' + codigo;
        });
    }
});

// Lógica para confirmar la compra
document.getElementById('confirmarCompraBtn').addEventListener('click', function () {
    const direccion = document.getElementById('direccion').value;
    const metodoPago = document.getElementById('metodoPago').value;
    
    if (!direccion) {
        alert('Por favor ingresa tu dirección de envío.');
        return;
    }

    if (metodoPago === 'tarjeta') {
        const numeroTarjeta = document.getElementById('numeroTarjeta').value;
        const fechaExpiracion = document.getElementById('fechaExpiracion').value;
        const cvv = document.getElementById('cvv').value;

        if (!numeroTarjeta || !fechaExpiracion || !cvv) {
            alert('Por favor completa la información de tu tarjeta.');
            return;
        }

        console.log('Pago con tarjeta:', { numeroTarjeta, fechaExpiracion, cvv });
        // Aquí puedes procesar el pago con tarjeta
    } else if (metodoPago === 'pse') {
        const banco = document.getElementById('banco').value;
        if (!banco) {
            alert('Por favor selecciona tu banco.');
            return;
        }

        console.log('Pago con PSE:', banco);
        // Aquí puedes procesar el pago con PSE
    } else if (metodoPago === 'efectivo') {
        const codigoEfectivo = document.getElementById('codigoEfectivo').innerText;
        if (!codigoEfectivo) {
            alert('Por favor genera un código para pagar en efectivo.');
            return;
        }

        console.log('Pago en efectivo:', codigoEfectivo);
        // Aquí puedes procesar el pago en efectivo
    }

    // Cerrar el modal
    $('#confirmarCompraModal').modal('hide');

    // Resetear formulario después de la compra
    document.getElementById('compraForm').reset();
    document.getElementById('metodoPagoInfo').innerHTML = '';
    
    // Opcional: Limpiar el carrito de compras
    cart = [];
    updateCartUI();
});
