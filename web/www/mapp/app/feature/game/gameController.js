angular.module('app').controller("GameController", function ($scope, $http, $location, $stateParams) {

    $scope.choices = [{img: "rock"}, {img: "leaf"}, {img: "scissors"}];
    $scope.countSet = 1;

    $scope.match = {
        id: $stateParams.id,
        player: {name: "You", selection: []},
        competitor: {name: "Noel_2412"}
    };

    $scope.onClick = function (value) {
        $scope.match.player.selection.push(value);
        value.round = $scope.countSet;
        $scope.countSet++;
        if ($scope.countSet === 4) {
            $http.post("https://battlecheap.cleverapps.io/match/" + $scope.match.id, $scope.match);
            $location.path("/match/" + $scope.match.id);
        }
    };

});