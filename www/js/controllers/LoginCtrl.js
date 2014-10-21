angular.module('starter').controller('LoginCtrl', function($scope, auth, $state, store, $http, $pusher) {
  
  var client = new Pusher('b71aabfe931fe51bd8ad', {authEndpoint: 'http://localhost:3000/presence/auth'});
  var pusher = $pusher(client);
  var presenceChannel = pusher.subscribe('presence-users');

  $scope.members = presenceChannel.members

  // presenceChannel.bind('pusher:subscription_succeeded', function(members){
  // 	console.log(members);
  // 	$scope.$apply(function(){
  // 		$scope.members = members
  // 		$scope.members.count = members.count
  // 	});
  // });

 //  presenceChannel.bind('pusher:member_added', function(member) {
	//   $scope.$apply(function() {
	//     $scope.members.count = $scope.members.count;
	//   });
	// });

	// presenceChannel.bind('pusher:member_removed', function(member) {
	//   $scope.$apply(function() {
	//      $scope.members.count = $scope.members.count;
	//   });
	// });

  // $scope.members = presenceChannel.members

  // console.log(presenceChannel.members)



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

	  	$http.post('http://localhost:3000/presence/new_signup', profile).then(function(){
		    store.set('profile', profile);
		    store.set('token', idToken);
		    store.set('refreshToken', refreshToken);
		    $state.go('chat');	
	  	});

	  	// POST TO PRESENCE 



	    // console.log(profile)

	  }, function(error) {
	    console.log("There was an error logging in", error);
	  });  	
  }



})