var medicalRecordModule = angular.module("MedicalRecordModule", ["ResourceModule", "HttpModule"]);

medicalRecordModule.service("MedicalRecordService", ["ResourceFactory", "ManagementHttpService", function (ResourceFactory, ManagementHttpService) {
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
                    service.searchMedicalRecord($scope);
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

    //搜索电子病历
    service.searchMedicalRecord = function ($scope) {
        var request = {
            PatientID: $scope.currentPatient.PatientID
        };

        try {
            ManagementHttpService.weTreatsRequest(request, ResourceFactory.operateCode.get,
            function(response){
                if(response.Header.StatusCode == 0)
                {
                    $scope.treats = response.Body;
                }
                else
                {
                    alert("获取病例列表失败，请稍后重试");
                    console.log(response);
                }
            },
            function(response){
                alert("服务器繁忙，请稍候重试！");
                console.log(response);
            });
        }
        catch (e) {
            console.log(e);
        }
    };

    return service;
}]);

medicalRecordModule.controller("MedicalRecordController", ["$scope", "MedicalRecordService", "ResourceService", "ResourceFactory", "$filter", function ($scope, MedicalRecordService, ResourceService, ResourceFactory, $filter) {

    //初始化环境
    $scope.initialize = function () {
        $scope.requestData = {
            Code: ResourceService.getURLData("code")
        };
        $scope.currentPatient = ResourceFactory.getDataFromSession("CurrentPatient");
        MedicalRecordService.initialize();

        if(!$scope.currentPatient)
        {
            MedicalRecordService.getPatientInfo($scope);
        }
        else
        {
            MedicalRecordService.searchMedicalRecord($scope);
        }
    };

    //计算年龄
    $scope.calculateAge = function (birthday) {
        return ResourceService.calculateAge(new Date(birthday).Format("yyyy-MM-dd"));
    };

    //获取性别名称
    $scope.getGenderName = function (gender) {
        switch (gender) {
            case 1:
                return "男";
            case 2:
                return "女";
            default:
                return "无";
        }
    };

    //搜索电子病历
    $scope.searchMedicalRecord = function () {
        MedicalRecordService.searchMedicalRecord();
    };

    //展示当前电子病历详情
    $scope.showDetail = function (item) {
        ResourceFactory.saveDataToSession("CurrentMedicalRecord", item);
        window.location.href = "DCMedicalRecordDetail.html";
    };

    //转换预约时间
    $scope.getAppointTime = function(appointTime){
        return new Date(appointTime);
    };

    $scope.initialize();
}]);

angular.bootstrap($("#medical_record"), ["MedicalRecordModule"]);