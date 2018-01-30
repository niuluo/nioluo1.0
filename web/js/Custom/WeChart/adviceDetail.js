var bookListModule = angular.module("AdviceDetailModule", ["ResourceModule", "HttpModule"]);

bookListModule.service("AdviceDetailService", ["ManagementHttpService", "ResourceFactory", function (ManagementHttpService, ResourceFactory) {
    var service = {};

    //获取医嘱详情
    service.getAdviceDetail = function($scope){
        var request = {
            TreatID: $scope.requestData.TreatID
        };

        try {
            ManagementHttpService.weAdviceDetailRequest(request, ResourceFactory.operateCode.get,
            function(response){
                if(response.Header.StatusCode == 0)
                {
                    $scope.adviceDetail = response.Body;
                }
                else
                {
                    console.log(response);
                }
            },
            function(response){
                console.log(response);
            })
        }
        catch (e)
        {
            console.log(e);
        }
    };

    return service;
}]);

bookListModule.controller("AdviceDetailController", ["$scope", "AdviceDetailService", "ResourceService", function ($scope, AdviceDetailService, ResourceService) {
    $scope.initialize = function () {
        $scope.adviceDetail = null;
        $scope.requestData = {
            TreatID: ResourceService.getURLData("TreatID")
        };

        AdviceDetailService.getAdviceDetail($scope);
    };

    $scope.initialize();
}]);

angular.bootstrap($("#advice_detail"), ["AdviceDetailModule"]);