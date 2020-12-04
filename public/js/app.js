function registrar(){
var email= document.getElementById("inputEmail").value;
var contraseña= document.getElementById("inputPassword").value;


/*Registrar Usuarios nuevos*/ 

firebase.auth().createUserWithEmailAndPassword(email, contraseña)
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