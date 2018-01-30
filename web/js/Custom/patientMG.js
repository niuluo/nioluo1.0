var PatientMGData = {};

//性别列表
var GenderList = [{
    Type: 0,
    Name: "请选择性别"
}, {
    Type: 1,
    Name: "男"
}, {
    Type: 2,
    Name: "女"
}];

//就诊类型
var TreatTypeList = [{
    Type: 0,
    Name: "请选择就诊类型"
}, {
    Type: 1,
    Name: "初诊"
}, {
    Type: 2,
    Name: "复诊"
}];

var PatientMG = {
    //必填项校验
    validateRequired: function (val, element) {
        if (!CommonFun.checkFormat(val, DataTypeEnum.Required)) {
            return "此项为必填项";
        }
        else {
            return true;
        }
    },
    //手机号校验
    validateMobile: function (val, element) {
        if (!CommonFun.checkFormat(val, DataTypeEnum.Contract) && !CommonFun.checkFormat(val, DataTypeEnum.PhoneMobile)) {
            return "电话号码无效，请重新输入";
        }
        else {
            return true;
        }
    },
    //年龄校验
    validateAge: function (val, element) {
        if (!CommonFun.checkFormat(val, DataTypeEnum.Number)) {
            return "年龄非法，请重新输入";
        }
        else {
            return true;
        }
    },
    //日期校验
    validateDate: function (val, element) {
        if (!$("#new_patient input[name='birthday']")[0]){
        if (!CommonFun.checkFormat(val, DataTypeEnum.DateFormat)) {
            return "日期格式不对，请重新输入！";
        }
        else {
            return true;
        }
        }
    },
    //性别校验
    validateGender: function (val, element) {
        if (val == "number:0" || val == "0") {
            return "请选择性别";
        }
        else {
            return true;
        }
    },
    //就诊类型校验
    validateTreatType: function (val, element) {
        if (val == "number:0" || val == "0") {
            return "请选择就诊类型";
        }
        else {
            return true;
        }
    },
    //患者来源校验
    validateSource: function (val, element) {
        if (val == "number:0" || val == "0") {
            return "请选择患者来源";
        }
        else {
            return true;
        }
    },
    //患者类型校验
    validatePatientType: function (val, element) {
        if (val == "number:0" || val == "0" || val == "" || val == "请选择患者类型") {
            return "请选择患者类型";
        }
        else {
            return true;
        }
    },
    //费用校验
    validateFee: function (val, element) {
        if (!CommonFun.checkFormat(val, DataTypeEnum.FeeWithNegative)) {
            return "数据不合法，请重新输入";
        }
        else {
            return true;
        }
    },
    //费用校验
    validateFeeWithoutNegative: function (val, element) {
        if (!CommonFun.checkFormat(val, DataTypeEnum.Fee)) {
            return "金额不合法，请重新输入";
        }
        else {
            return true;
        }
    },
    //绘制工作时间片
    drawTimeSpan: function () {
        var timeSpans = $(".cus_table").children("div.unit");
        var $selectedArea = $("<div></div>");

        if (timeSpans != undefined && timeSpans.length > 0) {

        }
    },
    //身份证校验
    validateIdcard: function (val, element) {
        if ($("#new_patient input[name='idcard']").val() != "") {
            if (!CommonFun.checkFormat(val, DataTypeEnum.Identify)) {
                return "格式不正确，请重新输入";
            }
            else {
                return true;
            }
        }
    },
    init: function () {
        $("#loading_div").modal("show");
        //激活当前按钮
        MenuActive.setActive(MenuEnum.PatientMG);

        //绑定日期控件
        CommonFun.bindingDateControl("workday", "", new Date(), false);
        CommonFun.bindingDateControl("pBirthday", "",new Date(), false);
        CommonFun.bindingDateControl("visit_time", "", new Date(), false);

        /*新增患者校验 Begin*/
        $.formValidator.initConfig({validatorGroup: "1", mode: "AlertTip"});
        $($("#new_patient input[name='patientName']")[0]).formValidator({validatorGroup: "1"}).functionValidator({fun: PatientMG.validateRequired});
        $($("#new_patient select[name='pGender']")[0]).formValidator({validatorGroup: "1"}).functionValidator({fun: PatientMG.validateGender});
        $($("#new_patient input[name='mobile']")[0]).formValidator({validatorGroup: "1"}).functionValidator({fun: PatientMG.validateMobile});
        $($("#new_patient input[name='birthday']")[0]).formValidator({validatorGroup: "1"}).functionValidator({fun: PatientMG.validateDate});
        $($("#new_patient input[name='idcard']")[0]).formValidator({validatorGroup: "1"}).functionValidator({fun: PatientMG.validateIdcard});
        /*新增患者校验 End*/

        /*患者信息编辑校验 Begin*/
        $.formValidator.initConfig({validatorGroup: "2", mode: "AlertTip"});
        $($("#patientDetail input[id='levelInDetail']")).formValidator({validatorGroup: "2"}).functionValidator({fun: PatientMG.validatePatientType});
        $($("#patientDetail select[name='pGender']")[0]).formValidator({validatorGroup: "2"}).functionValidator({fun: PatientMG.validateGender});
        $($("#patientDetail input[name='mobile']")[0]).formValidator({validatorGroup: "2"}).functionValidator({fun: PatientMG.validateMobile});
        $($("#patientDetail input[name='pSource']")[0]).formValidator({validatorGroup: "2"}).functionValidator({fun: PatientMG.validateSource});
        $($("#patientDetail input[name='patientName']")[0]).formValidator({validatorGroup: "2"}).functionValidator({fun: PatientMG.validateRequired});
        /*患者信息编辑校验 End*/

        /*预约校验 Begin*/
        $.formValidator.initConfig({validatorGroup: "3", mode: "AlertTip"});
        $($("#new_reservation select[name='treatType']")[0]).formValidator({validatorGroup: "3"}).functionValidator({fun: PatientMG.validateTreatType});
        $($("#new_reservation select[name='sourceId']")[0]).formValidator({validatorGroup: "3"}).functionValidator({fun: PatientMG.validateSource});
        $($("#new_reservation select[name='doctorName']")[0]).formValidator({validatorGroup: "3"}).functionValidator({fun: PatientMG.validateRequired});
        $($("#new_reservation textarea[name='bookItem']")[0]).formValidator({validatorGroup: "3"}).functionValidator({fun: PatientMG.validateRequired});
        $($("#new_reservation textarea[name='workTime']")[0]).formValidator({validatorGroup: "3"}).functionValidator({fun: PatientMG.validateDate});
        /*预约校验 End*/

        /*新增回访校验 Begin*/
        $.formValidator.initConfig({validatorGroup: "4", mode: "AlertTip"});
        $($("#new_visit select[name='visitor']")[0]).formValidator({validatorGroup: "4"}).functionValidator({fun: PatientMG.validateRequired});
        $($("#new_visit input[name='visitItemsList']")[0]).formValidator({validatorGroup: "4"}).functionValidator({fun: PatientMG.validateRequired});
        $($("#new_visit input[name='visitTime']")[0]).formValidator({validatorGroup: "4"}).functionValidator({fun: PatientMG.validateRequired});
        /*新增回访校验 End*/

        /* 收费项目校验初始化 Begin */
        $.formValidator.initConfig({validatorGroup: "5", mode: "AlertTip"});
        /* 收费项目校验初始化 End */

        /* 费用校验初始化 Begin */
        $.formValidator.initConfig({validatorGroup: "6", mode: "AlertTip"});
        $($("#account_manage input[name='rechargeAmount']")[0]).formValidator({validatorGroup: "6"}).functionValidator({fun: PatientMG.validateFeeWithoutNegative});
        /* 费用校验初始化 End */

        /* 费用校验初始化 Begin */
        $.formValidator.initConfig({validatorGroup: "7", mode: "AlertTip"});
        $($("#account_manage input[name='transferAmount']")[0]).formValidator({validatorGroup: "7"}).functionValidator({fun: PatientMG.validateFeeWithoutNegative});
        /* 费用校验初始化 End */

        /* 费用校验初始化 Begin */
        $.formValidator.initConfig({validatorGroup: "8", mode: "AlertTip"});
        $($("#account_manage input[name='refundAmount']")[0]).formValidator({validatorGroup: "8"}).functionValidator({fun: PatientMG.validateFeeWithoutNegative});
        /* 费用校验初始化 End */
    }
};

PatientMG.init();

var patientModule = angular.module("PatientModule", ["HttpModule", "CalendarModule", "PermissionModule", "PushMessageModule"]);

