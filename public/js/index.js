angular.module('umr', [])
  .controller('umrController', ['$http', '$scope', function($http, $scope) {
    $scope.visits = [1,2,3,4,5,6];

    $scope.add = function(visit) {
      $http.post('http://localhost:3000/api/visits', visit);
    }
    $scope.send = function(message) {
      $http.post('http://localhost:3000/api/send', message);
    }
    $scope.uploads = function() {
      $http.get('http://localhost:3000/api/uploads')
        .success(function(data, status){
          $scope.visits = data;
          console.log(data);
        })
        .error(function(data, status){
          alert('Error in uploads() index.js');
        });
    }

    $scope.uploads()
  }]);
