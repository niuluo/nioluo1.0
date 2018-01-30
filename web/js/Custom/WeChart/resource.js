/*服务器配置 Begin*/
var ManagementBaseURL = "https://www.niuluo-tech.cn/api/";

//本地测试
//var ManagementBaseURL = "http://192.192.192.114:8004/api/";

var ManagementServerList = [{
    ActionName: "WeAppoints",
    Url: "PatientWeChat/AppointDeal"
},{
    ActionName: "WeTreats",
    Url: "PatientWeChat/TreatDeal"
}, {
    ActionName: "WeTreatDetail",
    Url: "PatientWeChat/GetTreatDetail"
}, {
    ActionName: "WeVisit",
    Url: "PatientWeChat/VisitDeal"
},{
    ActionName: "WePatient",
    Url: "PatientWeChat/PatientDeal"
}, {
    ActionName: "WeAppointInfo",
    Url: "PatientWeChat/GetInformationsForAppoint"
},{
    ActionName: "WeAdviceDetail",
    Url: "PatientWeChat/GetAdviceByTreat"
}];

var ManagementWebServer = {
    getUrl: function (actionName) {
        var result = "";

        if (ManagementServerList != undefined && ManagementServerList.length > 0) {
            for (var i = 0; i < ManagementServerList.length; i++) {
                if (ManagementServerList[i].ActionName == actionName) {
                    result = ManagementBaseURL + ManagementServerList[i].Url;
                    return result;
                }
            }
        }

        return result;
    }
};
/* 服务器配置 End */

/* Http请求 Begin */
var sessionStorage = window.sessionStorage;

var httpModule = angular.module("HttpModule", []);

httpModule.factory("ResourceFactory", [function () {
    var factory = {};

    factory.operateCode = {
        nothing: 0,//非增删改查
        get: 1,//查询
        update: 2,//更新
        insert: 3//插入
    };

    factory.statusCode = {
        Success: 0,
        NoLogin: 1,
        NoPermit: 2,
        NoData: 3,
        Exist: 4,
        ProgramError: 5,
        CatchError: 6,
        ParamError: 7
    };

    factory.deleteDataFromSession = function (key) {
        var item = sessionStorage.getItem(key);

        if (key != null) {
            sessionStorage.removeItem(key);
        }
    };

    factory.requestBody = function (token, operateCode, data, timestamp) {
        return {
            'Header': {
                "Token": token,
                "StatusCode": 0,
                "Message": "",
                "OperateCode": operateCode,
                "TimeStamp": timestamp
            },
            'Body': data
        }
    };

    //获取错误信息
    factory.getErrorMsg = function(statusCode){
        switch(statusCode)
        {
            case 7:
                return "参数错误";
            case 8:
                return "内部调用错误";
            case 10:
                return "操作符错误";
            case 17:
                return "未绑定";
            default:
                return "服务器繁忙，请稍后再试！";
        }
    };

    //保存数据到Session
    factory.saveDataToSession = function (key, value) {
        var item = sessionStorage.getItem(key);
        if (item != null) {
            sessionStorage.removeItem(item)
        }

        if (value != null && value != "" && value != undefined) {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    };

    //从Session中获取一个Item
    factory.getDataFromSession = function (key) {
        var item = sessionStorage.getItem(key);
        if (item != null) {
            item = JSON.parse(item);
        }

        return item;
    };

    //绑定日期控件
    factory.bindingDateTimeControl = function (id, minDate, maxDate) {
        var ctlMaxDate = "2999-01-01";
        var ctlMinDate = "1900-01-01";

        if (maxDate != undefined && maxDate != "") {
            ctlMaxDate = maxDate;
        }

        if (minDate != undefined && minDate != "") {
            ctlMinDate = minDate;
        }

        $('#' + id).datetimepicker({
            format: 'yyyy-mm-dd',
            language: 'fr',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0,
            weekStart: 1,
            startDate: ctlMinDate,
            endDate: ctlMaxDate
        });
    };

    //格式校验
    factory.checkFormat = function (data, type, ValueLenth) {
        if (type == DataTypeEnum.Length) {
            return data.length <= ValueLenth;
        }
        return data.length() <= ValueLenth;
        if (data == undefined || data == "" || data == null) {
            return false;
        }

        switch (type) {
            case DataTypeEnum.Required:
                return true;
            case DataTypeEnum.Contract:
                var reg = /^(\d{3,4}-)?\d{6,8}$/;
                return reg.test(data);
            case DataTypeEnum.Email:
                var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                return reg.test(data);
            case DataTypeEnum.Identify:
                var reg = new RegExp("(^\d{18}$)|(^\d{15}$)");
                return reg.test(data);
            case DataTypeEnum.Number:
                var reg = /^[0-9]*[1-9][0-9]*$/;
                return reg.test(data);
            case DataTypeEnum.PhoneMobile:
                var reg = /^1(3|4|5|7|8)\d{9}$/;
                return reg.test(data);
            case DataTypeEnum.PostCode:
                var reg = /^\d{6}$/;
                return reg.test(data);
            case DataTypeEnum.DateFormat://(YYYY/MM/DD)
                var reg = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
                return reg.test(data);
            case DataTypeEnum.Fee:
                var reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
                return reg.test(data);

            default :
                return false;
                break;
        }
    };

    //日期校验
    factory.validateDate = function (val, element) {
        if (!factory.checkFormat(val, DataTypeEnum.DateFormat)) {
            return "日期无效，请重新输入";
        }
        else {
            return true;
        }
    };

    //数字校验
    factory.validateNumber = function (val, element) {
        if (!factory.checkFormat(val, DataTypeEnum.Number)) {
            return "数字无效，请重新输入";
        }
        else {
            return true;
        }
    };

    return factory;
}]);

httpModule.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}]);

