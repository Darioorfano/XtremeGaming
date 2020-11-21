function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
  console.log('statusChangeCallback');
  console.log(response);                   // The current login status of the person.
  if (response.status === 'connected') {   // Logged into your webpage and Facebook.
    testAPI();  
  } else {                                 // Not logged into your webpage or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this webpage.';
  }
}


function checkLoginState() {               // Called when a person is finished with the Login Button.
  FB.getLoginStatus(function(response) {   // See the onlogin handler
    statusChangeCallback(response);
  });
}



window.fbAsyncInit = function() {
  FB.init({
    appId      : '1083627838737281',
    cookie     : true,
    xfbml      : true,
    version    : 'v9.0'
  });
    
  FB.AppEvents.logPageView();   
    
};

/*Verifica si la persona esta logueada */ 
FB.getLoginStatus(function(response) {
  statusChangeCallback(response);


});

FB.login(function(response) {
  // handle the response
}, {scope: 'public_profile,email'});


(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

