angular.module('umr', [])
  .controller('umrController', ['$http', '$scope', function($http, $scope) {
    $scope.visits = [1,2,3,4,5,6];
	  //Needs changing based on Linode, also there's gotta be a better way
	 var serverUrl = "https://45.56.101.89/api/";

    $scope.add = function(visit) {
      $http.post(serverUrl+'upload', visit);
    }

    $scope.uploads();
  }]);
