var app = angular.module("MainApp", ['ngRoute', 'ui.bootstrap', 'blockUI', 'ngAnimate', 'ngFileUpload']);
app.config(function ($routeProvider) {

    $routeProvider
    .when("/", {
        templateUrl: "/Admin/Subject/List"

    })
    .when("/Blogs", {
        templateUrl: "/Admin/Blog/List"
    })
    .when("/Blog/Create", {
        templateUrl : "/Admin/Blog/Create"
    })
    .when('/Blog/Edit/:blogId', {
        templateUrl: "/Admin/Blog/Create",
        controller: "CreateBlogController"
    })
});

app.factory('SubjectService', function ($rootScope,$http) {
    var subService = {
        asyncGetSubjectItems: function()
        {
            var promise = $http.get('/Admin/Subject/GetSubjectItems').then(function (response) {
                $rootScope.subjectItems = response.data;
                var selectItems = new Array();
                selectItems.push({ Key : 0 , Value : "Select subject" })
                for (var i = 0; i < response.data.length; i++)
                {
                    selectItems.push(response.data[i]);
                }
                $rootScope.subjectSelectItems = selectItems;
                return response.data;
            })
            return promise;
        }
    };
    return subService;
})

app.run(function ($rootScope, blockUI, $http, SubjectService) {
    $rootScope.$on('$routeChangeStart', function () {

        //show loading gif
        blockUI.start()

    });

    $rootScope.$on('$routeChangeSuccess', function () {

        //hide loading gif
        blockUI.stop()

    });

    $rootScope.$on('$routeChangeError', function () {

        //hide loading gif
        blockUI.stop()
    });

    $rootScope.subjectItems = new Array();
    $rootScope.subjectSelectItems = new Array();
    SubjectService.asyncGetSubjectItems();

    $rootScope.contentTypeText = 1;
    $rootScope.contentTypeCode = 2;
    $rootScope.contentTypePhoto = 3;
    $rootScope.contentTypeQuote = 4;
    $rootScope.contentTypeYoutubeVideo = 5;
    
    $rootScope.activeMenuItem = '';
    $rootScope.navItemSubject = 'subject';
    $rootScope.navItemBlog = 'blog';
    $rootScope.activeBlogNavItem = function()
    {
        $rootScope.activeMenuItem = $rootScope.navItemBlog;
    }
    $rootScope.activeSubjectNavItem = function()
    {
        $rootScope.activeMenuItem = $rootScope.navItemSubject;
    }
});

