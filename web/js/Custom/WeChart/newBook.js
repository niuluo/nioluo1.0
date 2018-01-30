var newBookModule = angular.module("NewBookModule", ["ResourceModule", "HttpModule"]);

newBookModule.service("NewBookService", ["ManagementHttpService", "ResourceService", "ResourceFactory", function (ManagementHttpService, ResourceService, ResourceFactory) {
    var service = {};
    var scope = {};

    //初始化环境
    service.initialize = function ($scope) {
        ResourceService.bindingDateControl("appoint_begin_date", true, new Date());
        ResourceService.bindingDateControl("appoint_end_date", true, new Date());
        scope = $scope;
    };

    //初始化预约事项控件
    service.initAppointItems = function(){
        $('#appoint_item_list').mobiscroll().treelist({
            theme: 'android-ics light',//样式
            lang: 'zh',//语言
            display: 'bottom',//指定显示模式
            defaultValue: [1, 1, 1],//设置初始值
            fixedWidth: [120,120,120],//3组滚动框的宽度
            btnClass:'', //设置按钮显示的样式
            labels: ['科室', '类别', '预约项目'],
            showLabel:true,//是否显示labels
            headerText:function(valueText){return "请选择预约事项"},
            rows:5,//滚动区域内的行数
            onSelect:function(valueText,inst){
                service.callback(valueText);
            },
            formatResult: function (array) { //返回自定义格式结果
                var item = $('#appoint_item_list>li').eq(array[0]).find('ul.second_item').eq(array[1]).find("ul li").eq(array[2]).attr("data-bind")
                var second = $('#appoint_item_list>li').eq(array[0]).find('ul.second_item').eq(array[1]).find("span").attr("data-bind")
                var first = $('#appoint_item_list>li').eq(array[0]).children('span').attr("data-bind");
                return first+"_"+second+"_"+item;
            }
        });
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
                    $scope.newAppoint = {
                        ID: 0,
                        AppointID: "",
                        PatientID: $scope.currentPatient.PatientID,
                        PatientName: $scope.currentPatient.Name,
                        Birthday: $scope.currentPatient.Birthday,
                        Gender: $scope.currentPatient.Gender,
                        Mobile: $scope.currentPatient.Mobile,
                        Address: $scope.currentPatient.Address,
                        OtherContact: $scope.currentPatient.OtherContact,
                        BeginTime: "",
                        EndTime: "",
                        AppointDetail: "",
                        Status: 1,
                        DoctorID: "",
                        DoctorName: "",
                        AppointType: "",
                        PatientSourceID:$scope.currentPatient.PatientSourceID,
                        PatientLevelID: $scope.currentPatient.PatientLevelID,
                        Remark: "",
                        AppointItemID: "",
                        AppointItemName: "",
                        SubCategoryID: "",
                        SubCategoryName: "",
                        CategoryID: "",
                        CategoryName: "",
                        State: 0,
                        CreateTime: "",
                        TenantID: $scope.currentPatient.TenantID
                    };
                    service.getDoctorsAndItems($scope);
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

    //获取预约事项和医生
    service.getDoctorsAndItems = function($scope){
        var request = {
            TenantID: $scope.currentPatient.TenantID
        };

        try
        {
            ManagementHttpService.weAppointInfoRequest(request, ResourceFactory.operateCode.get,
            function(response){
                if(response.Header.StatusCode == 0)
                {
                    $scope.appointItems = response.Body.AppointItems;
                    $scope.doctors = response.Body.Doctors;
                }
                else
                {
                    alert(ResourceService.getErrorMsg(response.Header.StatusCode));
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

    //保存预约
    service.saveAppoint = function ($scope) {
        var request = $scope.newAppoint;

        try
        {
            ManagementHttpService.weAppointRequest(request, ResourceFactory.operateCode.insert,
            function(response){
                if(response.Header.StatusCode == 0)
                {
                    alert("预约成功！");
                    $scope.newAppoint = response.Body;
                    $scope.isReadonly = true;
                }
                else
                {
                    alert(ResourceService.getErrorMsg(response.Header.StatusCode));
                    console.log(response);
                }
            },
            function(response){
                console.log(response);
            });
        }
        catch (e)
        {
            console.log(e);
        }
    };

    //选择回掉函数
    service.callback = function(data){
        if(data)
        {
            var arr = data.split("_");
            var category = $.parseJSON(arr[0]);
            var second = $.parseJSON(arr[1]);
            var third = $.parseJSON(arr[2]);
            scope.newAppoint.CategoryID = category.CategoryID;
            scope.newAppoint.CategoryName = category.Name;
            scope.newAppoint.SubCategoryID = second.SubCategoryID;
            scope.newAppoint.SubCategoryName = second.Name;
            scope.newAppoint.AppointItemID = third.AppointItemID;
            scope.newAppoint.AppointItemName = third.Name;
            scope.$apply();
        }
    };

    return service;
}]);

newBookModule.controller("NewBookController", ["$scope", "NewBookService", "ResourceService", "ResourceFactory", function ($scope, NewBookService, ResourceService, ResourceFactory) {
    //页面初始化
    $scope.initialize = function () {
        $scope.requestData = {
            Code: ResourceService.getURLData("code")
        };

        $scope.appointTypeList = [{
            Type: 1,
            Name: "初诊"
        },{
            Type: 2,
            Name: "复诊"
        }];
        $scope.isReadonly = false;
        $scope.selectedDoctor= {};
        $scope.currentPatient = ResourceFactory.getDataFromSession("CurrentPatient");
        NewBookService.initialize($scope);
        if(!$scope.currentPatient)
        {
            NewBookService.getPatientInfo($scope);
        }
        else
        {
            NewBookService.getDoctorsAndItems($scope);
        }
    };

    //新增预约保存
    $scope.addNewAppoint = function () {
        $scope.newAppoint.DoctorID = $scope.selectedDoctor.UserID;
        $scope.newAppoint.DoctorName = $scope.selectedDoctor.UserName;
        if(!$scope.selectedDoctor.UserID || !$scope.newAppoint.AppointItemID || !$scope.newAppoint.BeginTime || !$scope.newAppoint.EndTime || !$scope.newAppoint.AppointType)
        {
            alert("对不起，预约信息有误，请检查是否遗漏信息！");
            return;
        }

        if($scope.newAppoint.BeginTime >= $scope.newAppoint.EndTime)
        {
            alert("对不起，您输入预约的开始时间不能大于或等于截止时间！");
            return;
        }
        NewBookService.saveAppoint($scope);
    };

    //展示预约项目列表
    $scope.showItems = function(){
        NewBookService.initAppointItems();
        $("#appoint_item_list_dummy").css({"display": "none"});
        $("#appoint_item_list_dummy").click();
    };

    //获取预约类型名称
    $scope.getAppointTypeName = function(appointType){
        switch(appointType)
        {
            case 1: //初诊
                return "初诊";
            case 2: //复诊
                return "复诊";
            default:
                return "";
        }
    };

    //增加新预约
    $scope.addNewOtherAppoint = function(){
        $scope.isReadonly = false;
        $scope.newAppoint = {
            ID: 0,
            AppointID: "",
            PatientID: $scope.currentPatient.PatientID,
            PatientName: $scope.currentPatient.Name,
            Birthday: $scope.currentPatient.Birthday,
            Gender: $scope.currentPatient.Gender,
            Mobile: $scope.currentPatient.Mobile,
            Address: $scope.currentPatient.Address,
            OtherContact: $scope.currentPatient.OtherContact,
            BeginTime: "",
            EndTime: "",
            AppointDetail: "",
            Status: 1,
            DoctorID: "",
            DoctorName: "",
            AppointType: "",
            PatientSourceID:$scope.currentPatient.PatientSourceID,
            PatientLevelID: $scope.currentPatient.PatientLevelID,
            Remark: "",
            AppointItemID: "",
            AppointItemName: "",
            SubCategoryID: "",
            SubCategoryName: "",
            CategoryID: "",
            CategoryName: "",
            State: 0,
            CreateTime: "",
            TenantID: $scope.currentPatient.TenantID
        };
    };

    $scope.initialize();
}]);

angular.bootstrap($("#new_appoint"), ["NewBookModule"]);