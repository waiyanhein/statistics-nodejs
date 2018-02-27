var app = angular.module("AuthApp", ['ngRoute', 'ui.bootstrap']);
app.config(function ($routeProvider ,$interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');

    //$routeProvider
    // .when("/", {
    //     templateUrl: "/account/register.html"

    // })
    // .when("/Blogs", {
    //     templateUrl: "/Admin/Blog/List"
    // })
    // .when("/Blog/Create", {
    //     templateUrl : "/Admin/Blog/Create"
    // })
    // .when('/Blog/Edit/:blogId', {
    //     templateUrl: "/Admin/Blog/Create",
    //     controller: "CreateBlogController"
    // })
});