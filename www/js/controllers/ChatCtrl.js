angular.module('starter').controller('ChatCtrl', ['$scope', '$http', '$pusher', function($scope, $http, $pusher){

  // Pusher setup

  var client = new Pusher('b71aabfe931fe51bd8ad');
  var pusher = $pusher(client);
  var channel = pusher.subscribe('chat-channel');

  $scope.message = {} 
  $scope.messages = []

  channel.bind('new-message', function(message){
    $scope.messages.push(message)
  });

  $scope.sendMessage = function(event){
    if (event.keyCode === 13) {
      $scope.message.timestamp = new Date();
      $http.post('http://localhost:3000/messages', $scope.message).success(function(data){ 
        $scope.message.body = ""
      })
    }
  };
  
}]);

angular.module('starter').controller('LoginCtrl', ['$scope', '$http', function($http, $scope){}]);