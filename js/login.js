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
}, {scope: 'email'});


(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

