function registrar(){
var email= document.getElementById("inputEmail").value;
var contraseña= document.getElementById("inputPassword").value;


/*Registrar Usuarios nuevos*/ 
firebase.auth().createUserWithEmailAndPassword(email,contraseña)
  .then((user) => {
    // Signed in
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

}

function ingreso (){

var emailRegistro=document.getElementById("emailRegistro").value;
var contraseñaRegistro=document.getElementById("contraseñaRegistro").value;


    firebase.auth().signInWithEmailAndPassword(emailRegistro,contraseñaRegistro)
    .then((user) => {
      // Signed in
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });

}
function datosUsuarios(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
       console.log("existe usuario");
            var displayName=user.displayName;
       var email=user.email;
       var emailVerified=user.emailVerified;
       var photoURL=user.photoURL;
       var isAnonymous= user.isAnonymous;
       var uid = user.uid;
        var providerData=user.providerData;
        } else {
          // User is signed out
          console.log("no existe usuario");
        }
      });
}
datosUsuarios();