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
        var photoURL = user.photoURL ? user.photoURL : "img/user-default.png";
        
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
        
        
        miCuentaResponsive.href="/login.html";
        
        
        miCuenta.style.display="none";
        
    }
    
});


function caracteresRestantes(){
    var maximo =1000;
    var error=false;
    var mensajeError=document.getElementById("mensajeError");
    var mostrarCaracteres=document.getElementById("mostrarCaracteres");
    var textArea= document.getElementById("textArea").value.length;
    var enviar=document.getElementById("enviar");
    var caracteres_restantes = maximo - textArea;
    
    enviar.addEventListener("click",function(){


        if(textArea <=0){
            mensajeError.innerHTML="<p> El contenido no puede quedar vacio </p>";
            mensajeError.style.color="red";
    
        }


    });
    
    
    
    if (error) {
        
        return false;
    
    }else{
        mostrarCaracteres.innerHTML="<p> Caracteres restantes: </p>" +caracteres_restantes;
        return true;
    }
    
}
    document.getElementById("textArea").addEventListener("keyup",caracteresRestantes());
    document.getElementById("enviar").addEventListener("click",caracteresRestantes());


    //Ver porque no cambia a otro type y no desaparece el icono//
var mostrarPassword=document.querySelector("#mostrarOjito");
var ocultarPassword=document.querySelector("#ocultarOjito");
var ojito=document.querySelector("#ojito");
var inputPassword=document.querySelector("#inputPassword");

    if(ojito){
        ojito.addEventListener('click', function(){
            //Si esta en password cambiamos a tipo text
            if(inputPassword.type == "password"){
              inputPassword.setAttribute("type","text");
                
                mostrarPassword.style.display="none";
                ocultarPassword.style.display="flex";
            }
            else {
              inputPassword.setAttribute("type","password");
                mostrarPassword.style.display="flex";
              ocultarPassword.style.display="none";
            }
          });
    

    }
   


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
                        window.location="/login.html";
                    }).catch(function(error) {
                        // An error happened.
                    });
                    
                    
                     window.location.replace=("/miCuenta.html");
                    
                    
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
            
            window.location.replace("/miCuenta.html");
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
            
            
            window.location.replace("/miCuenta.html");
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
            
            
            window.location.replace("/miCuenta.html");
      
            
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
            
            window.location.replace("/index.html");
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
        var url = "../img/" + radios;
        
        
        /*Esto para localhost
        var url = "../public/img/" + radios;
        */
        
        
        //Segun el input radio que seleccione el usuario, se establecera dicha imagen de portada
        bgUser.style.backgroundImage = `url(${url})`;
        
        
    });
    
    
}