patientModule.factory("PatientFactory", [function () {
    //转换患者类别
    var mappingPatientLevel = function (patientLevel) {
        var result = {};
        if (patientLevel != undefined && patientLevel != "" && patientLevel != null) {
            result = {
                ID: patientLevel.ID,
                PatientLevelID: patientLevel.PatientLevelID,
                Name: patientLevel.Name,
                Color: patientLevel.Color,
                State: patientLevel.State,
                CreateTime: patientLevel.CreateTime,
                TenantID: patientLevel.TenantID
            }
        }
        return result;
    };

    //转换患者来源
    var mappingPatientSource = function (patientSource) {
        var result = {};
        if (patientSource != undefined && patientSource != "" && patientSource != null) {
            result = {
                ID: patientSource.ID,
                PatientSourceID: patientSource.PatientSourceID,
                Name: patientSource.Name,
                State: patientSource.State,
                DateTime: patientSource.DateTime,
                TenantID: patientSource.TenantID
            }
        }
        return result;
    };

    //转换患者
    var mappingPatient = function (patient) {
        var result = {};
        var patientLevel = {};
        var patientSource = {};

        if (patient != undefined && patient != "" && patient != null) {
            var typeList = PatientMGData.PatientLevelList;
            var sourceList = PatientMGData.PatientSourceList;

            if (typeList != "" && typeList != null) {
                for (var i = 0; i < typeList.length; i++) {
                    if (typeList[i].PatientLevelID == patient.PatientLevelID) {
                        patientLevel = mappingPatientLevel(typeList[i]);
                        break;
                    }
                }
            }

            if (sourceList != "" && sourceList != null) {
                for (var j = 0; j < sourceList.length; j++) {
                    if (sourceList[j].PatientSourceID == patient.PatientSourceID) {
                        patientSource = mappingPatientSource(sourceList[j]);
                        break;
                    }
                }
            }

            result = {
                ID: patient.ID,
                PatientID: patient.PatientID,
                Name: patient.Name,
                Gender: (patient.Gender == "" || patient.Gender == null) ? "0" : GenderList[patient.Gender],
                Birthday: !patient.Birthday ? "" : new Date(patient.Birthday).Format("yyyy-MM-dd"),
                Age: (patient.Birthday != null && patient.Birthday !="") ? CommonFun.calculateAge(new Date(patient.Birthday).Format("yyyy-MM-dd")) : "",
                Mobile: patient.Mobile,
                Address: patient.Address,
                PatientLevel: patientLevel,
                PatientSource: patientSource,
                TreatNo: patient.TreatNo,
                State: patient.State,
                MedicalRecordNo: patient.MedicalRecordNo,
                Remark: patient.Remark,
                TenantID: patient.TenantID,
                CreateTime: patient.CreateTime,
                ExpireTime: patient.ExpireTime,
                MainID: patient.MainID,
                Relation: patient.Relation,
                InsuranceName: patient.InsuranceName,
                InsuranceNo: patient.InsuranceNo,
                InsuranceType: patient.InsuranceType,
                SocialSecurityNo: patient.SocialSecurityNo,
                Amount: patient.Amount,
                CardNo: patient.CardNo,
                OpenID: patient.OpenID,
                IdentityCardNo: patient.IdentityCardNo
            }
        }

        return result;
    };

    //转换预约
    var mappingAppoint = function (appointment) {
        var result = {};
        var patientSource = {};
        if (appointment != undefined && appointment != null && appointment != "") {
            var sourceList = PatientMGData.PatientSourceList;
            var doctorList = PatientMGData.Doctors;
            var doctor = {};

            if (sourceList != "" && sourceList != null) {
                for (var j = 0; j < sourceList.length; j++) {
                    if (sourceList[j].PatientSourceID == appointment.PatientSourceID) {
                        patientSource = mappingPatientSource(sourceList[j]);
                        break;
                    }
                }
            }

            if (doctorList != undefined && doctorList != null && doctorList != "") {
                for (var i = 0; i < doctorList.length; i++) {
                    if (doctorList[i].UserID == appointment.DoctorID) {
                        doctor = doctorList[i];
                        break;
                    }
                }
            }

            result = {
                ID: appointment.ID,
                AppointID: appointment.AppointID,
                AppointNo: appointment.AppointNo,
                PatientID: appointment.PatientID,
                Name: appointment.Name,
                Birthday: appointment.Birthday,
                Gender: (appointment.Gender == undefined || appointment.Gender == "") ? GenderList[0] : GenderList[appointment.Gender],
                Mobile: appointment.Mobile,
                Address: appointment.Address,
                Remark: appointment.Remark,
                AppointTime: appointment.AppointTime,
                AppointDetail: appointment.AppointDetail,
                Status: appointment.Status,
                Doctor: doctor,
                AppointType: (appointment.AppointType == undefined || appointment.AppointType == "") ? TreatTypeList[0] : TreatTypeList[appointment.AppointType],
                State: appointment.State,
                CreateTime: appointment.CreateTime,
                PatientSource: patientSource,
                TenantID: appointment.TenantID,
                MainID: appointment.MainID,
                Relation: appointment.Relation,
                OpenID: appointment.OpenID
            };
        }

        return result;
    };

    return {
        //转换为ViewModel患者信息
        MappingPatient: function (patient) {
            return mappingPatient(patient);
        },
        //搜索请求的Model
        SearchRequest: {
            Type: 0,
            PatientLevelID: 0,
            Condition: ""
        },
        //患者列表转换
        DealResponsePatients: function (patientList) {
            var result = {
                PatientList: [],
                PatientInfoList: []
            };
            var data = new Array();
            if (patientList != undefined && patientList != null && patientList != "") {
                for (var i = 0; i < patientList.length; i++) {
                    var item = mappingPatient(patientList[i]);
                    result.PatientList.push(item);
                    result.PatientInfoList.push({
                        PatientID: item.PatientID,
                        PatientName: item.Name,
                        Gender: item.Gender,
                        Mobile: item.Mobile
                    });

                    data.push({
                            label: item.Name+'--'+item.Mobile,
                            value: item.PatientID
                        });
                }

                $("#language").autocomplete({
                    delay: 0,
                    source: data,
                    focus: function( event, ui ) {
                        $( "#language" ).val( ui.item.label );
                        return false;
                    },
                    select: function (event, ui) {
                        $( "#language" ).val( ui.item.label );
                        $( "#language-id" ).val( ui.item.value );
                        return false;
                    }
                });
            }
            return result;
        },

        //转型患者请求
        DealPatientRequest: function (patient) {
            var result = {};
            var data = CommonFun.getDataFromSession("CurrentUser");
            var patientLevelList = PatientMGData.PatientLevelList;
            var patientSourceList = PatientMGData.PatientSourceList;
            if (patient != undefined && patient != null && patient != "") {
                result.Patient = {
                    ID: patient.ID,
                    PatientID: patient.PatientID,
                    Name: patient.Name,
                    Gender: patient.Gender.Type,
                    MedicalRecordNo: patient.MedicalRecordNo,
                    Birthday: !patient.Birthday ? "" : new Date(patient.Birthday).Format("yyyy-MM-dd"),
                    Mobile: patient.Mobile,
                    Address: patient.Address,
                    PatientLevelID: patient.PatientLevel.PatientLevelID,
                    PatientSourceID: patient.PatientSource.PatientSourceID,
                    TreatNo: patient.TreatNo,
                    State: patient.State,
                    Remark: patient.Remark,
                    TenantID: data != null ? data.Body.Tenant.TenantID : "",
                    CreateTime: patient.CreateTime,
                    MainID: patient.MainID,
                    Relation: patient.Relation,
                    SocialSecurityNo: patient.SocialSecurityNo,
                    InsuranceName: patient.InsuranceName,
                    InsuranceNo: patient.InsuranceNo,
                    InsuranceType: patient.InsuranceType,
                    Amount: patient.Amount,
                    CardNo: patient.CardNo,
                    OpenID: patient.OpenID,
                    IdentityCardNo: patient.IdentityCardNo
                };
            }

            if (patientLevelList != undefined && patientLevelList != null && patientLevelList.length > 0) {
                if (patient.PatientLevel.PatientLevelID == "") {
                    result.PatientLevel = patient.PatientLevel;
                    if (patient.PatientLevel.Name == "请选择患者类型") {
                        result.PatientLevel = "";
                    }
                }
                for (var i = 0; i < patientLevelList.length; i++) {
                    if (patient.PatientLevel.PatientLevelID == patientLevelList[i].PatientLevelID) {
                        result.PatientLevel = patientLevelList[i];
                        result.PatientLevel.Color = patient.PatientLevel.Color;
                        break;
                    }
                }
            }

            if (patientSourceList != undefined && patientSourceList != null && patientSourceList.length > 0) {
                if (patient.PatientSource.PatientSourceID == "") {
                    result.PatientSource = patient.PatientSource;
                    if (patient.PatientSource.Name == "请选择患者来源") {
                        result.PatientSource = "";
                    }
                }
                for (var i = 0; i < patientSourceList.length; i++) {
                    if (patient.PatientSource.PatientSourceID == patientSourceList[i].PatientSourceID) {
                        result.PatientSource = patientSourceList[i];
                        break;
                    }
                }
            }
            return result;
        },
        //Patient的ViewModel之间的转换
        ConvertPatient: function (patient) {
            var result = {};
            var patientLevelList = PatientMGData.PatientLevelList;
            var patientSourceList = PatientMGData.PatientSourceList;
            var patientLevel = {};
            var patientSource = {};

            if(!patient.PatientLevel)
            {
                patient.PatientLevel = {
                    PatientLevelID: patient.PatientLevelID
                }
            }

            if(!patient.PatientSource)
            {
                patient.PatientSource = {
                    PatientSourceID: patient.PatientSourceID
                };
            }

            if(!patient.Gender.Type)
            {
                patient.Gender = {
                    Type: patient.Gender,
                    Name: patient.Gender == 1 ? "男" : "女"
                };
            }

            if (patient != undefined && patient != null && patient != "") {
                if (patient.PatientLevel != undefined && patient.PatientLevel != "" && patient.PatientLevel != null) {
                    for (var i = 0; i < patientLevelList.length; i++) {
                        if (patientLevelList[i].PatientLevelID == patient.PatientLevel.PatientLevelID) {
                            patientLevel = mappingPatientLevel(patientLevelList[i]);
                            break;
                        }
                    }
                }

                if (patient.PatientSource != undefined && patient.PatientSource != null && patient.PatientSource != "") {
                    for (var j = 0; j < patientSourceList.length; j++) {
                        if (patientSourceList[j].PatientSourceID == patient.PatientSource.PatientSourceID) {
                            patientSource = mappingPatientSource(patientSourceList[j]);
                            break;
                        }
                    }
                }

                result = {
                    ID: patient.ID,
                    PatientID: patient.PatientID,
                    Name: patient.Name,
                    Gender: patient.Gender,
                    Birthday: !patient.Birthday ? "" : new Date(patient.Birthday).Format("yyyy-MM-dd"),
                    Age: !patient.Birthday ? "" : CommonFun.calculateAge(new Date(patient.Birthday).Format("yyyy-MM-dd")),
                    Mobile: patient.Mobile,
                    Address: patient.Address,
                    PatientLevel: patientLevel,
                    PatientSource: patientSource,
                    MedicalRecordNo: patient.MedicalRecordNo,
                    TreatNo: patient.TreatNo,
                    State: patient.State,
                    Remark: patient.Remark,
                    TenantID: patient.TenantID,
                    CreateTime: patient.CreateTime,
                    ExpireTime: patient.ExpireTime,
                    MainID: patient.MainID,
                    Relation: patient.Relation,
                    SocialSecurityNo: patient.SocialSecurityNo,
                    InsuranceName: patient.InsuranceName,
                    InsuranceNo: patient.InsuranceNo,
                    InsuranceType: patient.InsuranceType,
                    Amount: patient.Amount,
                    CardNo: patient.CardNo,
                    OpenID: patient.OpenID,
                    IdentityCardNo: patient.IdentityCardNo
                };
            }
            return result;
        },
        //转换为预约ViewModel
        MappingAppointment: function (appointment) {
            return mappingAppoint(appointment);
        },
        //转换预约请求
        DealAppointmentRequest: function (appointment, patient) {
            var result = {};
            if (appointment != undefined && appointment != null && appointment != "") {
                result = {
                    ID: appointment.ID,
                    AppointID: appointment.AppointID,
                    AppointNo: appointment.AppointNo,
                    AppointItemID: appointment.AppointItemID,
                    AppointItemName: appointment.AppointItemName,
                    AppointDetail: "",
                    PatientID: appointment.PatientID,
                    PatientName: appointment.Name,
                    BeginTime: appointment.BeginTime,
                    EndTime: appointment.EndTime,
                    Birthday: appointment.Birthday,
                    Gender: appointment.Gender.Type,
                    Mobile: appointment.Mobile,
                    Address: appointment.Address,
                    Remark: appointment.Remark,
                    AppointTime: appointment.AppointTime,
                    Status: appointment.Status,
                    DoctorID: appointment.DoctorID,
                    DoctorName: appointment.DoctorName,
                    AppointType: appointment.AppointType.Type,
                    State: appointment.State,
                    CreateTime: appointment.CreateTime,
                    PatientLevelID: patient.PatientLevel.PatientLevelID,
                    PatientLevelName: patient.PatientLevel.Name,
                    PatientSourceID: appointment.PatientSource.PatientSourceID,
                    PatientSourceName: appointment.PatientSource.Name,
                    TenantID: appointment.TenantID,
                    MainID: appointment.MainID,
                    Relation: appointment.Relation,
                    OpenID: appointment.OpenID,
                    SubCategoryID:appointment.SubCategoryID,
                    SubCategoryName: appointment.SubCategoryName,
                    CategoryID: appointment.CategoryID,
                    CategoryName: appointment.CategoryName
                }
            }
            return result;
        },
        //转换收费项目列表
        DealCostItems: function (itemList, appoint) {
            var result;
            if(itemList && !$.isArray(itemList))
            {
                result = itemList.item;
                if(!result.Price)
                {
                    result.Price = {
                        ID: 0,
                        CostItemID: result.Item.CostItemID,
                        SubCategoryID: result.Item.SubCategoryID,
                        Unit: "",
                        Price: 0,
                        State: 0,
                        TenantID: result.Item.TenantID,
                        CreateTime: ""
                    };
                }

                result.Category = {
                    CategoryID: itemList.categoryInfo.CategoryID,
                    CategoryName: itemList.categoryInfo.CategoryName
                };

                result.SubCategory = {
                    SubCategoryID: itemList.categoryInfo.SubCategoryID,
                    SubCategoryName: itemList.categoryInfo.SubCategoryName
                };
            }

            if (itemList && itemList.length > 0) {
                result = [];
                for (var i = 0; i < itemList.length; i++) {
                    if (!itemList[i].Price) {
                        itemList[i].Price = {
                            ID: 0,
                            CostItemID: itemList[i].Item.CostItemID,
                            SubCategoryID: itemList[i].Item.SubCategoryID,
                            Unit: "",
                            Price: 0,
                            State: 0,
                            TenantID: itemList[i].Item.TenantID,
                            CreateTime: ""
                        };
                    }

                    itemList[i].Category = {
                        CategoryID: appoint.CategoryID,
                        CategoryName: appoint.CategoryName
                    };

                    itemList[i].SubCategory = {
                        SubCategoryID: appoint.SubCategoryID,
                        SubCategoryName: appoint.SubCategoryName
                    };

                    result.push(itemList[i]);
                }
            }

            return result;
        }
    };
}]);

