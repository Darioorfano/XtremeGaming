
var btnLogin = document.getElementById("btnLoginGoogle");
var btnLogout = document.getElementById("btnLogoutGoogle");

// Para verificar si hay usuario activo
firebase.auth().onAuthStateChanged(function(user){
    console.log(user)
    if (user) {
        console.log("tenemos usuario");
        mostrarCerrar();
    }else{
        console.log("no tenemos usuario");
        mostrarIniciar();
    }
});

//Inicio de sesion datosDelUsuario=result
btnLogin.addEventListener("click", function(){
    //event.preventDefault();  evita que se recargue la pag
    var provider = new firebase.auth.GoogleAuthProvider();
  
    firebase.auth().signInWithPopup(provider)
    .then(function(datosUsuario){
        console.log(datosUsuario)
        window.location.replace("https://xtremegaming.firebaseapp.com/miCuenta.html");
      
    }).catch(function(err){
        console.log(err)
    })
});

//Cierre de sesion
btnLogout.addEventListener("click", function(){
    //event.preventDefault();  evita que se recargue la pag
    firebase.auth().signOut().then(function(){
        alert("se ha cerrado la sesion")
    })
})
/*
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}
*/
//Funciones para mostrar y ocultar botones
/*
function mostrarCerrar(){
    btnLogin.style.display="none";
    btnLogout.style.display="block";
}

function mostrarIniciar(){
    btnLogout.style.display="none";
    btnLogin.style.display="block";
}
*/






/*

function IngresoConGoogle(){
var provider= new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user);
  window.location.replace("https://xtremegaming.firebaseapp.com/miCuenta.html");
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...

});


firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});

}

function  IngresoConFacebook(){
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    window.location.replace("https://xtremegaming.firebaseapp.com/miCuenta.html");
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  
  
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });


}


    */



