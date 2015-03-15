angular.module('app').controller("GameController", function ($scope,$http,$location) {

    $scope.competitor = "Noel_2412";
    $scope.selection = [];
    $scope.selection.id = 1;

    $scope.choices = [{img:"rock"},{img:"leaf"},{img:"scissors"}];
    $scope.countSet = 1;

    $scope.onClick = function (value) {
        $scope.selection.push(value.img);
        $scope.countSet++;
        if($scope.countSet===4){
            $http.post("https://battlecheap.cleverapps.io/match/"+$scope.selection.id,$scope.selection);
            $location.path("/match/"+$scope.selection.id);
        }
    };
});