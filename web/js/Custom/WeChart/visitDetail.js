var visitDetailModule = angular.module("VisitDetailModule", ["ResourceModule", "HttpModule"]);

visitDetailModule.service("VisitService", ["ManagementHttpService", "ResourceFactory", function(ManagementHttpService, ResourceFactory){
    var service = {};

    //成功提示
    service.tipMsg = function(){
        $("#toast").fadeIn(100);
        setTimeout(function(){$("#toast").fadeOut(100);}, 1500);
    };

    //获取回访详情
    service.getVisitDetail = function(){
        return ResourceFactory.getDataFromSession("CurrentVisit");
    };

    service.saveFeedback = function($scope){
        var request = $scope.currentVisit;

        try
        {
            ManagementHttpService.weVisitRequest(request, ResourceFactory.operateCode.update,
            function(response){
                if(response.Header.StatusCode == 0)
                {
                    $scope.isShow =  false;
                    service.tipMsg();
                }
                else
                {
                    alert("更新失败，请稍后重试！");
                    console.log(response);
                }
            },
            function(response){
                alert("服务器繁忙，请稍后重试！");
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

visitDetailModule.controller("VisitDetailController", ["$scope", "VisitService", function($scope, VisitService){
    //页面初始化
    $scope.initialize = function(){
        $scope.currentVisit = VisitService.getVisitDetail();
        $scope.isShow = true;
        if($scope.currentVisit.Feedback)
        {
            $scope.feedback = $scope.currentVisit.Feedback;
            $scope.isShow = false;
        }
    };

    $scope.saveFeedback = function(){
        if($scope.feedback)
        {
            $scope.currentVisit.Feedback = $scope.feedback;
            VisitService.saveFeedback($scope);
        }
    };

    $scope.initialize();
}]);

angular.bootstrap($("#visit_detail"), ["VisitDetailModule"]);
