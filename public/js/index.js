angular.module('umr', [])
  .controller('umrController', ['$http', '$scope', function($http, $scope) {
    $scope.visits = [1,2,3,4,5,6];
	//Needs changing based on Linode, also there's gotta be a better way
	var serverUrl = "http://45.56.101.89:3000/api/";

    $scope.add = function(visit) {
      $http.post(serverUrl+'visits', visit);
    }
    $scope.send = function(message) {
      $http.post(serverUrl+'send', message);
    }
    $scope.uploads = function() {
      $http.get(serverUrl+'uploads')
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