patientModule.service("PatientService", ["PatientFactory", "HttpService", "ResourceFactory", "$location", "PermissionFactory",
    function (PatientFactory, HttpService, ResourceFactory, $location, PermissionFactory) {
        var patientService = {};
        var scope = "";

        //viewModel之间的转化
        patientService.ConvertPatient = function (patient) {
            return PatientFactory.ConvertPatient(patient);
        };

        //获取当前患者所有已完成的就诊事项
        patientService.getVisitTreatList = function (element) {
            var appointList = PatientMGData.AppointList;
            var currentPatient = element.currentPatient;
            var result = [];
            if (appointList != undefined && appointList != "" && appointList != null) {
                for (var i = 0; i < appointList.length; i++) {
                    if (appointList[i].Status == 4) {
                        result.push(appointList[i]);
                    }
                }
            }

            return result;
        };

        // 取得预约list
        patientService.GetListForVisit = function (data, $scope) {
            HttpService.getListForVisitRequest(data, ResourceFactory.operateCode.get,
                function (response) {
                    if (response.Header.StatusCode == 0) {
                        $scope.completeTreatList = response.Body;
                    }
                    else {
                        $scope.completeTreatList = null;
                    }
                },
                function (response) {
                    console.log(response);
                }
            );
        };

        patientService.findAllItem = function (item, itemName, array) {
            var result = null;
            if (array == []) {
                return;
            }
            else {
                for (var i = 0; i < array.length; i++) {
                    var temp = array[i][itemName];
                    if (item == temp) {
                        return JSON.parse(JSON.stringify(array[i]));
                    }
                }
            }

            return result;
        };

        //获取患者类型
        patientService.getPatientTypeList = function (patientTypeList, type) {
            var result = [];
            if (type == 1)//搜素下拉框
            {
                result = [{
                    Type: 0,
                    PatientLevelID: 0,
                    Name: "全部"
                }];
            }
            else//新增下拉框
            {
                result = [{
                    Type: 0,
                    PatientLevelID: 0,
                    Name: "请选择患者类型"
                }];
            }

            if (patientTypeList != undefined && patientTypeList != null && patientTypeList != "") {
                for (var i = 0; i < patientTypeList.length; i++) {
                    var item = {
                        Type: i + 1,
                        PatientLevelID: patientTypeList[i].PatientLevelID,
                        Name: patientTypeList[i].Name
                    };
                    result.push(item);
                }
            }

            return result;
        };

        //获取患者来源
        patientService.getPatientSourceList = function (patientSourceList) {
            var result = [{
                Type: 0,
                PatientSourceID: 0,
                Name: "请选择患者来源"
            }];
            if (patientSourceList != undefined && patientSourceList != null && patientSourceList != "") {
                for (var i = 0; i < patientSourceList.length; i++) {
                    var item = {
                        Type: i + 1,
                        PatientSourceID: patientSourceList[i].PatientSourceID,
                        Name: patientSourceList[i].Name
                    };
                    result.push(item);
                }
            }

            return result;
        };

        //转换患者列表
        patientService.getMappingPatientList  = function (patientList) {
            return PatientFactory.DealResponsePatients(patientList);
        };

        //获取searchRequest
        patientService.getSearchRequest = function () {
            return PatientFactory.SearchRequest;
        };

        //获取mapping的患者
        patientService.getMappingPatient = function (patient) {
            return PatientFactory.MappingPatient(patient);
        };

        //搜索患者
        patientService.searchPatients = function (element) {
            var request;
            var searchInfo = element.searchRequest;

            if (searchInfo != "" && searchInfo != null && searchInfo != undefined) {
                var searchType = 0;
                if (searchInfo.Condition != undefined && searchInfo.Condition != "") {
                    if (CommonFun.checkFormat(searchInfo.Condition, DataTypeEnum.Number)) //1：代表姓名；2：代表手机号
                    {
                        searchType = 2;
                    }
                    else {
                        searchType = 1;
                    }
                }

                var data = CommonFun.getDataFromSession("CurrentUser");
                request = {
                    TenantId: data != null ? data.Body.Tenant.TenantID : "",
                    SearchType: searchType,
                    PatientLevel: searchInfo.PatientLevelID,
                    Condition: searchInfo.Condition == undefined ? "" : searchInfo.Condition
                }
            }
            else {
                request = {
                    TenantId: data != null ? data.Body.Tenant.TenantID : "",
                    SearchType: 0,
                    PatientLevel: "",
                    Condition: ""
                }
            }

            try {
                HttpService.patientRequest(request, ResourceFactory.operateCode.get,
                    function (response) {
                        if (response.Header.StatusCode == 0) {
                            PatientMGData.PatientList = response.Body.PatientList;
                            PatientMGData.PatientLevelList = response.Body.PatientLevelList;
                            PatientMGData.PatientSourceList = response.Body.PatientSourceList;
                            element.patientList = PatientFactory.DealResponsePatients(PatientMGData.PatientList).PatientList;
                            element.currentPatient = element.patientList[0];
                            if (response.Body == null || response.Body.PatientList.length <= 0) {
                                $("#patient_operate").hide();
                                patientService.alert("没有符合条件的数据！");
                            }
                            else {
                                $("#patient_operate").show();
                            }
                        }
                        else {
                            patientService.alert(GetErrormsg(response.Header.StatusCode));
                        }
                    },
                    function (response) {
                        patientService.alert("系统繁忙，请稍候重试！");
                        console.log(response);
                    }
                );
            }
            catch (e) {
                console.log(e);
            }
        };

        //保存患者
        patientService.savePatient = function (element) {
            var request = PatientFactory.DealPatientRequest(element.newPatient);
            request.Patient.State = 0;
            try {
                HttpService.patientRequest(request, ResourceFactory.operateCode.insert,
                    function (response) {
                        element.isAbled = true;
                        if (response.Header.StatusCode == 0) {
                            $("#new_patient").modal("hide");
                            patientService.alert("新增患者成功！");
                            patientService.searchPatients(element);
                        }
                        else {
                            if(response.Header.StatusCode == 18)
                            {
                                var genderName = response.Body.Gender == 2 ? "女" : "男";
                                patientService.confirm("对不起，该手机号已经注册，手机号主人姓名：【"+response.Body.Name+"】，性别：【"+genderName+"】，是否关联该手机号？",
                                function(){
                                    element.isRelation = true;
                                    element.newPatient.Relation = 1;
                                    element.newPatient.MainID = response.Body.PatientID;
                                    element.$apply();
                                });
                            }
                            else
                            {
                                patientService.alert(GetErrormsg(response.Header.StatusCode));
                            }
                        }
                    },
                    function (response) {
                        patientService.alert("系统繁忙，请稍后重试！");
                        console.log(response);
                    }
                );
            }
            catch (e) {
                console.log(e);
            }
        };
        
        //更新患者信息
        patientService.updatePatient = function (element) {
            element.editPatient.MedicalRecordNo = element.currentPatient.MedicalRecordNo;
            element.editPatient.OpenID = element.currentPatient.OpenID;
            var request = PatientFactory.DealPatientRequest(element.editPatient);
            request.isForceUpdate = element.isForceUpdate;

            try {
                HttpService.patientRequest(request, ResourceFactory.operateCode.update,
                    function (response) {
                        if (response.Header.StatusCode == 0) {
                            for (var i = 0; i < element.patientList.length; i++) {
                                if (element.patientList[i].ID == request.Patient.ID) {
                                    element.patientList[i] = PatientFactory.ConvertPatient(element.editPatient);
                                    element.currentPatient = PatientFactory.ConvertPatient(element.editPatient);
                                    element.patientList[i].PatientLevel = element.editPatient.PatientLevel;
                                    element.currentPatient.PatientLevel = element.editPatient.PatientLevel;

                                    $("#patientDetail .div_edit").hide();
                                    $("#patientDetail .div_show").show();
                                    break;
                                }
                            }

                            patientService.alert("更新信息成功！");
                            patientService.searchPatients(element);
                        }
                        else {
                            if(response.Header.StatusCode == 18)
                            {
                                var genderName = response.Body.Gender == 2 ? "女" : "男";
                                patientService.confirm("对不起，该手机号已经被注册，手机号主人姓名：【"+response.Body.Name+"】，性别：【"+genderName+"】，是否关联该手机号？",
                                function(){
                                    element.isRelation = true;
                                    element.newPatient.Relation = 1;
                                    element.newPatient.MainID = response.Body.PatientID;
                                    element.$apply();
                                });

                                return;
                            }

                            if(response.Header.StatusCode == 34) //有关联信息，提示是否继续更新；
                            {
                                patientService.confirm("当前手机号有关联的信息，如果选择更新，所有关联的信息的手机号会一起更新，确定更新吗？",
                                    function(){
                                        element.isForceUpdate = true;
                                        patientService.updatePatient(element);
                                    });

                                return;
                            }

                            if(response.Header.StatusCode == 35) //把一个主手机号更新为另一个住手机号的子手机号，并且当前手机号还存在关联的子手机号；
                            {
                                patientService.alert("对不起，您的手机号目前被其他患者关联，您无法关联其他手机号！");
                                return;
                            }

                            patientService.alert(GetErrormsg(response.Header.StatusCode));
                        }
                    },
                    function (response) {
                        patientService.alert("系统繁忙，请稍候重试！");
                        console.log(response);
                    }
                );
            }
            catch (e) {
                console.log(e);
            }
        };

        //导出患者
        patientService.exportPatient = function (searchRequest) {
            if (searchRequest.Condition != "" && searchRequest.Condition != undefined) {
                if (CommonFun.checkFormat(searchRequest.Condition, DataTypeEnum.PhoneMobile)) {
                    searchRequest.Type = 2;
                } else {
                    searchRequest.Type = 1;
                }
            }
            var currentUser = CommonFun.getDataFromSession("CurrentUser");
            var url = WebServer.getUrl("PatientExport");
            url = url + "?TenantID=" + currentUser.Body.Tenant.TenantID + "&SearchType=" + searchRequest.Type +
                "&Condition=" + searchRequest.Condition + "&PatientLevel=" + searchRequest.PatientLevelID +
                "&Token=" + currentUser.Header.Token+"&Module="+ResourceFactory.module;
            window.location.href = url;
        };

        //取得预约事项列表
        patientService.getAppointmentItemsList = function ($scope) {
            var request = {
                "TenantID": $scope.currentUser.Body.Tenant.TenantID
            };

            HttpService.appointmentItemsRequest(request, ResourceFactory.operateCode.get,
                function (response) {
                    if (response.Header.StatusCode == 0) {
                        $scope.appointmentItems = response.Body;
                    }
                    else {
                        $scope.appointmentItems = null;
                    }
                },
                function (response) {
                    console.log(response);
                }
            );
        };

        //取得回访事项列表
        patientService.visitItemsList = function ($scope) {
            var request = {
                "TenantID": $scope.currentUser.Body.Tenant.TenantID
            };

            HttpService.visitItemsRequest(request, ResourceFactory.operateCode.get,
                function (response) {
                    if (response.Header.StatusCode == 0) {
                        $scope.visitItemsList = response.Body;
                    }
                    else {
                        $scope.visitItemsList = null;
                    }
                },
                function (response) {
                    console.log(response);
                }
            );
        };

        //患者删除
        patientService.deletePatient = function (element) {
            element.currentPatient.State = 1;
            var request = PatientFactory.DealPatientRequest(element.currentPatient);
            request.isForceUpdate = element.isForceUpdate;
            try {
                HttpService.patientRequest(request, ResourceFactory.operateCode.remove,
                    function (response) {
                        if (response.Header.StatusCode == 0) {
                            patientService.searchPatients(element);
                            patientService.alert("删除成功！");
                        }
                        else {
                            //alert("还有关联信息，无法删除！");
                            if(response.Header.StatusCode == 34) //有关联信息，提示是否继续删除；
                            {
                                patientService.confirm("当前患者还有关联的信息，可以把关联信息一起删除，确定继续删除吗？",
                                function(){
                                    element.isForceUpdate = true;
                                    patientService.deletePatient(element);
                                });
                            }

                            if(response.Header.StatusCode == 48)
                            {
                                patientService.alert("该患者还有账单存在！不能删除");
                                return;
                            }
                        }

                    },
                    function (response) {
                        console.log(response);
                    }
                );
            }
            catch (e) {
                console.log(e);
            }
        };

        //保存预约
        patientService.saveReservation = function (element) {
            var hour = element.startTime.getHours();
            var min = element.startTime.getMinutes();
            var sec = element.startTime.getSeconds();
            var endHour = element.endTime.getHours();
            var endMin = element.endTime.getMinutes();
            var endSec = element.endTime.getSeconds();
            var appointment = element.appointment;
            appointment.DoctorID = element.selectedDoctor.UserID;
            appointment.DoctorName = element.selectedDoctor.UserName;
            if (hour < 10) {
                hour = "0" + element.startTime.getHours();
            }

            if (min < 10) {
                min = "0" + element.startTime.getMinutes();
            }

            if (sec < 10) {
                sec = "0" + element.startTime.getSeconds();
            }

            if (endHour < 10) {
                endHour = "0" + element.endTime.getHours();
            }

            if (endMin < 10) {
                endMin = "0" + element.endTime.getMinutes();
            }

            if (endSec < 10) {
                endSec = "0" + element.endTime.getSeconds();
            }

            appointment.BeginTime = element.appointment.AppointTime + " " + hour + ":" + min + ":" + sec;
            appointment.EndTime = element.appointment.AppointTime + " " + endHour + ":" + endMin + ":" + endSec;

            var tempSource = patientService.findAllItem(appointment.PatientSource.PatientSourceID, "PatientSourceID", PatientMGData.PatientSourceList);
            var tempLevel = patientService.findAllItem(appointment.PatientSource.PatientLevelID, "PatientLevelID", PatientMGData.PatientLevelList);

            var request = PatientFactory.DealAppointmentRequest(appointment, element.currentPatient);
            var data = {
                Appoint: request,
                Source: tempSource,
                Level: tempLevel
            };

            try {
                HttpService.appointmentRequest(data, ResourceFactory.operateCode.insert,
                    function (response) {
                        if (response.Header.StatusCode == 0) {
                            $("#new_reservation").modal("hide");
                            patientService.alert("预约成功！");
                        }
                        else {
                            patientService.alert(GetErrormsg(response.Header.StatusCode));
                        }
                    },
                    function (response) {
                        console.log(response);
                    }
                );
            }
            catch (e) {
                console.log(e);
            }
        };

        //保存回访
        patientService.saveVisit = function (data, element) {
            try {
                HttpService.visitRequest(data, ResourceFactory.operateCode.insert,
                    function (response) {
                        if (response.Header.StatusCode == 0) {
                            $("#new_visit").modal("hide");
                            patientService.alert("回访创建成功！");
                            element.currentPatient.VisitHistory.push(element.currentPatient.visit);
                        }
                        else {
                            patientService.alert(GetErrormsg(response.Header.StatusCode));
                        }
                    },
                    function (response) {
                        patientService.alert("系统繁忙，请稍后再试！");
                        console.log(response);
                    }
                );
            }
            catch (e) {
                console.log(e);
            }
        };

        //获取收费主目录
        patientService.getMainCatalog = function ($scope) {
            var request = {
                "TenantID": $scope.currentUser.Body.Tenant.TenantID
            };
            HttpService.mainCatalogRequest(request, ResourceFactory.operateCode.get,
                function (response) {
                    if (response.Header.StatusCode == 0) {
                        $scope.MainCategoryList = response.Body;
                    } else {
                        $scope.MainCategoryList = null;
                    }
                },
                function (response) {
                    console.log(response);
                }
            );
        };

        //保存收费
        patientService.saveFee = function (data, element) {
            try {
                HttpService.createBillRequest(data, ResourceFactory.operateCode.update,
                    function (response) {
                        if (response.Header.StatusCode == 0) {
                            patientService.alert("账单生成成功，请到收费处缴费！");
                            $("#charge").modal("hide");
                        }
                        else {
                            patientService.alert(GetErrormsg(response.Header.StatusCode));
                        }
                    },
                    function (response) {
                        console.log(response);
                    });
            }
            catch (e) {
                console.log(e);
            }
        };

        //增加当前收费项目
        patientService.addDetailItem = function(item){
            scope.currentCostItems.push(item);
            scope.$apply();
        };

        //获取收费项目
        patientService.getCatalogItems = function (element, categoryId) {
            var request = {
                TenantID: element.currentPatient.TenantID
            };

            if (categoryId != undefined && categoryId == "") {
                request.CategoryID = categoryId;
            }
            try {
                HttpService.subCatalogRequest(request, ResourceFactory.operateCode.get,
                    function (response) {
                        if (response.Header.StatusCode == 0) {
                            $("#loading_div").modal("hide");
                            if (categoryId == undefined) {
                                element.CatalogItems = response.Body;
                                element.createTree(element.CatalogItems);
                            }
                            element.SubItems = element.CatalogItems[0].SubCategories;
                        }
                        else {
                            $("#loading_div").modal("hide");
                            patientService.alert(GetErrormsg(response.Header.StatusCode));
                        }
                    },
                    function (response) {
                        patientService.alert("系统繁忙，请稍后重试！");
                        console.log(response);
                    });
            }
            catch (e) {
                console.log(e);
            }
        };

        //获取收费明细项目
        patientService.getDetailCatalog = function ($scope, category, node) {
            if (category == undefined) {
                var request = {
                    TenantID: $scope.currentAppoint.TenantID,
                    SubCategoryID: $scope.currentAppoint.SubCategoryID
                };
            } else {
                var request = {
                    TenantID: $scope.currentPatient.TenantID,
                    CategoryID: category.CategoryID,
                    SubCategoryID: category.SubCategoryID
                };
            }

            HttpService.costItemsRequest(request, ResourceFactory.operateCode.get,
                function (response) {
                    if (response.Header.StatusCode == 0) {
                        if(category)
                        {
                            var info = $.parseJSON(node.JsonData);
                            var categoryInfo = {
                                CategoryID: info.CategoryID,
                                CategoryName: info.CategoryName,
                                SubCategoryID: info.SubCategoryID,
                                SubCategoryName: info.Name
                            };
                            node.removeChildNodes();
                            for (var i = 0; i < response.Body.length; i++) {
                                var costItem = {
                                    item: response.Body[i],
                                    categoryInfo: categoryInfo
                                };
                                node.createChildNode(response.Body[i].Item.Name, false, 'icon-folder-close-alt', null, '',
                                    JSON.stringify(costItem), 3, function (param) {
                                        var temp = $.parseJSON(param);
                                        patientService.addDetailItem(PatientFactory.DealCostItems(temp));
                                    })
                            }
                            node.expandNode();
                        }
                        else
                        {
                            $scope.currentCostItems = PatientFactory.DealCostItems(response.Body, $scope.currentAppoint);
                        }
                    } else {
                        $scope.currentCostItems = null;
                        patientService.alert(GetErrormsg(response.Header.StatusCode));
                    }
                },
                function (response) {
                    console.log(response);
                }
            );
        };

        //账户充值
        patientService.accountRecharge = function(request, $scope){
            try
            {
                HttpService.accountRechargeRequest(request, ResourceFactory.operateCode.insert,
                function(response){
                    $scope.isCompleted = true;
                    if(response.Header.StatusCode == 0)
                    {
                        $scope.account = response.Body;
                        $scope.currentPatient.Amount = $scope.account.Amount;
                        $scope.orginCurrentPatient.Amount = $scope.account.Amount;
                        patientService.alert("充值成功！");

                        var param = {
                            TenantID: request.TenantID,
                            PatientID: request.PatientID
                        };

                        $scope.resetAccountUpdate();
                        patientService.getAccountPipeline(param, $scope);
                    }
                    else
                    {
                        patientService.alert(GetErrormsg(response.Header.StatusCode));
                    }
                },
                function(response){
                    patientService.alert("系统繁忙，请稍候重试！");
                    console.log(response);
                })
            }
            catch (e)
            {
                console.log(e);
            }
        };

        //账户转账
        patientService.accountTransfer = function(request, $scope){
            try
            {
                HttpService.accountTransferRequest(request, ResourceFactory.operateCode.insert,
                    function(response){
                        $scope.isCompleted = true;
                        if(response.Header.StatusCode == 0)
                        {
                            $scope.account = response.Body;
                            $scope.currentPatient.Amount = $scope.account.Amount;
                            $scope.orginCurrentPatient.Amount = $scope.account.Amount;
                            patientService.alert("转账成功！");

                            var param = {
                                TenantID: request.TenantID,
                                PatientID: request.PatientID
                            };

                            $scope.resetAccountUpdate();
                            patientService.getAccountPipeline(param, $scope);
                        }
                        else
                        {
                            patientService.alert(GetErrormsg(response.Header.StatusCode));
                        }
                    },
                    function(response){
                        patientService.alert("系统繁忙，请稍候重试！");
                        console.log(response);
                    })
            }
            catch (e)
            {
                console.log(e);
            }
        };

        //账户退费
        patientService.accountRefund = function(request, $scope){
            try
            {
                HttpService.accountRefundRequest(request, ResourceFactory.operateCode.insert,
                    function(response){
                        $scope.isCompleted = true;
                        if(response.Header.StatusCode == 0)
                        {
                            $scope.account = response.Body;
                            $scope.currentPatient.Amount = $scope.account.Amount;
                            $scope.orginCurrentPatient.Amount = $scope.account.Amount;
                            patientService.alert("退款成功！");
                            var param = {
                                TenantID: request.TenantID,
                                PatientID: request.PatientID
                            };

                            $scope.resetAccountUpdate();
                            patientService.getAccountPipeline(param, $scope);
                        }
                        else
                        {
                            patientService.alert(GetErrormsg(response.Header.StatusCode));
                        }
                    },
                    function(response){
                        patientService.alert("系统繁忙，请稍候重试！");
                        console.log(response);
                    })
            }
            catch (e)
            {
                console.log(e);
            }
        };

        //获取账户流水线
        patientService.getAccountPipeline = function(request, $scope){
            try
            {
                HttpService.accountRequest(request, ResourceFactory.operateCode.get,
                function(response){
                    if(response.Header.StatusCode == 0)
                    {
                        $scope.accountPipeLineList = response.Body.Histories;
                        $scope.account = response.Body.Account;
                        if(!$scope.account)
                        {
                            $scope.account = {
                                ID: 0,
                                PatientID: $scope.currentPatient.PatientID,
                                TenantID: $scope.currentPatient.TenantID,
                                Amount: 0,
                                State: 0,
                                CreateTime: ""
                            }
                        }
                    }
                    else
                    {
                        patientService.alert(GetErrormsg(response.Header.StatusCode));
                    }
                },
                function(response){
                    patientService.alert("系统繁忙，请稍后再试！");
                    console.log(response);
                });
            }
            catch (e)
            {
                console.log(e);
            }
        };

        //获取二维码
        patientService.getQRCodeInfos = function (request, $scope) {
            try
            {
                HttpService.createSceneQRCodeRequest(request,ResourceFactory.operateCode.get,
                    function (response) {
                        if (response.Header.StatusCode == 0) {
                            $scope.currentPatient.QRCodes = FileURL + "QRCode/" + response.Body.QRCode;
                        }
                        else {
                            patientService.alert(GetErrormsg(response.Header.StatusCode));
                        }
                    },
                    function (response) {
                        console.log(response);
                    }
                );
            }
            catch (e) {
                console.log(e);
            }
        };

        //初始化环境
        patientService.initialize = function ($scope) {
            ResourceFactory.module = MenuEnum.PatientMG;
            scope = $scope;
            CommonFun.bindingDateControl("visitTime", "", new Date(), true, "hour");
            var currentUser = CommonFun.getDataFromSession("CurrentUser");
            CommonFun.saveDataToSession("module", MenuEnum.PatientMG);
            var request = {
                TenantId: currentUser.Body.Tenant.TenantID
            };

            try
            {
                HttpService.patientRequest(request, ResourceFactory.operateCode.get,
                function(response){
                    $(".body_hide").css("opacity", "1");
                    $("#loading_div").modal("hide");
                    if(response.Header.StatusCode == 0)
                    {
                        PatientMGData = response.Body;
                        $scope.patientTypeList = patientService.getPatientTypeList(PatientMGData.PatientLevelList, 1);
                        $scope.PatientLevelList = PatientMGData.PatientLevelList;
                        $scope.patientSourceList = patientService.getPatientSourceList(PatientMGData.PatientSourceList);
                        var patient = patientService.getMappingPatientList(PatientMGData.PatientList);
                        $scope.patientList = patient.PatientList;
                        $scope.patientInfoList = patient.PatientInfoList;
                        $scope.currentPatient = patientService.ConvertPatient($scope.patientList[0]);
                    }
                    else
                    {
                        patientService.alert(GetErrormsg(response.Header.StatusCode));
                    }
                },
                function(response){
                    console.log(response);
                })
            }
            catch(e)
            {
                console.log(e);
            }
        };

        //是否当前操作的权限
        patientService.isWithOperatePermission = function(operateName){
            var action = ResourceFactory.Auths[operateName];
            return PermissionFactory.isWithOperatePermission(MenuEnum.PatientMG, action);
        };

        //确认窗口
        patientService.confirm = function(msg, callback, noCallback){
            ResourceFactory.MsgBox.Confirm("温馨提示", msg, callback, noCallback);
        };

        //提示
        patientService.alert = function (msg) {
            ResourceFactory.MsgBox.Alert("消息", msg);
        };

        return patientService;
    }]);

