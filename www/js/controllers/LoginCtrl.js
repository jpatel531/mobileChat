angular.module('starter').controller('LoginCtrl', function($scope, auth, $state, store) {
  
  if (!auth.isAuthenticated) {

	  auth.signin({
	    popup: true,
	    // Make the widget non closeable
	    standalone: true,
	    // This asks for the refresh token
	    // So that the user never has to log in again
	    authParams: {
	      scope: 'openid offline_access'
	    }
	  }, function(profile, idToken, accessToken, state, refreshToken) {
	    store.set('profile', profile);
	    store.set('token', idToken);
	    store.set('refreshToken', refreshToken);
	    $state.go('chat');
	  }, function(error) {
	    console.log("There was an error logging in", error);
	  });  	
  }

})