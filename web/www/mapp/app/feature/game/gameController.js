angular.module('app').controller("GameController", function ($scope, $http, $location, $stateParams, $rootScope) {

    $scope.choices = [1, 2, 3];
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
            $http.post("https://battlecheap.cleverapps.io/match/" + $scope.match.id + "/" + $rootScope.user.id, $scope.match);
            $location.path("/match/" + $scope.match.id);
        }
    };

});

angular.module('app').filter("images", function (isMobile) {
    return function (choice, mini) {
        var name = "";

        if (choice === 1)            name = "shifumi-pierre_360"
        else if (choice === 2)       name = "shifumi-feuille_360";
        else if (choice === 3)       name = "shifumi-ciseau_360";

        if (isMobile) {
            if (mini)
                return "./image/" + name + "_tiny.png";
            else
                return "./image/" + name + "_mini.png";
        } else {
            if (mini)
                return "./image/" + name + "_mini.png";
            else
                return "./image/" + name + ".png";
        }

    };
});