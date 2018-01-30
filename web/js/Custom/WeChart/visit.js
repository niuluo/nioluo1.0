var visitModule = angular.module("VisitModule", ["ResourceModule", "HttpModule"]);

visitModule.service("VisitService", ["ManagementHttpService", "ResourceFactory", function(ManagementHttpService, ResourceFactory){
    var service = {};

    //服务环境初始化
    service.initialize = function(){

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
                    service.getVisitList($scope);
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

    //获取回访列表
    service.getVisitList = function($scope){
        var request = {
            PatientID: $scope.currentPatient.PatientID
        };

        try
        {
            ManagementHttpService.weVisitRequest(request, ResourceFactory.operateCode.get,
            function(response){
                if(response.Header.StatusCode == 0)
                {
                    $scope.visitList = response.Body;
                }
                else
                {
                    alert("获取回访列表失败，请稍后重试！");
                    console.log(response);
                }
            },
            function(response){
                alert("服务器繁忙，请稍候重试！");
                console.log(response);
            });
        }
        catch (e)
        {
            console.log(e);
        }
    };

    return service;
}]);

visitModule.controller("VisitController", ["$scope", "VisitService", "ResourceService", "ResourceFactory", function($scope, VisitService, ResourceService, ResourceFactory){
    //页面初始化
    $scope.initialize = function(){
        $scope.requestData = {
            Code: ResourceService.getURLData()
        };
        $scope.currentPatient = ResourceFactory.getDataFromSession("CurrentPatient");

        if(!$scope.currentPatient)
        {
            VisitService.getPatientInfo($scope);
        }
        else
        {
            VisitService.getVisitList($scope);
        }
    };

    //展示回访详情
    $scope.showDetail = function(item){
        ResourceFactory.saveDataToSession("CurrentVisit", item);
        window.location.href = "DCVisitDetail.html";
    };

    //转换回访时间
    $scope.convertVisitTime = function(visitTime){
        return new Date(visitTime);
    };

    $scope.initialize();
}]);

angular.bootstrap($("#visit_list"), ["VisitModule"]);