angular.module('starter').controller('LoginCtrl', function($scope, auth, $state, store, $http, $pusher, $location) {
  
  var client = new Pusher('b71aabfe931fe51bd8ad', {authEndpoint: 'http://localhost:3000/presence/auth'});
  var pusher = $pusher(client);
  var presenceChannel = pusher.subscribe('presence-users');

  $scope.members = presenceChannel.members

  $scope.chatWith = function(email){
  	$http.post('http://localhost:3000/chat/new', {users: [$scope.members.me.info.email, email]}).success(function(data){
  		var path = "chat/" + data.join("/");
  		// console.log(path);
  		// $state.go(path);
  		$location.url(path);
  	})
  };


  if (!auth.isAuthenticated) {

	  auth.signin({
	    popup: true,
	    standalone: true,
	    authParams: {
	      scope: 'openid offline_access'
	    }
	  }, function(profile, idToken, accessToken, state, refreshToken) {

	  	$http.post('http://localhost:3000/presence/new_signup', profile).then(function(){
		    store.set('profile', profile);
		    store.set('token', idToken);
		    store.set('refreshToken', refreshToken);
	  	});

	  }, function(error) {
	    console.log("There was an error logging in", error);
	  });  	
  }



});

angular.module('starter').filter('excludeThis', function(){

	return function(members, me){
		delete members[me.id]
		return members
	}

});
