// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'pusher-angular'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

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