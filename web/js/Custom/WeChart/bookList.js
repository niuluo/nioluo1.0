var bookListModule = angular.module("BookModule", ["ResourceModule", "HttpModule"]);

bookListModule.service("BookService", ["ResourceService", "ManagementHttpService", "ResourceFactory", function (ResourceService, ManagementHttpService, ResourceFactory) {
    var service = {};

    //初始化环境
    service.initialize = function () {
        /* 日期控件 */
        //ResourceService.bindingDateControl("start_date");
        //ResourceService.bindingDateControl("end_date");
    };

    //获取患者信息
    service.getPatientInfo = function($scope){
        var request = $scope.requestData;

        ManagementHttpService.wePatientRequest(request, ResourceFactory.operateCode.get,
        function(response){
            if(response.Header.StatusCode == 0)
            {
                ResourceFactory.saveDataToSession("CurrentPatient", response.Body);
                $scope.currentPatient = response.Body;
                service.searchAppoints($scope);
            }
            else
            {
                alert(ResourceFactory.getErrorMsg(response.Header.StatusCode));
            }
        },
        function(response){
            console.log(response);
        })
    };

    //搜索预约列表
    service.searchAppoints = function ($scope) {
        var request = {
            PatientID: $scope.currentPatient.PatientID
        };

        try {
            ManagementHttpService.weAppointRequest(request, ResourceFactory.operateCode.get,
                function (response) {
                    if (response.Header.StatusCode == 0) {
                        $scope.apponitList = response.Body;
                    }
                    else {
                        alert(ResourceFactory.getErrorMsg(response.Header.StatusCode));
                    }
                },
                function (response) {
                    alert("系统繁忙，请稍候重试！");
                    console.log(response);
                });
        }
        catch (e) {
            console.log(e);
        }
    };

    return service;
}]);

bookListModule.controller("BookController", ["$scope", "BookService", "ResourceService", function ($scope, BookService, ResourceService) {
    $scope.initialize = function () {
        $scope.requestData = {
            Code: ResourceService.getURLData("code")
        };

        BookService.initialize();
        BookService.getPatientInfo($scope);
    };

    $scope.initialize();
}]);

angular.bootstrap($("#book_list"), ["BookModule"]);