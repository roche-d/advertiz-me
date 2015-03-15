angular.module('app').controller("HomeController",function($scope,$location){


    $scope.goToGame = function () {
        $location.path("/game");
    };

    $scope.goToMatch = function () {
        $location.path("/match/1");
    };

});