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
        /*Condicional ternario la primera parte antes del ? es la condicion, luego y antes de los :
        es  lo que devuelve si la condicion es verdadera y despues de los 2: la condicion es falsa*/ 
        var photoURL = user.photoURL ? user.photoURL : "img/default-avatar.png";
        
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        
        if(fotoPerfil){
            fotoPerfil.innerHTML = `<img src=${photoURL} alt="foto de perfil">`;
            nombreUsuario.innerHTML = `<p>Bienvenido ${displayName}</p>`;
            nombreUsuario.style.color = "white";
            
        }
        
        iconoLogin.style.display="none";
        
        miCuentaResponsive.style.display="flex";
        
    } else {
        console.log("No se ha encontrado el usuario");
        
        
        miCuentaResponsive.href="http://127.0.0.1:5500/public/login.html";
        // miCuentaResponsive.href="/login.html";
        
        miCuenta.style.display="none";
        
    }
    
});
/*
function validacionEmail(email){
    var dominios=["outlook","gmail","hotmail","live"];
    var dominio = email.split('@')[1]
    
    
    dominios.forEach(i => {
        console.log(dominio.includes(i) );
        if(dominio.includes(i)){
            return true;
        } 
    });
    return false;
}
*/
function validacionContraseña(contraseña){
    var expresionRegularContraseña=/^[0-9a-zA-Z]{8,16}$/;
    var errorContraseña=document.getElementById("errorContraseña");
    if(expresionRegularContraseña.test(contraseña)){
    return true;
    }else{
        errorContraseña.innerHTML="La contraseña debe contener una longitud minima de 8 caracteres y una maxima de 16";
        errorContraseña.style.color="red";
        return false;
    }

}

//Funcion registrar
var botonRegistrar=document.getElementById("boton-registrarse");

if(botonRegistrar){
    botonRegistrar.addEventListener("click",function(event){
        event.preventDefault();
        var emailRegistro=document.getElementById("emailRegistro").value;
        var passwordRegistro=document.getElementById("contraseñaRegistro").value;
        var nombreRegistro=document.getElementById("nombreRegistro").value;
        
        
        console.log("EmailRegistro:"+emailRegistro);
        console.log("Contraseña"+passwordRegistro);
            if(validacionContraseña(passwordRegistro)){


                firebase.auth().createUserWithEmailAndPassword(emailRegistro, passwordRegistro)
                .then((user) => {
                    console.log("Registro correcto");
                    var currentUser = firebase.auth().currentUser;
                    
                    currentUser.updateProfile({
                        displayName: `${nombreRegistro}`
                        
                    }).then(function() {
                        window.location="http://127.0.0.1:5500/public/login.html";
                    }).catch(function(error) {
                        // An error happened.
                    });
                    
                    
                    // window.location.replace=("/miCuenta.html");
                    
                    
                    console.log(user);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    
                    console.log(errorCode);
                    console.log(errorMessage);
                    
                });


                
            }


        
           
        
        
        
    });
    
    
}


var botonInicioSesion=document.getElementById("botonInicioSesion");

if(botonInicioSesion){
    
    botonInicioSesion.addEventListener("click",function(event){
        event.preventDefault();
        var email=document.getElementById("inputEmail").value;
        var password=document.getElementById("inputPassword").value;
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            
            window.location.replace("http://127.0.0.1:5500/public/miCuenta.html");
            //window.location.replace("/miCuenta.html");
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
            // window.location.replace("/miCuenta.html");
            
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
            // window.location.replace("/index.html");
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
        var url = "../public/img/" + radios;
        
        //var url = "../img/" + radios;
        
        //Segun el input radio que seleccione el usuario, se establecera dicha imagen de portada
        bgUser.style.backgroundImage = `url(${url})`;
        
        
    });
    
    
}








