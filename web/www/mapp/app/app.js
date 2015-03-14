var app = angular.module('app', ['ui.bootstrap', 'ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "app/feature/home/home.html",
            controller:"HomeController"
        });
});