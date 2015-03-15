var app = angular.module('app', ['ui.bootstrap', 'ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state('home', {
        url: "/",
        templateUrl: "app/feature/home/home.html",
        controller: "HomeController"
    }).state('store', {
        url: "/store",
        templateUrl: "app/feature/store/store.html"
    });
});