patientModule.controller("PatientController", ["PatientService", "$scope", "$location", "CalendarService", "$timeout", "PushMessageService", "$compile", function (PatientService, $scope, $location, CalendarService, $timeout, PushMessageService, $compile) {
    var isEdit = false;

    var getFormatDate = function (time, type) {
        var temp = "";
        if(type == 0 && !time)
        {
            temp = new Date();
        }
        else
        {
            if(!time)
            {
                return "";
            }
            else
            {
                temp = time;
            }
        }

        var year = temp.getFullYear();
        var month = (temp.getMonth() + 1).toString();
        if (month.length == 1) {
            month = "0" + month;
        }

        var day = temp.getDate().toString();
        if (day.length == 1) {
            day = "0" + day;
        }

        if (type == 0) {
            return year + "-" + month + "-" + day;
        }

        var hour = temp.getHours().toString();
        if (hour.length == 1) {
            hour = "0" + hour;
        }

        var minute = temp.getMinutes().toString();
        if (minute.length == 1) {
            minute = "0" + minute;
        }

        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":00";
    };

    //页面初始化
    $scope.initialize = function () {
        $scope.genderList = GenderList;
        $scope.searchRequest = PatientService.getSearchRequest();

        //保险类型
        $scope.InsuranceTypeList = [{
            Type: "0",
            Name: "其他"
        },{
            Type: "1",
            Name: "人寿保险"
        },{
            Type: "2",
            Name: "健康保险"
        },{
            Type: "3",
            Name: "人身意外伤害保险"
        }];

        //缴费方式
        $scope.ChargeTypeList = [{
            Type: "1",
            Name: "现金"
        },{
            Type: "2",
            Name: "银行卡"
        },{
            Type: "3",
            Name: "微信"
        },{
            Type: "4",
            Name: "支付宝"
        },{
            Type: "5",
            Name: "社保卡"
        },{
            Type: "6",
            Name: "会员卡"
        },{
            Type: "8",
            Name: "其他"
        }];

        PatientService.initialize($scope);
        // 日历
        $scope.appointment = {};
        CalendarService.setScope($scope);
        $scope.uiConfig = CalendarService.uiConfig;
        $scope.eventSources = CalendarService.eventSources;

        $scope.currentUser = CommonFun.getDataFromSession("CurrentUser");
        //收费类型：默认快速收费
        $scope.ChargePattern = true;

        $scope.isAbled = true;

        $scope.isCompleted = true;

        //与主帐号关系
        $scope.relationList = [
            {
                Type: 1,
                Name: "亲属"
            },{
                Type: 2,
                Name: "朋友"
            },{
                Type: 3,
                Name: "同事"
            },{
                Type: 4,
                Name: "同学"
            },{
                Type: 5,
                Name: "其他"
            }];

        //菜单样式
        $scope.options = {
            name:"",
            textLimit: 10,
            offsetX: 3,
            offsetYs: 3,
            beforeShow: $.noop,
            afterShow: $.noop
        };

        //鼠标右击菜单
        $scope.mouseClickMenu = [[{
            text: "新增预约",
            func: $scope.addNewReservation
        }],[{
            text: "新增回访",
            func: $scope.addNewVisit
        }],[{
            text: "创建账单",
            func: $scope.addCharge
        }],[{
            text: "查看详情",
            func: $scope.showDetail
        }]];
    };
    //转换保险种类
    $scope.convertInsuranceType = function(type){
        switch(type)
        {
            case "0":
                return "其他";
            case "1":
                return "人寿保险";
            case "2":
                return "健康保险";
            case "3":
                return "人身意外伤害保险";
            default:
                return "";
        }
    };

    //患者搜索点击
    $scope.searchPatients = function () {
        PatientService.searchPatients($scope);
    };

    //新增患者点击
    $scope.addNewPatient = function () {
        if (!PatientService.isWithOperatePermission("OperateAuth_addPatient")) {
            PatientService.alert("对不起，您没有权限，请联系管理员！");
            return;
        }

        $scope.isRelation = false;
        $scope.resetPatient();
        $("#new_patient").modal("show");
    };

    //患者信息保存
    $scope.savePatient = function () {
        if ($scope.isAbled) {
            $scope.isAbled = false;
            if (!$.formValidator.pageIsValid("1")) {
                $scope.isAbled = true;
                return;
            }

            PatientService.savePatient($scope);
        }
        else
        {
            return false;
        }
    };

    //患者信息重置
    $scope.resetPatient = function () {
        $scope.selectPatientTypeList = PatientService.getPatientTypeList(PatientMGData.PatientLevelList, 2);
        $scope.newPatient = {
            ID: 0,
            PatientID: 0,
            Name: "",
            Gender: GenderList[0],
            Birthday: "",
            Mobile: "",
            Address: "",
            PatientLevel: $scope.selectPatientTypeList[0],
            PatientSource: $scope.patientSourceList[0],
            MedicalRecordNo: "",
            Label: "",
            State: "",
            Remark: "",
            TenantID: "",
            CreateTime: "",
            InsuranceNo: "",
            InsuranceType: "0",
            SocialSecurityNo: "",
            InsuranceName: "",
            CardNo: "",
            Amount: 0,
            OpenID: "",
            IdentityCardNo: ""
        };
    };

    //患者信息更新
    $scope.updatePatient = function () {
        if (!isEdit && !$.formValidator.pageIsValid("2")) {
            return;
        }

        var levelBol = false;
        for (var i = 0; i < $scope.PatientLevelList.length; i++) {
            var temp = $scope.PatientLevelList[i];
            if ($scope.editPatient.PatientLevel.Name == temp.Name) {
                $scope.editPatient.PatientLevel.PatientLevelID = temp.PatientLevelID;
                $scope.editPatient.PatientLevel.ID = temp.ID;
                levelBol = true;
            }
        }

        if (!levelBol) {
            $scope.editPatient.PatientLevel.CreateTime = "";
            $scope.editPatient.PatientLevel.ID = "0";
            $scope.editPatient.PatientLevel.PatientLevelID = "";
            $scope.editPatient.PatientLevel.State = 0;
            $scope.editPatient.PatientLevel.TenantID = $scope.currentUser.Body.Tenant.TenantID;
        }

        PatientService.updatePatient($scope);
        isEdit = false;
    };

    //微信解绑
    $scope.OpenClick = function () {
        $scope.currentPatient.OpenID = "";
        $scope.editPatient = PatientService.ConvertPatient($scope.currentPatient);
        PatientService.updatePatient($scope);
    };

    //患者编辑点击
    $scope.editPatientInfo = function () {
        if (!PatientService.isWithOperatePermission("PatientMG_editPatient")) {
            PatientService.alert("对不起，您没有权限，请联系管理员！");
            return;
        }

        $scope.isForceUpdate = false;
        $scope.selectPatientTeList = PatientService.getPatientTypeList(PatientMGData.PatientLevelList, 2);
        $scope.editPatient = PatientService.ConvertPatient($scope.currentPatient);
        $(".div_edit").show();
        $(".div_show").hide();
    };

    //动态符合条件列表展示
    $scope.changePatientLevel = function () {
        $scope.searchPatientLevels = [];
        if ($scope.editPatient.PatientLevel.Name == "") {
            return;
        }

        for (var i = 0; i < $scope.PatientLevelList.length; i++) {
            var temp = $scope.PatientLevelList[i];
            if (temp.Name.indexOf($scope.editPatient.PatientLevel.Name.toUpperCase()) > -1) {
                $scope.searchPatientLevels.push(temp);
            }
        }
    };

    //画板点击
    $scope.searchTemplateClick = function (temp) {
        $scope.currentPatient.PatientLevel.Name = temp.Name;
        $scope.currentPatient.PatientLevel.PatientLevelID = temp.PatientLevelID;
        $scope.currentPatient.PatientLevel.ID = temp.ID;
        $scope.currentPatient.PatientLevel.Color = temp.Color;
        $scope.editPatient.PatientLevel.Name = temp.Name;
        $scope.editPatient.PatientLevel.PatientLevelID = temp.PatientLevelID;
        $scope.editPatient.PatientLevel.ID = temp.ID;

        $scope.searchPatientLevels = [];
    };

    //展示患者基本信息
    $scope.showBaseDetail = function (patient, index, $event) {
        if($($("#patient_list tbody").children("tr.selected")))
        {
            $($("#patient_list tbody").children("tr.selected")).children("td.selected").removeClass("selected");
            $($("#patient_list tbody").children("tr.selected")).removeClass("selected");
        }

        if($event.button == 0 || $event.button == 2) //鼠标右击或者左击
        {
            if($event.button == 2)
            {
                $($event.target).smartMenu($scope.mouseClickMenu, $scope.options);
            }

            $($("#patient_list tbody").children("tr")[index]).addClass("selected");
            $($("#patient_list tbody").children("tr")[index]).children("td").addClass("selected");
            isEdit = false;
            $("#patientDetail .div_edit").hide();
            $("#patientDetail .div_show").show();
            $scope.currentIndex = index;
            $scope.orginCurrentPatient = patient;
            $scope.currentPatient = PatientService.ConvertPatient(patient);
        }
    };

    //预约事项下拉框
    $scope.blurHide = function (name, id) {
        $(document).click(function ($event) {
            var e = $event, obj = $(e.srcElement || e.target);
            if ($(obj).is("#" + id + "," + "#" + id + " *")) {
                var domParent = $($(obj)[0]).parent()[0];
                if ($(domParent).attr("class").indexOf("first") > -1 || $(domParent).attr("class").indexOf("second") > -1) {
                    var brotherNodes = $($(domParent)[0]).siblings();
                    if (brotherNodes != undefined && brotherNodes.length > 0) {
                        for (var i = 0; i < brotherNodes.length; i++) {
                            $(brotherNodes[i]).children("ul").slideUp("slow");
                        }
                    }
                }
            } else {
                if (!$(obj).is(".autoSelect[name=" + name + "]")) {
                    $("#" + id).slideUp("slow");
                }
            }
        });
    };

    $scope.inactiveClick = function ($event) {
        var e = $event.target;
        if ($(e).siblings('ul').css('display') == 'none') {
            $(e).parent('li').siblings('li').removeClass('inactives');
            $(e).addClass('inactives');
            $(e).siblings('ul').slideDown(100).children('li');
            if ($(e).parents('li').siblings('li').children('ul').css('display') == 'block') {
                $(e).parents('li').siblings('li').children('ul').parent('li').children('a').removeClass('inactives');
                $(e).parents('li').siblings('li').children('ul').slideUp(100);
            }
        } else {
            //控制自身变成+号
            $(e).removeClass('inactives');
            //控制自身菜单下子菜单隐藏
            $(e).siblings('ul').slideUp(100);
            //控制自身子菜单变成+号
            $(e).siblings('ul').children('li').children('ul').parent('li').children('a').addClass('inactives');
            //控制自身菜单下子菜单隐藏
            $(e).siblings('ul').children('li').children('ul').slideUp(100);
            //控制同级菜单只保持一个是展开的（-号显示）
            $(e).siblings('ul').children('li').children('a').removeClass('inactives');
        }
    };

    $scope.selectDepartmentClick = function (item, category, subcategory) {
        $(".autoSelect[name='consultantDepartmentName']").val(item.Name);
        $scope.appointment.AppointItemName = item.Name;
        $scope.appointment.CategoryID = category.CategoryID;
        $scope.appointment.CategoryName = category.Name;
        $scope.appointment.SubCategoryName = subcategory.Name;
        $scope.appointment.SubCategoryID = item.SubCategoryID;
        $scope.appointment.AppointItemID = item.AppointItemID;
    };

    $scope.selectCategoryClick = function (item) {
        $(".autoSelect[name='visitItemsList']").val(item.Name);
        $scope.addVisit.VisitItemName = item.Name;
        $scope.addVisit.SubCategoryID = item.SubCategoryID;
        $scope.addVisit.VisitItemID = item.VisitItemID;
    };

    $scope.focusShow = function ($event, id) {
        var e = $event.target;
        var bodyHeight = $("#new_reservation div.modal-body").height();
        var width = e.offsetWidth;
        var height = e.offsetHeight;
        var left = e.offsetLeft;
        var top = e.offsetTop;
        if(id == "visitItems")
        {
            $("#" + id).css({
                "left": left,
                "top": (top + height),
                "position": "absolute",
                "width": width,
                "z-index": 9999,
                "max-height": 300 + "px",
                "overflow-y": "scroll"
            });
        }
        else
        {
            $("#" + id).css({
                "left": left,
                "bottom": (bodyHeight - top + height + 10),
                "position": "absolute",
                "width": width,
                "z-index": 9999,
                "max-height": 300 + "px",
                "overflow-y": "scroll"
            });
        }
        $("#" + id).slideDown("slow");
    };

    //删除当前患者
    $scope.deletePatient = function () {
        if (!PatientService.isWithOperatePermission("OperateAuth_deletePatient")) {
            PatientService.alert("对不起，您没有权限，请联系管理员！");
            return;
        }

        PatientService.confirm("确认要删除患者：" + $scope.currentPatient.Name + "吗？",
        function(){
            PatientService.deletePatient($scope);
        });
    };

    //保存预约点击
    $scope.saveReservation = function () {
        if (!$.formValidator.pageIsValid("3")) {
            return;
        }

        if (!$scope.startTime || !$scope.endTime) {
            promptError("", "请选择预约时间！", "workday", "bottomLeft");
            return;
        }

        if ($scope.appointment.AppointItemName == null || $scope.appointment.AppointItemName == "") {
            promptError("", "请选择预约事项！", "consultantDepartmentName", "bottomLeft");
            return;
        }

        PatientService.saveReservation($scope);
    };

    // 重置日历 issue(strange)
    $scope.resetCalendar = function () {
        CalendarService.renewEvents();
        $scope.appointment.AppointTime = getFormatDate(new Date(), 0);
    };

    //预约信息重置点击
    $scope.resetReservation = function () {
        $scope.appointment = {
            ID: 0,
            AppointID: 0,
            AppointNo: 0,
            PatientID: $scope.currentPatient.PatientID,
            Name: $scope.currentPatient.Name,
            Birthday: $scope.currentPatient.Birthday,
            Gender: $scope.currentPatient.Gender,
            Mobile: $scope.currentPatient.Mobile,
            Address: $scope.currentPatient.Address,
            Remark: $scope.currentPatient.Remark,
            AppointTime: "",
            BeginTime:"",
            EndTime:"",
            AppointDetail: "",
            Status: 1,
            DoctorID: "",
            AppointType: TreatTypeList[0],
            State: 0,
            CreateTime: "",
            PatientSource: $scope.currentPatient.PatientSource,
            TenantID: $scope.currentPatient.TenantID
        };
        $(".ng-valid-parse[name='treatType']").val("number:0");
        $(".ng-pristine[name='doctorName']").val("");
        $(".autoSelect[name='consultantDepartmentName']").val("");
        $scope.resetCalendar();
    };

    //新增预约点击
    $scope.addNewReservation = function () {
        if (!PatientService.isWithOperatePermission("OperateAuth_manageBookItem")) {
            PatientService.alert("对不起，您没有权限，请联系管理员！");
            return;
        }

        $scope.treatTypeList = TreatTypeList;
        $scope.doctors = PatientMGData.DoctorList;
        $scope.resetReservation();
        PatientService.getAppointmentItemsList($scope);

        if($("#new_reservation div.modal-dialog").height() <= 600)
        {
            CalendarService.uiConfig.calendar.height = 180;
        }

        // 等待calendar生成
        setTimeout(function () {
            CalendarService.changeView('agendaDay', 'myCalendar2');
            CalendarService.refreshEventSources("myCalendar2");
            $("#hideDate").change(function () {
                var now = new Date($("#hideDate").val());
                $scope.appointment.AppointTime = getFormatDate(now, 0);
                $("#workday").val($scope.appointment.AppointTime);
            });

            if($("#workday").length <= 0)
            {
                var ele = angular.element('<input id="workday" type="text" style="font-size: 12px;" placeholder="预约日期" class="form-control input-sm" name="workTime" ng-model="appointment.AppointTime">');
                angular.element($($("#appoint_time_view .fc-header-toolbar").children("div.fc-left")[0])).append($compile(ele)($scope));
                CommonFun.bindingDateControl("workday", "", "", false);
            }
        }, 500);

        $scope.$watchGroup(['startTime', 'endTime'], function () {
            $scope.appointment.AppointTime = getFormatDate($scope.startTime, 0);
        });

        $scope.$watch('appointment.AppointTime', function () {
            if ($scope.appointment.AppointTime == ""){
                CalendarService.gotoDate('myCalendar2', new Date());
            }
            else
            {
                CalendarService.gotoDate('myCalendar2', $scope.appointment.AppointTime);
            }
        });
        $("#new_reservation").modal("show");
    };

    //回访重置点击
    $scope.resetVisit = function (operateType) {
        if (operateType == 1) {
            $($("#new_visit div.div_edit")[0]).css("display", "inline-block");
            $($("#new_visit div.div_show")[0]).hide();
        }

        if (operateType == 0) {
            $($("#new_visit div.div_edit")[0]).hide();
            $($("#new_visit div.div_show")[0]).css("display", "inline-block");
        }
    };

    $scope.$watch('selectedAppoint', function () {
        var patient = $scope.selectedAppoint;
        if ($scope.addVisit == null) {
            return;
        }
        if (patient || patient.Appoint) {
            $scope.addVisit.TreatDoctorID = "";
            $scope.addVisit.TreatDoctorName = "";
            $scope.addVisit.TreatTime = "";
        } else {
            $scope.addVisit.TreatDoctorID = patient.Appoint.DoctorID;
            $scope.addVisit.TreatDoctorName = patient.Appoint.DoctorName;
            $scope.addVisit.TreatTime = patient.Appoint.BeginTime;
        }
    });

    //新增回访点击
    $scope.addNewVisit = function () {
        if (!PatientService.isWithOperatePermission("OperateAuth_manageVisitItem")) {
            PatientService.alert("对不起，您没有权限，请联系管理员！");
            return;
        }

        var dataBag = {PatientID: $scope.currentPatient.PatientID, TenantID: $scope.currentPatient.TenantID};
        $scope.doctors = PatientMGData.UserList;
        $scope.resetVisit(0);
        PatientService.GetListForVisit(dataBag, $scope);
        PatientService.visitItemsList($scope);
        var patient = JSON.parse(JSON.stringify($scope.currentPatient));
        $scope.addVisit = {
            PatientID: patient.PatientID,
            PatientName: patient.Name,
            Gender: patient.Gender.Type,
            Mobile: patient.Mobile,
            TreatDoctorID: patient.DoctorID,
            TreatDoctorName: patient.DoctorName,
            TreatTime: patient.BeginTime,
            State: 0,
            Status: 1,
            VisitContent: "",
            VisitResult: "",
            VisitTime: "",
            Remark: "",
            TenantID: patient.TenantID
        };
        $("#new_visit").modal("show");
    };

    //回访信息保存点击
    $scope.saveVisit = function () {
        if (!$.formValidator.pageIsValid("4")) {
            return;
        }

        $scope.addVisit.VisitorID = $scope.selectedVisitor.UserID;
        $scope.addVisit.VisitorName = $scope.selectedVisitor.UserName;
        PatientService.saveVisit($scope.addVisit, $scope);
    };

    //创建账单点击
    $scope.addCharge = function () {
        if (!PatientService.isWithOperatePermission("PatientMG_addBill")) {
            PatientService.alert("对不起，您没有权限，请联系管理员！");
            return;
        }

        $scope.resetCharge();
        $("#loading_div").modal("show");
        var dataBag = {PatientID: $scope.currentPatient.PatientID, TenantID: $scope.currentPatient.TenantID};
        PatientService.getCatalogItems($scope);
        PatientService.GetListForVisit(dataBag, $scope);
        PatientService.getMainCatalog($scope);
        $scope.addMoney = {};
        $("#charge").modal("show");
    };

    //收费类型切换
    $scope.checkChargePattern = function () {
        $scope.originalFee = 0;
        $scope.planTotalFee = 0;
        $scope.discount = 100;
        $scope.totalFeeWithoutDiscount = 0;

        if ($("#costPattern").html() == "项目明细") {
            $("#costPattern").html("快速填写");
            $("#detailedCharge").show();
            $("#fastCharge").hide();
            $scope.ChargePattern = false;
            $scope.detailItemsSum();
            if ($scope.completeTreat) {
                $scope.currentAppoint = $scope.completeTreat.Appoint;
                PatientService.getDetailCatalog($scope);
            }
        } else {
            if ($scope.completeTreat) {
                $scope.currentAppoint = $scope.completeTreat.Appoint;
            }
            $("#costPattern").html("项目明细");
            $("#fastCharge").show();
            $("#detailedCharge").hide();
            $scope.MainCategorySum();
            $scope.ChargePattern = true;
        }

        $scope.calculateDiscountFee();
    };

    //计算折扣价
    $scope.calculateDiscountFee = function(){
        if($scope.discount < 0 || $scope.discount > 100)
        {
            promptError("", "折扣率无效，请重新输入！", "discount");
            $scope.planTotalFee = $scope.totalFeeWithoutDiscount;
        }
        else
        {
            $scope.planTotalFee = ($scope.discount / 100 * parseFloat($scope.totalFeeWithoutDiscount) * 1).toFixed(2);
        }
    };

    //选择就诊事项
    $scope.$watch('completeTreat', function () {
        var patient = $scope.completeTreat;
        $("#appoint_name").validationEngine("hideAll");
        if ($scope.completeTreatList == null) {
            return;
        }
        if (patient == null) {
            $scope.currentCostItems = [];
            $scope.addMoney.DoctorName = "";
            $scope.addMoney.BeginTime = "";
            $scope.addMoney.EndTime = "";
        } else {
            if ($("#costPattern").html() == "快速填写") {
                $scope.currentAppoint = $scope.completeTreat.Appoint;
                PatientService.getDetailCatalog($scope);
            }
            $scope.addMoney.AppointID = patient.Appoint.AppointID;
            $scope.addMoney.AppointItemName = patient.Appoint.AppointItemName;
            $scope.addMoney.DoctorName = patient.Appoint.DoctorName;
            $scope.addMoney.BeginTime = patient.Appoint.BeginTime;
            $scope.addMoney.EndTime = patient.Appoint.EndTime;
        }
    });

    //删除收费项目
    $scope.deleteChargeItem = function(item){
        for (var i = 0; i < $scope.currentCostItems.length; i++) {
            if (item.Item.ID == $scope.currentCostItems[i].Item.ID) {
                $scope.currentCostItems.splice(i, 1);
                $scope.detailItemsSum(item);
                return;
            }
        }
    };

    //项目明细收费方式 汇总金额
    $scope.detailItemsSum = function (item) {
        var Total = 0;
        var planTotal = 0;
        if(item)
        {
            item.planSum = (item.amount * item.Price.Price).toFixed(2);
        }

        if ($scope.currentCostItems && $scope.currentCostItems.length > 0) {
            angular.forEach($scope.currentCostItems, function (data) {
                if (data.amount && CommonFun.checkFormat(data.amount, DataTypeEnum.Number)) {
                    Total = parseFloat(Total) + parseFloat(data.amount * data.Price.Price);
                    planTotal = planTotal + parseFloat(data.planSum);
                }
            });
        }

        if($scope.discount)
        {
            if($scope.discount < 0 || $scope.discount > 100)
            {
                promptError("", "折扣率无效，请重新输入！", "discount");
                $scope.discount = 100;
                $scope.planTotalFee = planTotal.toFixed(2);
            }
            else
            {
                planTotal = ($scope.discount / 100 * planTotal * 1).toFixed(2);
                $scope.planTotalFee = planTotal;
            }
        }
        else
        {
            $scope.planTotalFee = planTotal;
        }

        $scope.originalFee = Total.toFixed(2);
        $scope.totalFeeWithoutDiscount = Total.toFixed(2);
    };

    //计算应收总金额
    $scope.calculatePlanSum = function(){
        var planTotal = 0;

        if ($scope.currentCostItems && $scope.currentCostItems.length > 0) {
            angular.forEach($scope.currentCostItems, function (data) {
                if (data.amount && CommonFun.checkFormat(data.amount, DataTypeEnum.Number)) {
                    planTotal = planTotal + parseFloat(data.planSum);
                }
            });

            $scope.totalFeeWithoutDiscount = planTotal.toFixed(2);
            $scope.calculateDiscountFee();
        }
    };

    //快速填写收费方式 汇总金额
    $scope.MainCategorySum = function () {
        var Total = 0;

        if ($scope.MainCategoryList != undefined && $scope.MainCategoryList != null && $scope.MainCategoryList.length > 0) {
            angular.forEach($scope.MainCategoryList, function (data) {
                if (data.Price != undefined && data.Price != "" && CommonFun.checkFormat(data.Price, DataTypeEnum.Fee)) {
                    Total = parseFloat(Total) + parseFloat(data.Price);
                }
            });

            $scope.originalFee = Total.toFixed(2);
            $scope.totalFeeWithoutDiscount = Total.toFixed(2);
        }

        if($scope.discount)
        {
            if($scope.discount < 0 || $scope.discount > 100)
            {
                promptError("", "折扣率无效，请重新输入！", "discount");
                $scope.discount = 100;
                $scope.planTotalFee = Total.toFixed(2);
            }
            else
            {
                Total = ($scope.discount / 100 * Total * 1).toFixed(2);
                $scope.planTotalFee = Total;
            }
        }
        else
        {
            $scope.planTotalFee = Total.toFixed(2);
        }
    };

    //计算单项收费金额总和
    $scope.calculateSum = function (item) {
        if (item.amount) {
            if (!CommonFun.checkFormat(item.amount, DataTypeEnum.Number)) {
                return 0;
            }

            item.sum = parseFloat(item.Price.Price * item.amount).toFixed(2);
            if (item.amount == 0) {
                item.sum = 0;
            }
        }
        else {
            item.sum = 0;
        }

        return Math.abs(item.sum);
    };

    //创建树形结构
    $scope.createTree = function (items) {
        //属性导航菜单结构
        var context_menu = {
            'context1': {
                elements: [
                    {
                        text: '展开',
                        icon: 'icon-star-empty',
                        action: function (node) {
                            node.expandNode();
                        }
                    },
                    {
                        text: '收缩',
                        icon: 'icon-star-empty',
                        action: function (node) {
                            node.collapseNode();
                        }
                    }
                ]
            }
        };
        if (items) {
            $scope.tree = createTree('ItemTree', 'white', context_menu);

            for (var i = 0; i < items.length; i++) {
                var node1 = $scope.tree.createNode(items[i].Category.Name, false, 'icon-folder-close-alt', null, null, 'context1', JSON.stringify(items[i]), 1);
                for (var j = 0; j < items[i].SubCategories.length; j++) {
                    items[i].SubCategories[j].CategoryName = items[i].Category.Name;
                    var node2 = node1.createChildNode(items[i].SubCategories[j].Name, false, 'icon-folder-close-alt', null, 'context2',
                        JSON.stringify(items[i].SubCategories[j]), 2,
                        function (param, node) {
                            var temp = $.parseJSON(param);
                            PatientService.getDetailCatalog($scope, temp, node);
                        });
                }
            }
        }

        $scope.tree.drawTree();
    };

    // 页面显示 start
    var addZero = function (num) {
        if (num.toString().length == 1) {
            return "0" + num;
        }

        return num;
    };

    $scope.appointTimeText = function (startTime, endTime) {
        var start = new Date(startTime);
        var end = new Date(endTime);
        return addZero(start.getHours()) + ":" + addZero(start.getMinutes()) + "-" + addZero(end.getHours()) + ":" + addZero(end.getMinutes());
    };

    //微信状态显示
    $scope.StateTexts = function (state) {
        if (!state) {
         return "未绑定";
        } else {
         return "已绑定";
        }
    };

    //收费信息保存点击
    $scope.saveCharge = function () {
        var prices = [];
        var isValidate = false;
        if(!$scope.completeTreat)
        {
            promptError($("#appoint_name"), "请选择就诊事项!");
            return;
        }

        var request = {
            Bill: {
                PatientID: $scope.currentPatient.PatientID,
                AppointID:$scope.completeTreat.Appoint.AppointID,
                TenantID: $scope.currentPatient.TenantID,
                BillNo: null,
                CreateTime: null,
                OriginalPrice: $scope.originalFee,
                Discount: $scope.discount,
                DueCharge: $scope.planTotalFee,
                RealCharge: 0,
                Arrears: 0,
                Refund: 0,
                DoctorID: $scope.completeTreat.Appoint.DoctorID,
                DoctorName: $scope.completeTreat.Appoint.DoctorName,
                BillStatus: 1,
                State: 0,
                Description:$scope.Description
            },
            Costs: []
        };

        if (!$scope.planTotalFee) {
            PatientService.alert("账单金额不能为0！");
            return;
        }

        if($scope.ChargePattern) //快速收费
        {
            for (var i = 0; i < $scope.MainCategoryList.length; i++) {

                if ($scope.MainCategoryList[i].Price != "" && $scope.MainCategoryList[i].Price != undefined) {
                    $("#p_" + [i]).formValidator({validatorGroup: "5"}).functionValidator({fun: PatientMG.validateFee});
                }

                $scope.MainCategoryList[i].ChargeItem = {
                    Price: $scope.MainCategoryList[i].Price,
                    Remark: $scope.MainCategoryList[i].Remark,
                    CategoryID: $scope.MainCategoryList[i].CategoryID,
                    CategoryName: $scope.MainCategoryList[i].Name,
                    TenantID: $scope.currentUser.Body.Tenant.TenantID,
                    State: 0,
                    PatientID: $scope.currentPatient.PatientID,
                    AppointID: $scope.addMoney.AppointID,
                    AppointItemName: $scope.addMoney.AppointItemName,
                    DiscountPrice: $scope.MainCategoryList[i].Price
                };

                if ($scope.MainCategoryList[i].ChargeItem.Price) {
                    prices.push($scope.MainCategoryList[i].ChargeItem);
                }
            }

            if($.formValidator.pageIsValid("5"))
            {
                request.Costs = prices;
                PatientService.saveFee(request, $scope);
            }
        }
        else //明细收费
        {
            for (var i = 0; i < $scope.currentCostItems.length; i++) {
                $scope.currentCostItems[i].ChargeItem = {
                    Price: $scope.currentCostItems[i].sum,
                    Remark: $scope.currentCostItems[i].Remark,
                    CategoryID: $scope.currentCostItems[i].Category.CategoryID,
                    CategoryName: $scope.currentCostItems[i].Category.CategoryName,
                    SubCategoryID: $scope.currentCostItems[i].SubCategory.SubCategoryID,
                    SubCategoryName: $scope.currentCostItems[i].SubCategory.SubCategoryName,
                    CostItem: $scope.currentCostItems[i].Item.Name,
                    CostItemID: $scope.currentCostItems[i].Item.CostItemID,
                    TenantID: $scope.currentPatient.TenantID,
                    State: 0,
                    PatientID: $scope.currentPatient.PatientID,
                    AppointID: $scope.completeTreat.Appoint.AppointID,
                    DiscountPrice: $scope.currentCostItems[i].planSum
                };

                if ($scope.currentCostItems[i].ChargeItem.Price) {
                    prices.push($scope.currentCostItems[i].ChargeItem);
                    if ($scope.currentCostItems[i].isValidate != undefined && !$scope.currentCostItems[i].isValidate) {
                        isValidate = false;
                        break;
                    }

                    if ($scope.currentCostItems[i].isValidate) {
                        isValidate = true;
                    }
                }
            }

            if (prices.length <= 0) {
                PatientService.alert("请至少选择一项！");
                return;
            }

            if (isValidate) {
                request.Costs = prices;
                PatientService.saveFee(request, $scope);
            }
        }
    };

    //错误信息提示
    var promptError = function (sender, message, id, location) {
        var tipLocation = "topLeft";

        if(location)
        {
            tipLocation = location;
        }

        if(id)
        {
            $("#"+id).validationEngine('showPrompt', message, '', tipLocation, true);
            setTimeout(function(){$("#"+id).validationEngine("hideAll");}, 1000)
        }
        else
        {
            $(sender).validationEngine('showPrompt', message, '', tipLocation, true);
            setTimeout(function(){$(sender).validationEngine("hideAll");}, 1000)
        }
    };

    //格式校验
    $scope.checkPriceFormat = function (item, e, type) {
        item.isValidate = false;
        if (type == 1) //费用校验
        {
            if (item.Price != undefined && item.Price != "" && !CommonFun.checkFormat(item.Price, DataTypeEnum.Fee)) {
                promptError(e.target, "请输入有效金额,小数点后保留2位!");
                item.isValidate = false;
            }
            else {
                $(e.target).validationEngine("hideAll");
                item.Price = ((item.Price == "" || item.Price == undefined) ? "" : parseFloat(item.Price).toFixed(2));
                item.isValidate = true;
            }
        }

        if (type == 2) {
            if (item.amount != undefined && item.amount != "" && !CommonFun.checkFormat(item.amount, DataTypeEnum.Number)) {
                promptError(e.target, "请输入正整数!");
                item.isValidate = false;
            }
            else {
                $(e.target).validationEngine("hideAll");
                item.isValidate = true;
            }
        }
    };

    //收费重置
    $scope.resetCharge = function () {
        $scope.originalFee = 0;
        $scope.currentCostItems = [];
        $scope.totalFeeWithoutDiscount = 0;
        $scope.selectedAppoint = {};
        $scope.isRefund = false;
        $scope.discount = 100; //账单折扣
        $scope.Description = "";
        $scope.planTotalFee = 0;
        $scope.currentPatient.ChargeItem = {
            item1: "",
            item2: "",
            item3: "",
            item4: "",
            item5: ""
        }
    };

    //导出患者列表到excel
    $scope.exportToExcel = function () {
        if(!PatientService.isWithOperatePermission("OperateAuth_exportPatient"))
        {
            PatientService.alert("对不起，您没有权限，请联系管理员！");
            return;
        }

        PatientService.exportPatient($scope.searchRequest);
    };

    //进入患者详情页
    $scope.showDetail = function () {
        if ($scope.currentPatient.Name) {
            CommonFun.saveDataToSession("CurrentPatient", $scope.currentPatient);
            CommonFun.saveDataToSession("module", MenuEnum.PatientMG);
            window.location.href = '../WebPages/DCPatientDetail.html';
        }
    };

    //检测是否为主帐号
    $scope.checkIsOwner = function(patient){
        if(patient.MainID)
        {
            return "（副）";
        }
        else
        {
            return "（主）";
        }
    };

    //打印收费账单
    $scope.printChargeOrder = function(){
        $scope.chargeList = [];
        $scope.chargeTotal = 0;
        if($scope.ChargePattern) //快速收费
        {
            for (var i = 0; i < $scope.MainCategoryList.length; i++) {
                if ($scope.MainCategoryList[i].Price) {
                    $scope.chargeList.push({
                        Price: $scope.MainCategoryList[i].Price,
                        Remark: $scope.MainCategoryList[i].Remark,
                        CostItem: $scope.MainCategoryList[i].Name,
                        Information: $scope.MainCategoryList[i].Price.indexOf("-") > -1 ? "退费：￥"+Math.abs(parseFloat($scope.MainCategoryList[i].Price)) : "收费：￥"+$scope.MainCategoryList[i].Price
                    });

                    $scope.chargeTotal = $scope.chargeTotal + parseFloat($scope.MainCategoryList[i].Price);
                }
            }
        }
        else //明细收费
        {
            for (var i = 0; i < $scope.currentCostItems.length; i++) {
                if ($scope.currentCostItems[i].sum) {
                    $scope.chargeList.push({
                        Price: $scope.currentCostItems[i].sum,
                        Remark: $scope.currentCostItems[i].Remark,
                        CostItem: $scope.currentCostItems[i].Item.Name,
                        Information: $scope.currentCostItems[i].sum.indexOf("-") > -1 ? "退费：￥"+Math.abs(parseFloat($scope.currentCostItems[i].sum)) : "收费：￥"+$scope.currentCostItems[i].sum
                    });

                    $scope.chargeTotal = $scope.chargeTotal + parseFloat($scope.currentCostItems[i].sum);
                }
            }
        }

        //解决angularjs绘制html标签到页面，延时执行打印
        $timeout(function(){
            $.print("#charge_order");
        }, 1000);
    };

    //重置请求数据
    $scope.resetAccountUpdate = function(){
        $scope.recharge.RechargeAmount = 0;
        $scope.recharge.RechargeType = "8";
        $scope.recharge.Remark = "";

        $scope.transfer.TransferAmount = 0;
        $scope.transfer.Remark = "";
        $scope.transfer.SelectedPatientID = "";

        $scope.refund.RefundAmount = 0;
        $scope.refund.Remark = "";
    };

    //患者账户管理
    $scope.amountRecharge = function(){
        if($scope.currentPatient)
        {
            $("#account_manage").modal("show");
            $("#language").val("");
            $scope.activePanel("recharge");
            $scope.recharge = {
                RechargeAmount: 0,
                RechargeType: "8",
                Remark: ""
            };
            $scope.transfer = {
                TransferAmount: 0,
                Remark: "",
                SelectedPatientID: ""
            };
            $scope.refund = {
                RefundAmount: 0,
                Remark: ""
            };

            var request = {
                TenantID: $scope.currentPatient.TenantID,
                PatientID: $scope.currentPatient.PatientID
            };

            $scope.accountPipeLineList = [];
            PatientService.getAccountPipeline(request, $scope)
        }
        else
        {
            PatientService.alert("请先选择患者！");
        }
    };

    //激活当前panel
    $scope.activePanel = function(id){
        $("#recharge").removeClass("cus_active");
        $("#transfer").removeClass("cus_active");
        $("#refund").removeClass("cus_active");
        $("#recharge_tab").removeClass("account_tab_active");
        $("#transfer_tab").removeClass("account_tab_active");
        $("#refund_tab").removeClass("account_tab_active");

        switch(id)
        {
            case "recharge": //充值
                $("#recharge").removeClass("cus_disabled");
                $("#recharge").addClass("cus_active");
                $("#recharge_tab").addClass("account_tab_active");
                if($("#transfer").prop("class").indexOf("cus_disabled") < 0)
                {
                    $("#transfer").addClass("cus_disabled");
                }

                if($("#refund").prop("class").indexOf("cus_disabled") < 0)
                {
                    $("#refund").addClass("cus_disabled");
                }
                break;
            case "transfer": //转账
                $("#transfer").removeClass("cus_disabled");
                $("#transfer").addClass("cus_active");
                $("#transfer_tab").addClass("account_tab_active");
                if($("#recharge").prop("class").indexOf("cus_disabled") < 0)
                {
                    $("#recharge").addClass("cus_disabled");
                }

                if($("#refund").prop("class").indexOf("cus_disabled") < 0)
                {
                    $("#refund").addClass("cus_disabled");
                }
                break;
            case "refund": //退款
                $("#refund").removeClass("cus_disabled");
                $("#refund").addClass("cus_active");
                $("#refund_tab").addClass("account_tab_active");
                if($("#recharge").prop("class").indexOf("cus_disabled") < 0)
                {
                    $("#recharge").addClass("cus_disabled");
                }

                if($("#transfer").prop("class").indexOf("cus_disabled") < 0)
                {
                    $("#transfer").addClass("cus_disabled");
                }
                break;
            default:
                break;
        }
    };

    //更新当前账户
    $scope.updateAccount = function(type){
        if($scope.isCompleted)
        {
            var operatorID = "";
            var operatorName = "";
            if($scope.currentUser.Body.UserType == 1)
            {
                operatorID = $scope.currentUser.Body.Tenant.TenantID;
                operatorName = "院长";
            }
            else
            {
                operatorID = $scope.currentUser.Body.User.UserID;
                operatorName = $scope.currentUser.Body.User.UserName;
            }

            var request = {
                PatientID: $scope.currentPatient.PatientID,
                TenantID: $scope.currentPatient.TenantID,
                Amount: 0.00,
                AccountOperateType: type,
                PayeeID: operatorID,
                PayeeName: operatorName,
                PaymentCategory: "",
                Description:"",
                ToPatientID:""
            };

            switch(type)
            {
                case 1: //充值
                    if (!PatientService.isWithOperatePermission("PatientMG_accountRecharge")) { //收费权限绑定账户
                        PatientService.alert("对不起，您没有权限，请联系管理员！");
                        return;
                    }

                    if($.formValidator.pageIsValid("6"))
                    {
                        if($scope.recharge.RechargeAmount <= 0)
                        {
                            promptError("", "对不起，充值金额不能为0！", "recharge_amount");
                            return;
                        }

                        $scope.currentAccountType = type;
                        $scope.isCompleted = false;
                        request.Amount = $scope.recharge.RechargeAmount;
                        request.PaymentCategory = $scope.recharge.RechargeType;
                        request.Description = $scope.recharge.Remark;
                        PatientService.accountRecharge(request, $scope);
                    }
                    break;
                case 2://退款
                    if (!PatientService.isWithOperatePermission("PatientMG_accountRefund")) { //收费权限绑定账户
                        PatientService.alert("对不起，您没有权限，请联系管理员！");
                        return;
                    }

                    if($.formValidator.pageIsValid("8"))
                    {
                        if($scope.refund.RefundAmount <= 0)
                        {
                            promptError("", "对不起，退款金额不能为0！", "refund_amount");
                            return;
                        }


                        if($scope.account.Amount < $scope.refund.RefundAmount)
                        {
                            promptError("", "对不起，账户余额不足，无法退款！", "refund_amount");
                            return;
                        }
                        $scope.currentAccountType = type;
                        $scope.isCompleted = false;
                        request.Amount = $scope.refund.RefundAmount;
                        request.Description = $scope.refund.Remark;
                        request.PaymentCategory = 0;
                        PatientService.accountRefund(request, $scope);
                    }
                    break;
                case 3: //转账
                    if (!PatientService.isWithOperatePermission("PatientMG_accountTransfer")) { //收费权限绑定账户
                        PatientService.alert("对不起，您没有权限，请联系管理员！");
                        return;
                    }

                    if($.formValidator.pageIsValid("7"))
                    {
                        if($scope.transfer.RefundAmount <= 0)
                        {
                            promptError("", "对不起，转账金额不能为0！", "transfer_amount");
                            return;
                        }

                        if($scope.account.Amount < $scope.transfer.TransferAmount)
                        {
                            promptError("", "对不起，账户余额不足，无法转账！", "transfer_amount");
                            return;
                        }

                        $scope.currentAccountType = type;
                        $scope.isCompleted = false;
                        request.Amount = $scope.transfer.TransferAmount;
                        request.Description = $scope.transfer.Remark;
                        request.ToPatientID = $('#language-id').val();
                        request.PaymentCategory = 0;
                        PatientService.accountTransfer(request, $scope);
                    }
                    break;
                default:
                    break;
            }
        }
        else
        {
            switch ($scope.currentAccountType)
            {
                case 1:
                    alert("充值正在进行，请耐心等待！");
                    break;
                case 2:
                    alert("转账正在进行，请耐心等待！");
                    break;
                case 3:
                    alert("退款正在进行，请耐心等待！");
                    break;
                default:
                    break;
            }
            return false;
        }
    };

    //转换操作
    $scope.convertOperator = function(type){
        switch (type)
        {
            case 1:
                return "充值";
            case 2:
                return "退款";
            case 3:
                return "转出";
            case 4:
                return "转入";
            default:
                return "无";
        }
    };

    //转换收费方式
    $scope.convertChargeType = function(type){
        if(type)
        {
            switch (type)
            {
                case 1:
                    return "现金";
                case 2:
                    return "银行卡";
                case 3:
                    return "微信";
                case 4:
                    return "支付宝";
                case 5:
                    return "社保卡";
                case 6:
                    return "会员卡";
                case 8:
                    return "其他";
                case 9:
                    return "账单退款";
                default:
                    return "无";
            }
        }
        else
        {
            return "无";
        }
    };

    //获取二维码点击
    $scope.getQRCodes = function () {
        if (!$scope.currentPatient) {
            PatientService.alert("请先选择患者！");
            return;
        }

        var request = {
            PatientID: $scope.currentPatient.PatientID
        };

        PatientService.getQRCodeInfos(request, $scope);
    };

    $scope.initialize();
}]);

angular.bootstrap($("#main-content"), ["PatientModule"]);