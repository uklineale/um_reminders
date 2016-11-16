angular.module('umr', [])
  .controller('umrController', ['$http', '$scope', function($http, $scope) {
    $scope.visits = [];

    $scope.add = function(visit) {
      $http.post('http://localhost:3000/api/visit', visit);
    }
    $scope.send = function(message) {
      $http.post('http://localhost:3000/api/send', message);
    }
    $scope.uploads = function() {
      $http.get('http://localhost:3000/api/uploads')
        .success(function(data, status){
          $scope.visits = data;
        })
        .error(function(data, status){
          alert('Error in peek() index.js');
        });
    }

    $scope.uploads()
  }]);
