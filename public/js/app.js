
var btnLoginGoogle = document.getElementById("btnLoginGoogle");

var btnLogout = document.getElementById("btnLogout");

var fotoPerfil=document.getElementById("fotoPerfil");

var nombreUsuario=document.getElementById("nombreUsuario");

var btnLoginFacebook=document.getElementById("btnLoginFacebook");



var btnCustomBackground=document.getElementById("btnCustomBackground");

var miCuenta=document.getElementById("miCuenta");
// Para verificar si hay usuario activo
firebase.auth().onAuthStateChanged(function(user){
    console.log(user)
    if (user) {
        console.log("Se encuentra conectado");
        
        var displayName= user.displayName;
        var email= user.email;
        var emailVerified= user.emailVerified;
        var photoURL= user.photoURL;
      
        var isAnonymous= user.isAnonymous;
        var uid=user.uid;
        var providerData=user.providerData;
        
        fotoPerfil.innerHTML=`<img src=${photoURL} alt="foto de perfil">`;
       nombreUsuario.innerHTML=`<p>Bienvenido ${displayName}</p>`;
       nombreUsuario.style.color="white";
        
        mostrarCerrar();
    }else{
        console.log("No se ha encontrado el usuario");
        miCuenta.style.display="none";
        mostrarIniciar();
    }
});


//Inicio de sesion datosDelUsuario=result
if(btnLoginFacebook){
    btnLoginFacebook.addEventListener("click",function(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(function(datosUsuario){
            console.log(datosUsuario)
            window.location.replace("http://127.0.0.1:5500/public/miCuenta.html"); 
           // window.location.replace("/miCuenta.html");
           //Cuando termine cambiar el replace asi  /miCuenta.html// 
        }).catch(function(err){
            console.log(err)
        })
    
    
    });

}
if(btnLoginGoogle){
    btnLoginGoogle.addEventListener("click", function(){
        //event.preventDefault();  evita que se recargue la pag
            var provider = new firebase.auth.GoogleAuthProvider();
      
            firebase.auth().signInWithPopup(provider)
            .then(function(datosUsuario){
                console.log(datosUsuario)
                window.location.replace("http://127.0.0.1:5500/public/miCuenta.html"); 
                
                //window.location.replace("/miCuenta.html");
               /*Cuando termine cambiar el replace asi  /miCuenta.html*/ 
            }).catch(function(err){
                console.log(err)
            })
    
    
    });
}

if(btnLogout){
    btnLogout.addEventListener("click",function(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
               console.log("Se ha desconectado Correctamente");
                window.location.replace("http://127.0.0.1:5500/public/index.html");
          }).catch(function(error) {
            // An error happened.
          })
    
    
    });

}


   

function mostrarCerrar(){
    btnLogin.style.display="none";
    btnLogout.style.display="block";
    btnCustomBackground.style.display="flex";
}

function mostrarIniciar(){
    btnLogout.style.display="none";
    btnLogin.style.display="block";
    btnCustomBackground.style.display="none";
}
