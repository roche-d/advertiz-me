angular.module('app').controller("LoaderController", function ($scope, $http, $state, $interval, $stateParams, $location) {

    $scope.loading = true;

    $scope.match = {
        id: $stateParams.id,
        player: {name: "You", selection: [1, 2, 3]},
        competitor: {name: "Noel_2412", selection: [1, 3, 1]}
    };

    $scope.goToHome = function () {
        $location.path("/");
    };

    var stop;
    $scope.poll = function () {
        if (angular.isDefined(stop)) return;

        stop = $interval(function () {
            $http.get("https://battlecheap.cleverapps.io/match/" + $scope.match.id).then(function () {
                if (data.end) {
                    $scope.stopFight();
                }
            });
        }, 500);
    };

    $scope.stopFight = function () {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
        $scope.loading = false;
    };

    $scope.$on('$destroy', function () {
        // Make sure that the interval is destroyed too
        $scope.stopFight();
    });

    $scope.poll();
});