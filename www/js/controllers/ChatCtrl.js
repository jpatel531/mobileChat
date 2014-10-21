angular.module('starter').controller('ChatCtrl', ['$scope', '$http', '$pusher', 'auth', '$stateParams', function($scope, $http, $pusher, auth, $stateParams){

  var firstUserId = $stateParams.firstUser
  var secondUserId = $stateParams.secondUser

  console.log($stateParams);


  $scope.auth = auth

  // Pusher setup

  var client = new Pusher('b71aabfe931fe51bd8ad', {authEndpoint: 'http://localhost:3000/presence/auth'});
  var pusher = $pusher(client);
  var channel = pusher.subscribe('chat-channel');

  // Get members

  var presenceChannel = pusher.subscribe('presence-users');
  $scope.members = presenceChannel.members



  // Get messages

  $http.get('http://localhost:3000/chat/' + firstUserId + '/' + secondUserId + '/messages').success(function(data){
    console.log(data);
    $scope.messages = data || []
  });


   // Send messages 

  $scope.message = {from: $scope.auth.profile.nickname} 
  // $scope.messages = []

  channel.bind('new-message', function(message){
    $scope.messages.push(message)
  });

  $scope.sendMessage = function(event){
    if (event.keyCode === 13) {
      $scope.message.timestamp = new Date();
      $http.post('http://localhost:3000/chat/' + firstUserId + '/' + secondUserId + '/messages', $scope.message).success(function(data){ 
        $scope.message.body = ""
      })
    }
  };
  
}]);