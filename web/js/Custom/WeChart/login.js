var loginModel = angular.module("LoginModel", ["ManagementHttpModule"]);

loginModel.service("LoginService", ["ManagementHttpService", "ResourceFactory", function (ManagementHttpService, ResourceFactory) {
    var service = {};

    //登录
    service.login = function ($scope) {
        var request = $scope.user;
        try {
            ManagementHttpService.loginRequest(request, ResourceFactory.operateCode.get,
                function (response) {
                    $scope.isLoading = false;
                    if (response.Header.StatusCode == 0) {
                        ResourceFactory.saveDataToSession("CurrentUser", response.Body);
                        window.location.href = "MBClinicMG.html";
                    }
                    else {
                        alert("登录失败，请稍后再试！");
                        console.log(response);
                    }
                },
                function (response) {
                    alert("系统繁忙，请稍后再试！");
                    console.log(response);
                });
        }
        catch (e) {
            console.log(e);
        }
    };

    return service;
}]);

loginModel.controller("LoginController", ["$scope", "LoginService", function ($scope, LoginService) {

    //页面初始化
    $scope.initialize = function () {
        $scope.user = {
            UserName: "",
            Password: ""
        };
    };

    //登录点击
    $scope.login = function () {
        //LoginService.login($scope);
        window.location.href = "DCBookList.html"
    };

    $scope.initialize();
}]);

angular.bootstrap($("#login"), ["LoginModel"]);