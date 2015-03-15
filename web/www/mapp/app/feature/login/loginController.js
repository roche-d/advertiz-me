angular.module('app').controller("LoginController", function ($scope, $http, $location, $rootScope) {

    $scope.user = $rootScope.user = {};

    $scope.onClick = function (value) {
        $http.post("https://battlecheap.cleverapps.io/login",  $scope.user).success(function(data){
            $scope.user = data;
        });
        $location.path("/home/");
    };

});