httpModule.factory("HttpBaseFactory", ["$location", "$http", "ResourceFactory", function ($location, $http, ResourceFactory) {
    var timestamp = (new Date()).valueOf();
    var httpBaseFactory = {};

    //获取请求根域名
    httpBaseFactory.getDomain = function () {
        var domain = $location.protocol() + '://' + $location.host() + ':' + $location.port();
        return domain;
    };

    //获取token
    var token = function () {
        var currentUser = ResourceFactory.getDataFromSession("CurrentUser");
        if (currentUser != null) {
            return currentUser.Header.Token;
        } else {
            if ($location.absUrl().lastIndexOf('Login.html') > 0 || $location.absUrl().lastIndexOf('Register.html') > 0) {
                return '';
            }
        }
    };

    //request的基类
    httpBaseFactory.baseRequest = function (address, operateCode, data, successCallback, errorCallback) {
        var removeSession = function () {
            ResourceFactory.deleteDataFromSession('CurrentUser');
            console.log('removeSession');
        };

        //var requestBody = ResourceFactory.requestBody(token(), operateCode, data, timestamp);
        var requestBody = ResourceFactory.requestBody("", operateCode, data, timestamp);
        $http.post(address, requestBody).success(function (response) {
            if (response.Header.TimeStamp != timestamp) {
                return;
            }

            if (typeof(successCallback) == 'function') {
                successCallback(response);
            }
            else {
                console.log('此处应是函数');
                throw ('successCallback');
            }
        }).error(function (response) {
            if (typeof(errorCallback) == 'function') {
                errorCallback(response);
            }
            else {
                console.log('此处应该是函数');
                throw ('errorCallback');
            }
        });
    };

    return httpBaseFactory;
}]);

httpModule.factory("ManagementHttpRequestFactory", ["HttpBaseFactory", function (HttpBaseFactory) {
    var httpFactory = {};

    /* 微信API Begin */

    //微信预约请求
    httpFactory.weAppointRequest = function (data, operateCode, successCallback, errorCallback) {
        HttpBaseFactory.baseRequest(ManagementWebServer.getUrl("WeAppoints"), operateCode, data,
            successCallback, errorCallback);
    };

    //微信病例列表请求
    httpFactory.weTreatsRequest = function (data, operateCode, successCallback, errorCallback) {
        HttpBaseFactory.baseRequest(ManagementWebServer.getUrl("WeTreats"), operateCode, data,
            successCallback, errorCallback);
    };

    //微信病例详情请求
    httpFactory.weTreatDetailRequest = function (data, operateCode, successCallback, errorCallback) {
        HttpBaseFactory.baseRequest(ManagementWebServer.getUrl("WeTreatDetail"), operateCode, data,
            successCallback, errorCallback);
    };

    //微信回访更新
    httpFactory.weVisitRequest = function (data, operateCode, successCallback, errorCallback) {
        HttpBaseFactory.baseRequest(ManagementWebServer.getUrl("WeVisit"), operateCode, data,
            successCallback, errorCallback);
    };

    //微信患者请求
    httpFactory.wePatientRequest = function(data, operateCode, successCallback, errorCallback){
        HttpBaseFactory.baseRequest(ManagementWebServer.getUrl("WePatient"), operateCode, data,
            successCallback, errorCallback);
    };

    //微信预约信息请求
    httpFactory.weAppointInfoRequest = function(data, operateCode, successCallback, errorCallback){
        HttpBaseFactory.baseRequest(ManagementWebServer.getUrl("WeAppointInfo"), operateCode, data,
            successCallback, errorCallback);
    };

    //微信医嘱详情
    httpFactory.weAdviceDetailRequest = function(data, operateCode, successCallback, errorCallback){
        HttpBaseFactory.baseRequest(ManagementWebServer.getUrl("WeAdviceDetail"), operateCode, data,
            successCallback, errorCallback);
    };
    /* 微信API End */

    return httpFactory;
}]);

