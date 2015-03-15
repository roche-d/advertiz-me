angular.module('app').controller("MatchController", function ($scope,$http,$state,$interval) {

    $scope.competitor = "Noel_2412";
    $scope.loading = true;

    var stop;
    $scope.poll = function() {
        if ( angular.isDefined(stop) ) return;

        stop = $interval(function() {
            $http.get("https://battlecheap.cleverapps.io/match/"+$state.params.id).then(function(){
                if(data.end){
                    $scope.stopFight();
                }
            });
        }, 500);
    };

    $scope.stopFight = function() {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
        $scope.loading = false;
    };

    $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $scope.stopFight();
    });

    $scope.poll();
});