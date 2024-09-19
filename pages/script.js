document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores de los campos del formulario
    const usrApellidos = document.getElementById('usrApellidos').value;
    const usrDireccion = document.getElementById('usrDireccion').value;
    const usrEmail = document.getElementById('usrEmail').value;
    const usrIdentificacion = document.getElementById('usrIdentificacion').value;
    const usrNombres = document.getElementById('usrNombres').value;
    const usrPassword = document.getElementById('usrPassword').value;
    const usrTelefono = document.getElementById('usrTelefono').value;
    const usrUsername = document.getElementById('usrUsername').value;

    // Crear el objeto de datos a enviar
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

    // Hacer la solicitud POST a la API
    // fetch('http://localhost:8080/usr/user', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
});

// document.getElementById('btn').addEventListener('click', async () => {
//     const usrUsername =  document.getElementById('usrUsername').value;
//     const usrPassword = document.getElementById('usrPassword').value;

//     const userApi = await fetch('http://localhost:8080/usr/user/nm/'+usrUsername).then(response => response.json()).catch(error => {
//         console.error('Error:', error)
//     });
//     console.log(userApi);
    
//     if(usrPassword == userApi.usrPassword && usrUsername != ""){
//         axd.innerHTML = "hola"
//     }else{
//         axd.innerHTML = "<span>Usuario o contrasena incorrectos</span>"
//     }


// })
// const axd = document.querySelector("#abc")
// document.getElementById('xd').addEventListener('submit', function(event){
//     event.preventDefault();
//     const usrUsername =  document.getElementById('usrUsername').value;
//     const usrPassword = document.getElementById('usrPassword').value;

//     const userApi = fetch('http://localhost:8080/usr/user/nm/'+usrUsername).then(response => response.json()).catch(error => {
//         console.error('Error:', error)
//     });
//     console.log(userApi);
//     axd.innerHTML = llamadaApi

// });
