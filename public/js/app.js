var btnLoginGoogle = document.getElementById("btnLoginGoogle");

var btnLogout = document.getElementById("btnLogout");

var fotoPerfil = document.getElementById("fotoPerfil");

var nombreUsuario = document.getElementById("nombreUsuario");

var btnLoginFacebook = document.getElementById("btnLoginFacebook");
var btnCustomBackground = document.getElementById("btnCustomBackground");
var miCuenta = document.querySelector(".micuenta");
var miCuentaResponsive=document.querySelector(".miCuentaResponsive");
var iconoLogin = document.querySelector(".usuario");

// Para verificar si hay usuario activo
firebase.auth().onAuthStateChanged(function (user) {

    console.log(user)
    if (user) {
        console.log("Se encuentra conectado");

        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;

        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        
        if(fotoPerfil){
            fotoPerfil.innerHTML = `<img src=${photoURL} alt="foto de perfil">`;
            nombreUsuario.innerHTML = `<p>Bienvenido ${displayName}</p>`;
            nombreUsuario.style.color = "white";
           
        }
        
        iconoLogin.style.display="none";
       
      
    } else {
        console.log("No se ha encontrado el usuario");
   
        
        miCuentaResponsive.href="http://127.0.0.1:5500/public/login.html";
    
        miCuenta.style.display="none";
      
    }

});

//Funcion registrar
var botonRegistrar=document.getElementById("boton-registrarse");

if(botonRegistrar){
    botonRegistrar.addEventListener("click",function(){
        var email=document.getElementById("emailRegistro").value;
        var password=document.getElementById("contraseñaRegistro").value;
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log("Registro correcto");
     
            window.location.replace=("http://127.0.0.1:5500/public/miCuenta.html");
        
         
      
            console.log(user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Escriba de manera correcta su mail");
          console.log(errorMessage);
        });
    
    
    
    });


}

/*
function mostrarCerrar() {
    btnLogin.style.display = "none";
    btnLogout.style.display = "block";
    btnCustomBackground.style.display = "flex";
    btnLoginGoogle.style.display = "none";
    miCuenta.style.display="flex";

}

function mostrarIniciar() {
    btnLogout.style.display = "none";
    btnLogin.style.display = "block";
    btnCustomBackground.style.display = "none";
    miCuenta.style.display="none";
     
}
*/
var botonInicioSesion=document.getElementById("botonInicioSesion");

if(botonInicioSesion){

botonInicioSesion.addEventListener("click",function(event){
    event.preventDefault();
    var email=document.getElementById("inputEmail").value;
var password=document.getElementById("inputPassword").value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {

        window.location.replace("http://127.0.0.1:5500/public/miCuenta.html");
        console.log(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });


});

}



//Inicio de sesion datosDelUsuario=result
if (btnLoginFacebook) {
    btnLoginFacebook.addEventListener("click", function () {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function (datosUsuario) {
                console.log(datosUsuario)

                //window.location.replace("/miCuenta.html");
                window.location.replace("http://127.0.0.1:5500/public/miCuenta.html");
            }).catch(function (err) {
                console.log(err)
            })


    });

}
if (btnLoginGoogle) {
    btnLoginGoogle.addEventListener("click", function () {
        //event.preventDefault();  evita que se recargue la pag
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(function (datosUsuario) {
                console.log(datosUsuario)


                window.location.replace("http://127.0.0.1:5500/public/miCuenta.html");
                //window.location.replace("/miCuenta.html");

            }).catch(function (err) {
                console.log(err)
            })


    });
}

if (btnLogout) {
    btnLogout.addEventListener("click", function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("Se ha desconectado Correctamente");
            //window.location.replace("/index.html");
            window.location.replace("http://127.0.0.1:5500/public/index.html");
        }).catch(function (error) {
            // An error happened.
        })


    });

}




var bgUser = document.getElementById("backgroundUser");
var buttonSave = document.getElementById("button-save");

if(buttonSave){

buttonSave.addEventListener("click", function () {
    //devuelva el elemento que está checkeado,ya te devuelve el que necesitas
    var radios = document.querySelector(".radios:checked").value;
    //Esto para localhost
    //var url = "../public/img/" + radios;

    var url = "../img/" + radios;

    //Segun el input radio que seleccione el usuario, se establecera dicha imagen de portada
    bgUser.style.backgroundImage = `url(${url})`;


});


}








