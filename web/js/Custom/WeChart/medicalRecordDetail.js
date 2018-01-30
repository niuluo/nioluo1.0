var medicalDetailModule = angular.module("MedicalDetailModule", ["ResourceModule", "HttpModule"]);

medicalDetailModule.service("MedicalDetailService", ["ResourceFactory", "ManagementHttpService", function (ResourceFactory, ManagementHttpService) {
    var service = {};

    //初始化环境
    service.initialize = function ($scope) {

    };

    //病案详情
    service.getTreatDetail = function($scope){
        var meidcalRecord = ResourceFactory.getDataFromSession("CurrentMedicalRecord");
        var request = {
            TreatID: meidcalRecord.Treat.TreatID
        };

        try
        {
            ManagementHttpService.weTreatDetailRequest(request, ResourceFactory.operateCode.get,
            function(response){
                if(response.Header.StatusCode == 0)
                {
                    $scope.currentMedicalDetail = response.Body;
                }
            },
            function(response){
                alert("获取数据失败，请稍候重试！");
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

medicalDetailModule.controller("MedicalDetailController", ["$scope", "MedicalDetailService", function ($scope, MedicalDetailService) {
    //初始化环境
    $scope.initialize = function () {
        $scope.currentMedicalDetail= {};
        MedicalDetailService.initialize($scope);
        MedicalDetailService.getTreatDetail($scope);
    };

    //获取牙齿信息
    $scope.getToothInfo = function(item){
        var result = "";

        if(item)
        {
            if(item.ToothType == 1) //恒牙
            {
                result = "恒牙";
            }

            if(item.ToothType == 2) //乳牙
            {
                result = "乳牙";
            }

            if(item.ToothPosition) //获取牙齿列表
            {
                var leftTop = "";
                var rightTop = "";
                var leftBottom = "";
                var rightBottom = "";

                var toothList = item.ToothPosition.split(",");
                for(var i = 0; i < toothList.length; i++)
                {
                    var toothItem = toothList[i].split("-");
                    switch(toothItem[0])
                    {
                        case "a": //左上
                            if(leftTop)
                            {
                                leftTop = leftTop + "，"+toothItem[1];
                            }
                            else
                            {
                                leftTop = leftTop + "，左上第"+toothItem[1];
                            }
                            break;
                        case "b": //右上
                            if(rightTop)
                            {
                                rightTop = rightTop + "，"+toothItem[1];
                            }
                            else
                            {
                                rightTop = rightTop + "，右上第"+toothItem[1];
                            }
                            break;
                        case "c": //左下
                            if(leftBottom)
                            {
                                leftBottom = leftBottom + "，"+toothItem[1];
                            }
                            else
                            {
                                leftBottom = leftBottom + "，左下第"+toothItem[1];
                            }
                            break;
                        case "d": //右下
                            if(rightBottom)
                            {
                                rightBottom = rightBottom + "，"+toothItem[1];
                            }
                            else
                            {
                                rightBottom = rightBottom + "，右下第"+toothItem[1];
                            }
                            break;
                        default:
                            break;
                    }
                }

                if(leftTop)
                {
                    leftTop = leftTop + "颗牙齿";
                    result = result +leftTop;
                }

                if(rightTop)
                {
                    leftTop = leftTop + "颗牙齿";
                    result = result + leftTop;
                }

                if(leftBottom)
                {
                    leftBottom = leftBottom + "颗牙齿";
                    result = result + leftBottom;
                }

                if(rightBottom)
                {
                    rightBottom = rightBottom + "颗牙齿";
                    result = result + rightBottom;
                }
            }
        }

        return result;
    };

    //获取文件资料个数
    $scope.getFileCount = function(fileType){
        var result  = 0;
        if($scope.currentMedicalDetail.TreatFileList != undefined && $scope.currentMedicalDetail.TreatFileList.length > 0)
        {
            switch (fileType)
            {
                case 1: //图片文件
                    angular.forEach($scope.currentMedicalDetail.TreatFileList, function(item, index, array){
                        if(item.FileType == 1)
                        {
                            result++;
                        }
                    });
                    break;
                case 2: //视频文件
                    angular.forEach($scope.currentMedicalDetail.TreatFileList, function(item, index, array){
                        if(item.FileType == 2)
                        {
                            result++;
                        }
                    });
                    break;
                case 3: //文本文件
                    angular.forEach($scope.currentMedicalDetail.TreatFileList, function(item, index, array){
                        if(item.FileType == 3)
                        {
                            result++;
                        }
                    });
                    break;
                default:
                    break;
            }
        }

        return result;
    };

    //转换预约时间
    $scope.convertAppointTime = function(appointTime){
        return new Date(appointTime);
    };

    $scope.initialize();
}]);

angular.bootstrap($("#medical_record_detail"), ["MedicalDetailModule"]);