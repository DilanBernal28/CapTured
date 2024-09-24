const url = 'http://localhost:8080/usr/user';
document.getElementById('login-box').addEventListener('submit', function(event) {
    event.preventDefault();
    postDatos()
    // Hacer la solicitud POST a la API
});

async function postDatos() {
    // Obtener los valores de los campos del formulario
    const usrNombres = document.getElementById('usrNombre').value;
    const usrApellidos = document.getElementById('usrApellidos').value;
    const usrUsername = document.getElementById('usrUsername').value;
    const usrEmail = document.getElementById('usrEmail').value;
    const usrDireccion = document.getElementById('usrDireccion').value;
    const usrTelefono = document.getElementById('usrNumeroDeTelefono').value;
    const usrIdentificacion = document.getElementById('usrDocumento').value;
    const usrPassword = document.getElementById('usrPassword').value;
    
    // // Crear el objeto de datos a enviar
    const data = {
        usrApellidos: usrApellidos,
        usrDireccion: usrDireccion,
        usrEmail: usrEmail,
        usrIdentificacion: usrIdentificacion,
        usrNombres: usrNombres,
        usrPassword: usrPassword,
        usrTelefono: usrTelefono,
        usrActive: 'activo',
        usrUsername: usrUsername
    };
    console.log(data);
    
    try {
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            switch(response.status){
                case 201:
                    console.log("hola");
                    return response.json();
                case 302:
                    console.log("nombre de usuario ya existente")
                    break;
                default:
                    throw new Error(`Error inesperado: ${response.status}`)
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });    
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}