httpModule.service("ManagementHttpService", ["ManagementHttpRequestFactory", function (ManagementHttpRequestFactory) {
    var httpService = {};

    /* 微信API Begin */

    //微信预约请求
    httpService.weAppointRequest = function (data, operateCode, successCallback, errorCallback) {
        ManagementHttpRequestFactory.weAppointRequest(data, operateCode, successCallback, errorCallback);
    };

    //微信病例列表请求
    httpService.weTreatsRequest = function (data, operateCode, successCallback, errorCallback) {
        ManagementHttpRequestFactory.weTreatsRequest(data, operateCode, successCallback, errorCallback);
    };

    //微信病例详情请求
    httpService.weTreatDetailRequest = function (data, operateCode, successCallback, errorCallback) {
        ManagementHttpRequestFactory.weTreatDetailRequest(data, operateCode, successCallback, errorCallback);
    };

    //微信回访列表请求
    httpService.weVisitRequest = function(data, operateCode, successCallback, errorCallback){
        ManagementHttpRequestFactory.weVisitRequest(data, operateCode, successCallback, errorCallback);
    };

    //微信患者请求
    httpService.wePatientRequest = function(data, operateCode, successCallback, errorCallback){
        ManagementHttpRequestFactory.wePatientRequest(data, operateCode, successCallback, errorCallback);
    };

    //微信预约信息请求
    httpService.weAppointInfoRequest = function(data, operateCode, successCallback, errorCallback){
        ManagementHttpRequestFactory.weAppointInfoRequest(data, operateCode, successCallback, errorCallback);
    };

    //微信医嘱详情请求
    httpService.weAdviceDetailRequest = function(data, operateCode, successCallback, errorCallback){
        ManagementHttpRequestFactory.weAdviceDetailRequest(data, operateCode, successCallback, errorCallback);
    };
    /* 微信API End */

    return httpService;
}]);
/*Http请求 End*/

var resourceModule = angular.module("ResourceModule", []);

resourceModule.service("ResourceService", ["$location", function ($location) {
    var service = {};

    //日期控件绑定
    service.bindingDateControl = function (id, isWithTime, minDate, maxDate) {
        var defaultMinDate = new Date(1990, 1, 1);
        var defaultMaxDate = new Date(2999, 1, 1);

        if (minDate != undefined) {
            defaultMinDate = minDate;
        }

        if (maxDate != undefined) {
            defaultMaxDate = maxDate;
        }

        if (!isWithTime) {
            $("#" + id).mobiscroll().date({
                theme: "android-ics light",
                lang: "zh",
                animate: "fade",
                cancelText: null,
                maxDate: defaultMaxDate,
                minDate: defaultMinDate,
                dateFormat: "yyyy-mm-dd", //返回结果格式化为年月格式
                // wheels:[], 设置此属性可以只显示年月，此处演示，就用下面的onBeforeShow方法,另外也可以用treelist去实现
                headerText: function (valueText) { //自定义弹出框头部格式
                    array = valueText.split('-');
                    return array[0] + "年" + array[1] + "月" + array[2] + "日";
                }
            });
        }
        else {
            $("#" + id).mobiscroll().datetime({
                theme: "android-ics light",
                lang: "zh",
                animate: "fade",
                cancelText: null,
                dateFormat: "yyyy-mm-dd",
                maxDate: defaultMaxDate,
                minDate: defaultMinDate,
                // wheels:[], 设置此属性可以只显示年月，此处演示，就用下面的onBeforeShow方法,另外也可以用treelist去实现
                headerText: function (valueText) { //自定义弹出框头部格式
                    array = valueText.split('-');
                    var temp = array[2].split(' ');
                    return array[0] + "年" + array[1] + "月" + temp[0] + "日 " + temp[1];
                },
                timeFormat: "HH:ii"
            });
        }
    };

    //计算年龄,参数：出生日期（yyyy-MM-dd）
    service.calculateAge = function (str) {
        var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null) {
            return false;
        }
        var d = new Date(r[1], r[3] - 1, r[4]);
        if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
            var year = new Date().getFullYear();
            return (year - r[1]);
        }
        return 0;
    };

    //获取urlData
    service.getURLData = function(targetParam){
        var urlArr = $location.absUrl().split("?");
        var requestData = "";

        if(urlArr.length >= 2)
        {
            var urlData = urlArr[1].split("&");
            if(urlData.length > 0)
            {
                for(var i = 0; i < urlData.length; i++)
                {
                    var singleObj = urlData[i].split("=");
                    if(singleObj[0] == targetParam)
                    {
                        requestData = singleObj[1];
                        break;
                    }
                }
            }
        }

        return requestData;
    };

    return service;
}]);