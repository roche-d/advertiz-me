angular.module('app').controller("GameController", function ($scope, $http, $location, $stateParams,$rootScope) {

    $scope.choices = [1,2,3];
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
            $http.post("https://battlecheap.cleverapps.io/match/" + $scope.match.id+"/"+$rootScope.user.id, $scope.match);
            $location.path("/match/" + $scope.match.id);
        }
    };

});

angular.module('app').filter("images", function() {
    return function(choice) {
        if (choice === 1)            return "rock"
        else if (choice === 2)       return "leaf";
        else if (choice === 3)       return "scissors";
    };
});