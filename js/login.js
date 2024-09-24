const url = 'http://localhost:8080/usr/user'


document.getElementById('login-box').addEventListener('submit', function(event) {
    event.preventDefault();
    getUser();
});

async function getToken(){
    
}
async function getUser(){
    const usrUsername = document.getElementById('username').value;
    const usrPassword = document.getElementById('password').value;

    const user = await fetch(url+'/nm/'+usrUsername, {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('moder:1234')
        }
    }).then(response => {
        switch(response.status){
            case 202:
                console.log("hola");
                return response.json();
            case 404:
                console.log("no encontrao")
                break
            default:
                throw new Error(`Error inesperado: ${response.status}`)
        }
    })
    .catch(error => {
        console.log('xd' + error)
    })

    if(usrPassword == user.usrPassword){
        console.log("paswo correcto")
    }else {
        console.log('inccorecto paswo')
    }
}