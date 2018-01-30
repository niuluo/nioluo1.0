var PlatformMG = {
    Init: function() {
        $("#loading_div").modal("show");
        MenuActive.setActive(MenuEnum.PlatformMG);
        // CommonFun.bindingDateControl("birthday", new Date(), "", false);
        CommonFun.bindingDateControl("visitTime", "", new Date(), true, "hour");
        CommonFun.bindingDateControl("VisitTime2", "", new Date(), true, "hour");
        CommonFun.bindingDateControl("workdayBegin", "", new Date(), true, "hour");
        CommonFun.bindingDateControl("workdayEnd", "", new Date(), true, "hour");
        CommonFun.bindingDateControl("start_date", "", "", false, "month");
        CommonFun.bindingDateControl("end_date", "", "", false, "month");
        CommonFun.bindingDateControl("visit_start_date", "", "", false, "month");
        CommonFun.bindingDateControl("visit_end_date", "", "", false, "month");
        $.formValidator.initConfig({
            validatorGroup: "3",
            mode: "AlertTip"
        });
        $($("#new_appoint input[name='name']")[0]).formValidator({
            validatorGroup: "3"
        }).functionValidator({
            fun: PlatformMG.validateRequired
        });
        $($("#new_appoint input[name='mobile']")[0]).formValidator({
            validatorGroup: "3"
        }).functionValidator({
            fun: PlatformMG.validateMobile
        });
        $($("#new_appoint input[name='workTime']")[0]).formValidator({
            validatorGroup: "3"
        }).functionValidator({
            fun: PlatformMG.validateDate
        });
        $.formValidator.initConfig({
            validatorGroup: "4",
            mode: "AlertTip"
        });
        $("#visitTime").formValidator({
            validatorGroup: "4"
        }).functionValidator({
            fun: PlatformMG.validateRequired
        });
        $("#visitItemsList").formValidator({
            validatorGroup: "4"
        }).functionValidator({
            fun: PlatformMG.validateRequired
        });
        $.formValidator.initConfig({
            validatorGroup: "2",
            mode: "AlertTip"
        });
        $("#visitTime").formValidator({
            validatorGroup: "2"
        }).functionValidator({
            fun: PlatformMG.validateRequired
        });
        $("#visitItemsList").formValidator({
            validatorGroup: "2"
        }).functionValidator({
            fun: PlatformMG.validateRequired
        })
    },
    validateRequired: function(b, a) {
        if (!CommonFun.checkFormat(b, DataTypeEnum.Required)) {
            return "此项为必填项"
        } else {
            return true
        }
    },
    validateMobile: function(b, a) {
        if (!CommonFun.checkFormat(b, DataTypeEnum.Contract) && !CommonFun.checkFormat(b, DataTypeEnum.PhoneMobile)) {
            return "电话号码无效，请重新输入"
        } else {
            return true
        }
    },
    validateFee: function(b, a) {
        if (!CommonFun.checkFormat(b, DataTypeEnum.Fee)) {
            return "数据不合法，请重新输入"
        } else {
            return true
        }
    },
    validateLength: function(b, a) {
        if (!CommonFun.checkFormat(b, DataTypeEnum.Length, 250)) {
            return "超过字数限制，请重新输入"
        } else {
            return true
        }
    },
    validateDate: function(b, a) {
        if (!CommonFun.checkFormat(b, DataTypeEnum.DateFormat)) {
            return "日期格式不对，请重新输入！"
        } else {
            return true
        }
    }
};
PlatformMG.Init();
var maxPatient = 10;
var module = angular.module("PlatformModule", ["HttpModule", "CalendarModule", "PatientCommonModule", "angularFileUpload", "PermissionModule", "PushMessageModule"]);
module.factory("PlatformFactory", ["PatientCommonFactory", function(a) {
    var c = function(h) {
        var g = {
            TopLeft: [],
            TopRight: [],
            BottomLeft: [],
            BottomRight: []
        };
        if (h != null && h != "" && h != undefined) {
            var d = h.split(",");
            if (d != undefined && d != null && d.length > 0) {
                for (var f = 0; f < d.length; f++) {
                    var e = d[f].split("-");
                    switch (e[0]) {
                    case "a":
                        g.TopLeft.push({
                            value: e[1],
                            position: 1,
                            isSelected: true
                        });
                        break;
                    case "b":
                        g.TopRight.push({
                            value: e[1],
                            position: 2,
                            isSelected: true
                        });
                        break;
                    case "c":
                        g.BottomLeft.push({
                            value: e[1],
                            position: 3,
                            isSelected: true
                        });
                        break;
                    case "d":
                        g.BottomRight.push({
                            value: e[1],
                            position: 4,
                            isSelected: true
                        });
                        break;
                    default:
                        break
                    }
                }
            }
        }
        g.TopLeft = a.SortByData(g.TopLeft);
        g.TopRight = a.SortByData(g.TopRight);
        g.BottomLeft = a.SortByData(g.BottomLeft);
        g.BottomRight = a.SortByData(g.BottomRight);
        return g
    };
    var b = function(e, f, d) {
        ResourceFactory.MsgBox.Confirm("温馨提示", e, f, d)
    };
    return {
        DealMedicalRecord: function(n, m) {
            var p = {};
            var d = [];
            var g = [];
            var j = [];
            var o = [];
            if (n.TreatFileList != undefined && n.TreatFileList != null && n.TreatFileList.length > 0) {
                for (var h = 0; h < n.TreatFileList.length; h++) {
                    switch (n.TreatFileList[h].FileType) {
                    case 1:
                        n.TreatFileList[h].ClassName = "icon-picture";
                        break;
                    case 2:
                        n.TreatFileList[h].ClassName = "icon-film";
                        break;
                    case 3:
                        n.TreatFileList[h].ClassName = "icon-file-text-alt";
                        break;
                    default:
                        break
                    }
                }
            }
            if (n.TreatDetailList != undefined && n.TreatDetailList != null && n.TreatDetailList.length > 0) {
                var f = 0;
                var e = 0;
                var l = 0;
                var k = 0;
                for (var h = 0; h < n.TreatDetailList.length; h++) {
                    switch (n.TreatDetailList[h].DetailType) {
                    case 1:
                        f++;
                        if (f > 1) {
                            n.TreatDetailList[h].ItemName = ""
                        } else {
                            n.TreatDetailList[h].ItemName = "检查"
                        }
                        n.TreatDetailList[h].TeethList = c(n.TreatDetailList[h].ToothPosition);
                        d.push(n.TreatDetailList[h]);
                        break;
                    case 2:
                        e++;
                        if (e > 1) {
                            n.TreatDetailList[h].ItemName = ""
                        } else {
                            n.TreatDetailList[h].ItemName = "辅助检查"
                        }
                        n.TreatDetailList[h].TeethList = c(n.TreatDetailList[h].ToothPosition);
                        g.push(n.TreatDetailList[h]);
                        break;
                    case 3:
                        l++;
                        if (l > 1) {
                            n.TreatDetailList[h].ItemName = ""
                        } else {
                            n.TreatDetailList[h].ItemName = "诊断"
                        }
                        n.TreatDetailList[h].TeethList = c(n.TreatDetailList[h].ToothPosition);
                        j.push(n.TreatDetailList[h]);
                        break;
                    case 4:
                        k++;
                        if (k > 1) {
                            n.TreatDetailList[h].ItemName = ""
                        } else {
                            n.TreatDetailList[h].ItemName = "治疗"
                        }
                        n.TreatDetailList[h].TeethList = c(n.TreatDetailList[h].ToothPosition);
                        o.push(n.TreatDetailList[h]);
                        break;
                    default:
                        break
                    }
                }
            } else {
                d = [{
                    ID: 0,
                    TreatDetailID: "",
                    TreatID: "",
                    PatientID: "",
                    DetailType: 1,
                    DetailContent: "",
                    ToothPosition: "",
                    ToothType: 1,
                    State: 0,
                    CreateTime: "",
                    TenantID: "",
                    ItemName: "检查",
                    TeethList: {}
                }];
                g = [{
                    ID: 0,
                    TreatDetailID: "",
                    TreatID: "",
                    PatientID: "",
                    DetailType: 2,
                    DetailContent: "",
                    ToothPosition: "",
                    ToothType: 1,
                    State: 0,
                    CreateTime: "",
                    TenantID: "",
                    ItemName: "辅助检查",
                    TeethList: {}
                }];
                j = [{
                    ID: 0,
                    TreatDetailID: "",
                    TreatID: "",
                    PatientID: "",
                    DetailType: 3,
                    DetailContent: "",
                    ToothPosition: "",
                    ToothType: 1,
                    State: 0,
                    CreateTime: "",
                    TenantID: "",
                    ItemName: "诊断",
                    TeethList: {}
                }];
                o = [{
                    ID: 0,
                    TreatDetailID: "",
                    TreatID: "",
                    PatientID: "",
                    DetailType: 4,
                    DetailContent: "",
                    ToothPosition: "",
                    ToothType: 1,
                    State: 0,
                    CreateTime: "",
                    TenantID: "",
                    ItemName: "治疗",
                    TeethList: {}
                }]
            }
            n.Appointment = m;
            p = {
                TenantID: n.Treat.TenantID,
                TreatNo: n.Treat.TreatNo,
                TreatID: n.Treat.TreatID,
                State: n.Treat.State,
                PatientID: n.Treat.PatientID,
                PastHistory: n.Treat.PastHistory,
                PresentIllness: n.Treat.PresentIllness,
                NurseID: n.Treat.NurseID,
                NurseName: n.Treat.NurseName,
                ID: n.Treat.ID,
                DoctorID: n.Treat.DoctorID,
                CreateTime: n.Treat.CreateTime,
                ChiefComplaints: n.Treat.ChiefComplaints,
                AppointID: n.Treat.AppointID,
                AppointDateTime: n.Treat.AppointDateTime,
                AllergyHistory: n.Treat.AllergyHistory,
                Appointment: n.Appointment,
                TreatDetailList: n.TreatDetailList,
                TreatFileList: n.TreatFileList,
                CheckItems: d,
                HelpCheckItems: g,
                DiagnoseItems: j,
                TreatItems: o
            };
            return p
        },
        DealCostItems: function(d, f) {
            if (d != undefined && d != null && d.length > 0) {
                for (var e = 0; e < d.length; e++) {
                    if (d[e].Price == null) {
                        d[e].Price = {
                            CostItemID: d[e].CostItemID,
                            CreateTime: "",
                            ID: 0,
                            Price: 0,
                            State: 0,
                            SubCategoryID: d[e].SubCategoryID,
                            Unit: "",
                            TenantID: ""
                        }
                    }
                    d[e].Category = {
                        CategoryID: f.CategoryID,
                        CategoryName: f.CategoryName
                    };
                    d[e].SubCategory = {
                        SubCategoryID: f.SubCategoryID,
                        SubCategoryName: f.SubCategoryName
                    }
                }
            }
            return d
        },
        DealCostItem: function(e) {
            var d = e.item;
            if (d != undefined && d != null) {
                if (d.Price == null) {
                    d.Price = {
                        CostItemID: d.Item.CostItemID,
                        CreateTime: "",
                        ID: 0,
                        Price: 0,
                        State: 0,
                        SubCategoryID: d.Item.SubCategoryID,
                        Unit: "",
                        TenantID: ""
                    }
                }
                d.Category = {
                    CategoryID: e.categoryInfo.CategoryID,
                    CategoryName: e.categoryInfo.CategoryName
                };
                d.SubCategory = {
                    SubCategoryID: e.categoryInfo.SubCategoryID,
                    SubCategoryName: e.categoryInfo.SubCategoryName
                }
            }
            return d
        },
        DealMedicalRecordRequest: function(f, d, n) {
            var r = {};
            var p = {};
            var q = [];
            if (f != undefined && f != "" && f != null) {
                p = {
                    ID: f.ID,
                    AllergyHistory: f.AllergyHistory,
                    AppointID: f.AppointID,
                    ChiefComplaints: f.ChiefComplaints,
                    CreateTime: f.CreateTime,
                    DoctorID: f.DoctorID,
                    MedicalRecordNo: f.MedicalRecordNo,
                    NurseID: f.NurseID,
                    NurseName: f.Appointment.NurseName,
                    PresentIllness: f.PresentIllness,
                    PastHistory: f.PastHistory,
                    PatientID: f.PatientID,
                    State: f.State,
                    TenantID: f.TenantID,
                    TreatID: f.TreatID,
                    TreatNo: f.TreatNo,
                    Advice: f.Advice
                };
                var o = $.merge(f.CheckItems, f.DiagnoseItems);
                var m = $.merge(f.HelpCheckItems, f.TreatItems);
                var l = $.merge(o, m);
                for (var g = 0; g < l.length; g++) {
                    var k = "";
                    var h = "";
                    if (l[g].TeethList != undefined) {
                        if (l[g].TeethList.BottomLeft != undefined && l[g].TeethList.BottomLeft.length > 0) {
                            for (var e = 0; e < l[g].TeethList.BottomLeft.length; e++) {
                                h = "c-";
                                if (k == "") {
                                    k = h + l[g].TeethList.BottomLeft[e].value
                                } else {
                                    k = k + "," + h + l[g].TeethList.BottomLeft[e].value
                                }
                            }
                        }
                        if (l[g].TeethList.BottomRight != undefined && l[g].TeethList.BottomRight.length > 0) {
                            for (var e = 0; e < l[g].TeethList.BottomRight.length; e++) {
                                h = "d-";
                                if (k == "") {
                                    k = h + l[g].TeethList.BottomRight[e].value
                                } else {
                                    k = k + "," + h + l[g].TeethList.BottomRight[e].value
                                }
                            }
                        }
                        if (l[g].TeethList.TopLeft != undefined && l[g].TeethList.TopLeft.length > 0) {
                            for (var e = 0; e < l[g].TeethList.TopLeft.length; e++) {
                                h = "a-";
                                if (k == "") {
                                    k = h + l[g].TeethList.TopLeft[e].value
                                } else {
                                    k = k + "," + h + l[g].TeethList.TopLeft[e].value
                                }
                            }
                        }
                        if (l[g].TeethList.TopRight != undefined && l[g].TeethList.TopRight.length > 0) {
                            for (var e = 0; e < l[g].TeethList.TopRight.length; e++) {
                                h = "b-";
                                if (k == "") {
                                    k = h + l[g].TeethList.TopRight[e].value
                                } else {
                                    k = k + "," + h + l[g].TeethList.TopRight[e].value
                                }
                            }
                        }
                        q.push({
                            ID: l[g].ID,
                            TreatDetailID: l[g].ID,
                            TreatID: f.TreatID,
                            PatientID: f.PatientID,
                            DetailType: l[g].DetailType,
                            DetailContent: l[g].DetailContent,
                            ToothPosition: k,
                            ToothType: l[g].ToothType,
                            State: l[g].State,
                            CreateTime: l[g].CreateTime,
                            TenantID: f.TenantID
                        })
                    }
                }
            }
            if (d != undefined && d != "" && d.length > 0) {
                for (var g = 0; g < d.length; g++) {
                    var k = "";
                    var h = "";
                    if (d[g].Teeth.length > 0) {
                        for (var e = 0; e < d[g].Teeth.length; e++) {
                            switch (d[g].Teeth[e].position) {
                            case 1:
                                h = "a-";
                                break;
                            case 2:
                                h = "b-";
                                break;
                            case 3:
                                h = "c-";
                                break;
                            case 4:
                                h = "d-";
                                break;
                            default:
                                break
                            }
                            if (k == "") {
                                k = h + d[g].Teeth[e].value
                            } else {
                                k = k + "," + h + d[g].Teeth[e].value
                            }
                        }
                        q.push({
                            ID: 0,
                            TreatDetailID: 0,
                            TreatID: f.TreatID,
                            PatientID: f.PatientID,
                            DetailType: d[g].DetailType,
                            DetailContent: d[g].Content,
                            ToothPosition: k,
                            ToothType: d[g].ToothType,
                            State: 0,
                            CreateTime: "",
                            TenantID: f.TenantID
                        })
                    }
                }
            }
            if (n == 2) {
                r.Treat = p;
                r.TreatDetailList = q
            } else {
                r = p
            }
            return r
        },
        DealMedicalTemplateContent: function(h, e) {
            if (h != undefined && h != null && h.length > 0) {
                if (e.currentDom && e.currentDom.DomObj) {
                    var g = e.currentDom.DomObj.val();
                    for (var f = 0; f < h.length; f++) {
                        if (parseInt(e.currentDom.ContentType) == h[f].Category) {
                            e.tempParam = h[f].Contents[0].Content;
                            var d = "";
                            switch (h[f].Category) {
                            case 1:
                                d = "主诉";
                                break;
                            case 2:
                                d = "现病史";
                                break;
                            case 3:
                                d = "既往史";
                                break;
                            case 4:
                                d = "过敏史";
                                break;
                            case 5:
                                d = "检查";
                                break;
                            case 6:
                                d = "辅助检查";
                                break;
                            case 7:
                                d = "诊断";
                                break;
                            case 8:
                                d = "治疗";
                                break;
                            default:
                                break
                            }
                            if (!g) {
                                e.currentDom.DomObj.val(h[f].Contents[0].Content)
                            } else {
                                b(d + "已填写内容，确定要替换替换已填写的内容吗？", function() {
                                    e.currentDom.DomObj.val(e.tempParam);
                                    e.$apply()
                                })
                            }
                            break
                        }
                    }
                } else {
                    for (var f = 0; f < h.length; f++) {
                        switch (h[f].Category) {
                        case 1:
                            e.currentMedicalRecord.ChiefComplaints = h[f].Contents[0].Content;
                            break;
                        case 2:
                            e.currentMedicalRecord.PresentIllness = h[f].Contents[0].Content;
                            break;
                        case 3:
                            e.currentMedicalRecord.PastHistory = h[f].Contents[0].Content;
                            break;
                        case 4:
                            e.currentMedicalRecord.AllergyHistory = h[f].Contents[0].Content;
                            break;
                        case 5:
                            e.currentMedicalRecord.CheckItems[0].DetailContent = h[f].Contents[0].Content;
                            break;
                        case 6:
                            e.currentMedicalRecord.HelpCheckItems[0].DetailContent = h[f].Contents[0].Content;
                            break;
                        case 7:
                            e.currentMedicalRecord.DiagnoseItems[0].DetailContent = h[f].Contents[0].Content;
                            break;
                        case 8:
                            e.currentMedicalRecord.TreatItems[0].DetailContent = h[f].Contents[0].Content;
                            break;
                        default:
                            break
                        }
                    }
                }
            }
        }
    }
}
]);
module.service("PlatformService", ["HttpService", "ResourceFactory", "PlatformFactory", "PatientCommonService", "$upload", "PermissionFactory", function(b, c, j, m, h, f) {
    var k = {};
    var i = {};
    var l = function(n) {
        if (k) {
            k.addAppoint.PatientName = n.Name;
            k.addAppoint.PatientID = n.PatientID;
            k.addAppoint.Birthday = n.Birthday;
            k.addAppoint.Gender = n.Gender;
            k.addAppoint.Mobile = n.Mobile;
            k.addAppoint.Address = n.Address;
            k.addAppoint.OtherContact = n.OtherContact;
            k.addAppoint.PatientSourceID = n.PatientSourceID;
            k.disablePatientEdit = true;
            k.$apply()
        }
    };
    var a = function(n) {
        if (k) {
            k.addVisit.PatientName = n.Name;
            k.addVisit.PatientID = n.PatientID;
            k.addVisit.Birthday = n.Birthday;
            k.addVisit.Gender = n.Gender;
            k.addVisit.Mobile = n.Mobile;
            k.addVisit.TenantID = n.TenantID;
            k.addVisit.PatientSourceID = n.PatientSourceID;
            k.disablePatientEdit = true;
            k.$apply()
        }
    };
    var g = function() {
        k.addVisit.PatientID = "";
        k.addVisit.Birthday = "";
        k.addVisit.Gender = 1;
        k.addVisit.Mobile = "";
        k.addVisit.Address = "";
        k.addVisit.OtherContact = "";
        k.addVisit.PatientSourceID = "";
        k.disablePatientEdit = false;
        k.$apply()
    };
    var e = function() {
        k.addAppoint.PatientID = "";
        k.addAppoint.Birthday = "";
        k.addAppoint.Gender = 1;
        k.addAppoint.Mobile = "";
        k.addAppoint.Address = "";
        k.addAppoint.OtherContact = "";
        k.addAppoint.PatientSourceID = "";
        k.disablePatientEdit = false;
        k.$apply()
    };
    i.GetListForVisit = function(o, n) {
        b.getListForVisitRequest(o, c.operateCode.get, function(p) {
            if (p.Header.StatusCode == 0) {
                n.completeTreatList = p.Body
            } else {
                n.completeTreatList = null
            }
        }, function(p) {
            console.log(p)
        })
    }
    ;
    i.getAppointments = function(o, n) {
        k = n;
        b.appointmentRequest(o, c.operateCode.get, function(p) {
            $("#loading_div").modal("hide");
            $(".body_hide").css("opacity", "1");
            if (p.Header.StatusCode == 0) {
                if (p.Body == null || p.Body.AppointList == null || p.Body.AppointList.length <= 0) {
                    n.Appointments = null;
                    n.currentPatient = null;
                    if (o.Status == 0 && (o.Condition == "" || o.Condition == undefined)) {} else {
                        i.alert("未查到符合条件的预约信息！")
                    }
                } else {
                    n.Appointments = p.Body.AppointList
                }
                n.PatientList = p.Body.PatientList;
                if (n.Appointments && n.Appointments.length > 0) {
                    i.showBaseDetail(n.Appointments[n.currentIndex], 0, 0, n)
                }
                n.PatientSourceList = ((p.Body.PatientSourceList == undefined || p.Body.PatientSourceList == null || p.Body.PatientSourceList.length <= 0) ? [] : p.Body.PatientSourceList);
                n.PatientLevelList = p.Body.PatientLevelList;
                var s = [];
                var r = [];
                if (n.PatientList) {
                    angular.forEach(n.PatientList, function(u, t) {
                        s.push({
                            label: u.Name + "--" + u.Mobile,
                            value: JSON.stringify(u)
                        });
                        r.push({
                            label: u.Name,
                            value: JSON.stringify(u)
                        })
                    });
                    $("#language").autocomplete({
                        delay: 0,
                        source: s,
                        focus: function(t, u) {
                            $("#language").val(u.item.label);
                            return false
                        },
                        select: function(u, v) {
                            $("#language").val(v.item.label);
                            var t = JSON.parse(v.item.value);
                            $("#language-id").val(t.PatientID);
                            return false
                        }
                    });
                    $("#app_p_name").autocomplete({
                        minLength: 1,
                        source: r,
                        focus: function(t, u) {
                            return false
                        },
                        select: function(u, v) {
                            var t = JSON.parse(v.item.value);
                            l(t);
                            return false
                        },
                        change: function(t, u) {
                            if (!u.item) {
                                e()
                            }
                        },
                        search: function(t, u) {},
                        response: function(t, u) {
                            if (!u.content || u.content.length == 0) {
                                e()
                            }
                        }
                    });
                    $("#tags").autocomplete({
                        minLength: 1,
                        source: r,
                        focus: function(t, u) {
                            return false
                        },
                        select: function(u, v) {
                            var t = JSON.parse(v.item.value);
                            a(t);
                            return false
                        },
                        change: function(t, u) {
                            if (!u.item) {
                                g()
                            }
                        },
                        search: function(t, u) {},
                        response: function(t, u) {
                            if (!u.content || u.content.length == 0) {
                                g()
                            }
                        }
                    })
                }
                if (!n.loadDictionary) {
                    n.DoctorList = p.Body.DoctorList;
                    for (var q = 0; q < n.DoctorList.length; q++) {
                        n.DoctorNameList.push(n.DoctorList[q].UserName)
                    }
                    n.NurseList = p.Body.NurseList;
                    n.loadDictionary = true
                }
                n.loadAppointments = true;
                if (n.currentPatient && (!n.currentPatient.PatientInfo)) {
                    n.currentPatient.PatientInfo = i.findPatient(n.currentPatient.Appoint.PatientID, "PatientID", n.PatientList)
                }
                if (!n.appointmentItems) {
                    i.getAppointmentItemsList(n)
                }
                if (!n.visitItemsList) {
                    i.visitItemsList(n)
                }
            } else {
                $("#main-content").fadeIn();
                n.Appointments = null;
                n.currentPatient = null;
                i.alert(GetErrormsg(p.Header.StatusCode))
            }
        }, function(p) {
            console.log(p)
        })
    }
    ;
    i.updateAppointments = function(q, n, o, p) {
        b.appointmentRequest(q, c.operateCode.update, function(r) {
            if (r.Header.StatusCode == 0) {
                if (p) {
                    i.alert("取消成功")
                } else {
                    i.alert("更新成功")
                }
                i.search(0, n)
            } else {
                i.alert(GetErrormsg(r.Header.StatusCode))
            }
        }, function(r) {
            console.log(r)
        })
    }
    ;
    i.signAppoint = function(o, n) {
        try {
            b.signAppointRequest(o, c.operateCode.update, function(q) {
                if (q.Header.StatusCode == 0) {
                    i.alert("签到成功！");
                    i.search(0, n)
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                i.alert("系统繁忙，请稍候再试！");
                console.log(q)
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.treatAppoint = function(o, n) {
        try {
            b.treatAppointRequest(o, c.operateCode.update, function(q) {
                if (q.Header.StatusCode == 0) {
                    i.alert("更新成功！");
                    i.search(0, n)
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                i.alert("系统繁忙，请稍候再试！");
                console.log(q)
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.addAppointments = function(p, o, n) {
        b.appointmentRequest(p, c.operateCode.insert, function(q) {
            if (q.Header.StatusCode == 0) {
                $("#new_appoint").modal("hide");
                i.alert("预约成功！");
                if (n) {
                    o.currentIndex = 0;
                    $("#loading_div").modal("show");
                    i.search(0, o)
                } else {
                    o.loadAppointments = false
                }
            } else {
                if (q.Header.StatusCode == 18) {
                    var r = q.Body.Gender == 2 ? "女" : "男";
                    i.confirm("对不起，该手机号已经注册，手机号主人姓名：【" + q.Body.Name + "】，性别：【" + r + "】，是否关联该手机号？", function() {
                        o.isRelation = true;
                        o.addAppoint.Relation = 1;
                        o.addAppoint.MainID = q.Body.PatientID;
                        o.$apply()
                    })
                } else {
                    i.alert("预约失败！")
                }
            }
        }, function(q) {
            console.log(q)
        })
    }
    ;
    i.addVisits = function(p, o, n) {
        b.visitRequest(p, c.operateCode.insert, function(q) {
            if (q.Header.StatusCode == 0) {
                if (!n) {
                    o.currentIndex = 0;
                    i.search(1, o)
                } else {
                    o.currentIndex = 0;
                    i.search(0, o);
                    o.loadVisits = false
                }
                $("#new_visit").modal("hide");
                i.alert("新增成功")
            } else {
                i.alert(GetErrormsg(q.Header.StatusCode))
            }
        }, function(q) {
            console.log(q)
        })
    }
    ;
    i.getVisits = function(o, n) {
        b.visitRequest(o, c.operateCode.get, function(q) {
            $("#loading_div").modal("hide");
            if (q.Header.StatusCode == 0) {
                if (q.Body == null || q.Body.VisitList == null || q.Body.VisitList.length <= 0) {
                    n.Visits = null;
                    n.currentPatient = null;
                    if (o.Status == 0 && (o.Condition == "" || o.Condition == undefined)) {} else {}
                } else {
                    n.Visits = [];
                    for (var r = 0; r < q.Body.VisitList.length; r++) {
                        var p = {};
                        p.currentVisit = q.Body.VisitList[r];
                        p.currentVisitPatient = i.findPatient(p.currentVisit.PatientID, "PatientID", n.PatientList);
                        n.Visits.push(p)
                    }
                    n.currentPatient = JSON.parse(JSON.stringify(n.Visits[n.currentIndex]));
                    n.currentPatient.currentVisit.Visit.PatientSourceName = i.findItem(n.currentPatient.currentVisit.Visit.PatientSourceID, "PatientSourceID", "Name", n.PatientSourceList);
                    n.currentPatient.currentVisit.Visit.PatientLevelName = i.findItem(n.currentPatient.currentVisit.Visit.PatientLevelID, "PatientLevelID", "Name", n.PatientLevelList);
                    n.currentPatient.Level = {};
                    for (var r = 0; r < n.PatientLevelList.length; r++) {
                        var s = n.PatientLevelList[r];
                        if (s.PatientLevelID == n.currentPatient.currentVisit.Visit.PatientLevelID) {
                            n.currentPatient.Level = JSON.parse(JSON.stringify(s))
                        }
                    }
                    n.currentPatient.PatientInfo = i.findPatient(n.currentPatient.currentVisit.Visit.PatientID, "PatientID", n.PatientList);
                    if (n.currentPatient.currentVisit.Level == null) {
                        n.currentPatient.currentVisit.Level = {}
                    }
                    if (n.currentPatient.currentVisit.Level.Color == null) {
                        n.currentPatient.currentVisit.Level.Color = "#a5c2d5"
                    }
                }
                n.loadVisits = true
            } else {
                n.Visits = null;
                n.currentPatient = null;
                i.alert(GetErrormsg(q.Header.StatusCode))
            }
        }, function(p) {
            console.log(p)
        })
    }
    ;
    i.getAppointmentItemsList = function(n) {
        var o = {
            TenantID: n.currentUser.Body.Tenant.TenantID
        };
        b.appointmentItemsRequest(o, c.operateCode.get, function(p) {
            if (p.Header.StatusCode == 0) {
                n.appointmentItems = p.Body
            } else {
                n.appointmentItems = null
            }
        }, function(p) {
            console.log(p)
        })
    }
    ;
    i.visitItemsList = function(n) {
        var o = {
            TenantID: n.currentUser.Body.Tenant.TenantID
        };
        b.visitItemsRequest(o, c.operateCode.get, function(p) {
            if (p.Header.StatusCode == 0) {
                n.visitItemsList = p.Body
            } else {
                n.visitItemsList = null
            }
        }, function(p) {
            console.log(p)
        })
    }
    ;
    i.findPatient = function(n, q, o) {
        for (var p = 0; p < o.length; p++) {
            if (o[p][q] == n) {
                return o[p]
            }
        }
        return null
    }
    ;
    i.findItem = function(r, s, p, t) {
        var n = "";
        for (var q = 0; q < t.length; q++) {
            var o = t[q][s];
            if (r == o) {
                return t[q][p]
            }
        }
        return n
    }
    ;
    i.findPatientSourceID = function(q, r, s) {
        var n = null;
        if (s == []) {
            return
        } else {
            for (var p = 0; p < s.length; p++) {
                var o = s[p][r];
                if (q == o) {
                    return JSON.parse(JSON.stringify(s[p]))
                }
            }
        }
        return n
    }
    ;
    i.findAllItem = function(q, r, s) {
        var n = null;
        if (s == []) {
            return
        } else {
            for (var p = 0; p < s.length; p++) {
                var o = s[p][r];
                if (q == o) {
                    return JSON.parse(JSON.stringify(s[p]))
                }
            }
        }
        return n
    }
    ;
    i.updateVisits = function(q, n, o, p) {
        b.visitRequest(q, c.operateCode.update, function(r) {
            if (r.Header.StatusCode == 0) {
                n.currentIndex = 0;
                i.search(1, n);
                if (p) {
                    i.alert("删除成功")
                } else {
                    i.alert("更新成功")
                }
            } else {
                i.alert(GetErrormsg(r.Header.StatusCode))
            }
        }, function(r) {
            console.log(r)
        })
    }
    ;
    i.getMainCatalog = function(n) {
        var o = {
            TenantID: n.currentUser.Body.Tenant.TenantID
        };
        b.mainCatalogRequest(o, c.operateCode.get, function(p) {
            if (p.Header.StatusCode == 0) {
                n.MainCategoryList = p.Body
            } else {
                n.MainCategoryList = null;
                i.alert(GetErrormsg(p.Header.StatusCode))
            }
        }, function(p) {
            console.log(p)
        })
    }
    ;
    var d = function(n) {
        k.detailItemsList.push(n);
        k.$apply()
    };
    i.getDetailCatalog = function(n, q, p) {
        if (q == undefined) {
            var o = {
                TenantID: n.currentUser.Body.Tenant.TenantID,
                SubCategoryID: n.currentPatient.Appoint.SubCategoryID
            }
        } else {
            var o = {
                TenantID: n.currentUser.Body.Tenant.TenantID,
                CategoryID: q.CategoryID,
                SubCategoryID: q.SubCategoryID
            }
        }
        b.costItemsRequest(o, c.operateCode.get, function(s) {
            if (s.Header.StatusCode == 0) {
                if (q == undefined) {
                    n.detailItemsList = j.DealCostItems(s.Body, n.currentPatient.Appoint)
                } else {
                    var v = $.parseJSON(p.JsonData);
                    var r = {
                        CategoryID: v.CategoryID,
                        CategoryName: v.CategoryName,
                        SubCategoryID: v.SubCategoryID,
                        SubCategoryName: v.Name
                    };
                    if (s.Body != null && s.Body.length > 0) {
                        p.removeChildNodes();
                        for (var u = 0; u < s.Body.length; u++) {
                            var t = {
                                item: s.Body[u],
                                categoryInfo: r
                            };
                            p.createChildNode(s.Body[u].Item.Name, false, "icon-folder-close-alt", null, "", JSON.stringify(t), 3, function(x) {
                                var w = $.parseJSON(x);
                                d(j.DealCostItem(w))
                            })
                        }
                        p.expandNode()
                    }
                }
            } else {
                n.detailItemsList = null;
                i.alert(GetErrormsg(s.Header.StatusCode))
            }
        }, function(r) {
            i.alert("系统繁忙，请稍候重试！");
            console.log(r)
        })
    }
    ;
    i.getCatalogItems = function(n, o, q) {
        var p = {
            TenantID: CommonFun.getDataFromSession("CurrentUser").Body.Tenant.TenantID
        };
        if (q != undefined && q == "") {
            p.CategoryID = q
        }
        try {
            b.subCatalogRequest(p, c.operateCode.get, function(s) {
                if (s.Header.StatusCode == 0) {
                    $("#main-content").fadeIn();
                    $("#loading_div").modal("hide");
                    if (q == undefined) {
                        n.CatalogItems = s.Body;
                        n.createTree(n.CatalogItems, o)
                    }
                    n.SubItems = n.CatalogItems[0].SubCategories
                } else {
                    $("#main-content").fadeIn();
                    $("#loading_div").modal("hide");
                    i.alert(GetErrormsg(s.Header.StatusCode))
                }
            }, function(s) {
                i.alert("系统繁忙，请稍后重试！");
                console.log(s)
            })
        } catch (r) {
            console.log(r)
        }
    }
    ;
    i.switchView = function(n) {
        k.SubItems = n.SubCategories;
        k.$apply()
    }
    ;
    i.getFee = function(o, n) {
        try {
            b.costRequest(o, c.operateCode.get, function(q) {
                if (q.Header.StatusCode == 0) {
                    n.CostBody = q.Body;
                    n.setCharge();
                    $("#charge").modal("show")
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                i.alert("系统繁忙，请稍后重试！");
                console.log(q)
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.saveFee = function(o, n) {
        try {
            b.createBillRequest(o, c.operateCode.update, function(q) {
                if (q.Header.StatusCode == 0) {
                    $("#charge").modal("hide");
                    i.alert("账单生成成功，请到收费处缴费！")
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                i.alert("系统繁忙，请稍候重试！");
                console.log(q)
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.search = function(r, n) {
        var q = new Date();
        var p = q.getFullYear() + "/" + (q.getMonth() + 1) + "/" + (q.getDate());
        if (r == 0) {
            var o = 0;
            if (n.searchData.patient.condition != "") {
                if (CommonFun.checkFormat(n.searchData.patient.condition, DataTypeEnum.Number)) {
                    o = 2
                } else {
                    o = 1
                }
            }
            var s = {
                TenantID: n.currentUser.Body.Tenant.TenantID,
                DoctorID: n.currentUserDoctorId,
                Status: n.searchData.patient.status,
                SearchType: o,
                Condition: n.searchData.patient.condition,
                SearchDate: p,
                IsNeedDoctor: !n.loadDictionary,
                IsNeedNurser: !n.loadDictionary,
                IsNeedPatient: true
            };
            i.getAppointments(s, n);
            n.refreshShowEdit(0)
        } else {
            var o = 0;
            if (n.searchData.visit.condition != "") {
                if (CommonFun.checkFormat(n.searchData.visit.condition, DataTypeEnum.Number)) {
                    o = 2
                } else {
                    o = 1
                }
            }
            var s = {
                TenantID: n.currentUser.Body.Tenant.TenantID,
                DoctorID: n.currentUserDoctorId,
                Status: n.searchData.visit.status,
                SearchType: o,
                Condition: n.searchData.visit.condition,
                BeginDate: n.searchData.visit.BeginDate,
                EndDate: n.searchData.visit.EndDate,
                SearchDate: n.searchData.visit.BeginDate ? "" : p
            };
            i.getVisits(s, n);
            n.refreshShowEdit(1)
        }
    }
    ;
    i.searchPatientEvent = function(n) {
        n.searchData.patient.status = 0;
        n.searchData.patient.condition = "";
        n.headerButton = "新增预约";
        n.headerButtonEvent = 0;
        n.currentIndex = 0;
        n.currentPatient = null;
        i.search(0, n);
        n.refreshShowEdit(0)
    }
    ;
    i.searchVisitEvent = function(n) {
        n.searchData.visit.status = 0;
        n.searchData.visit.condition = "";
        n.headerButton = "新增回访";
        n.headerButtonEvent = 1;
        n.currentIndex = 0;
        n.currentPatient = null;
        i.search(1, n);
        n.refreshShowEdit(1)
    }
    ;
    i.showSelectedPatientDetail = function(q, s, p) {
        var r = q.target;
        var n = $(r).offset().top;
        var t = $(r).offset().left + 60;
        var o = '<div class="tempPatientDetail" style="background: #fff; -webkit-border-radius: 4px; -moz-border-radius: 4px;border-radius: 4px;box-shadow: 0 0 3px #999;">性别: ' + p.GenderText(s.Gender) + "<br/>年龄: " + p.AgeText(s.Birthday) + "<br/>手机号: " + s.Mobile + "<br/></div>";
        $(r).parent().append(o);
        $(".tempPatientDetail").css("position", "absolute");
        $(".tempPatientDetail").css("z-index", "10");
        $(".tempPatientDetail").offset({
            top: n,
            left: t
        })
    }
    ;
    i.showBaseDetail = function(q, p, r, o) {
        o.currentIndex = p;
        o.orginCurrentPatient = q;
        o.currentPatient = JSON.parse(JSON.stringify(q));
        var n = "";
        if (o.currentPatient.Appoint) {
            n = o.currentPatient.Appoint.PatientID
        }
        if (o.currentPatient.currentVisit) {
            n = o.currentPatient.currentVisit.Visit.PatientID
        }
        o.currentPatient.PatientInfo = i.findPatient(n, "PatientID", o.PatientList);
        o.searchPatientLevels = [];
        if (r == 1) {
            o.currentPatient.currentVisit.Visit.PatientSourceName = i.findItem(o.currentPatient.currentVisit.Visit.PatientSourceID, "PatientSourceID", "Name", o.PatientSourceList);
            o.currentPatient.currentVisit.Visit.PatientLevelName = i.findItem(o.currentPatient.currentVisit.Visit.PatientLevelID, "PatientLevelID", "Name", o.PatientLevelList)
        }
        if (r == 0) {
            if (o.currentPatient.Level == null) {
                o.currentPatient.Level = {}
            }
            if (o.currentPatient.Level.Color == null) {
                o.currentPatient.Level.Color = "#a5c2d5"
            }
        } else {
            if (o.currentPatient.currentVisit.Level == null) {
                o.currentPatient.currentVisit.Level = {}
            }
            if (o.currentPatient.currentVisit.Level.Color == null) {
                o.currentPatient.currentVisit.Level.Color = "#a5c2d5"
            }
        }
        o.refreshShowEdit(r);
        if (r == 0) {
            $("#patient_list tr").removeClass("selected");
            if (!$($("#patient_list tr")[p + 1]).attr("class").indexOf("selected") >= 0) {
                $($("#patient_list tr")[p + 1]).addClass("selected")
            }
        } else {
            $("#visit_list tr").removeClass("selected");
            if (!$($("#visit_list tr")[p + 1]).attr("class").indexOf("selected") >= 0) {
                $($("#visit_list tr")[p + 1]).addClass("selected")
            }
        }
    }
    ;
    i.convertToViewModel = function(n, o) {
        return j.DealMedicalRecord(n, o)
    }
    ;
    i.getMedicalRecord = function(n) {
        if (n.currentPatient != null && n.currentPatient != undefined) {
            var o = {
                AppointID: n.currentPatient.Appoint.AppointID
            }
        } else {
            return
        }
        try {
            b.treatRequest(o, c.operateCode.get, function(q) {
                if (q.Header.StatusCode == 0) {
                    n.currentMedicalRecord = i.convertToViewModel(q.Body, n.currentPatient.Appoint);
                    m.showMedicalRecord(n.currentMedicalRecord)
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                i.alert("系统繁忙，请稍候再试！");
                console.log(q)
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.uploadFiles = function(s, q) {
        var n = s.newFiles;
        var p = s.currentFile;
        var u = 0;
        try {
            switch (q) {
            case 1:
                for (var t = 0; t < n.length; t++) {
                    var o = "";
                    if (n[t].type == 1) {
                        o = WebServer.getUrl("UpLoadImage")
                    }
                    if (n[t].type == 2) {
                        o = WebServer.getUrl("UpLoadFile")
                    }
                    var r = {
                        Token: CommonFun.getDataFromSession("CurrentUser").Header.Token,
                        Module: c.module,
                        TenantID: s.currentPatient.Appoint.TenantID,
                        PatientID: s.currentPatient.Appoint.PatientID,
                        TreatID: s.currentMedicalRecord.TreatID
                    };
                    h.upload({
                        url: o,
                        data: r,
                        file: n[t].file
                    }).progress(function(w) {
                        var x = parseInt(100 * w.loaded / w.total)
                    }).success(function(w) {
                        if (w.Header.StatusCode == 0) {
                            u++;
                            if (u == n.length) {
                                alert("共有" + u + "个文件上传成功！");
                                s.newFiles = []
                            }
                        } else {
                            u++;
                            if (u == n.length) {
                                alert("共有" + u + "个文件上传失败！")
                            }
                        }
                    }).error(function(w) {
                        alert("上传失败！")
                    })
                }
                break;
            case 2:
                if (p.FileType == 1) {
                    o = WebServer.getUrl("UpLoadImage")
                }
                if (p.FileType != 1) {
                    o = WebServer.getUrl("UpLoadFile")
                }
                var r = {
                    Token: CommonFun.getDataFromSession("CurrentUser").Header.Token,
                    Module: c.module,
                    TenantID: s.currentMedicalRecord.TenantID,
                    PatientID: s.currentMedicalRecord.PatientID,
                    TreatID: s.currentMedicalRecord.TreatID,
                    FileType: p.FileType
                };
                h.upload({
                    url: o,
                    data: r,
                    file: p.File
                }).progress(function(w) {
                    var x = parseInt(100 * w.loaded / w.total)
                }).success(function(w) {
                    if (w.Header.StatusCode == 0) {
                        p.isShowUpload = false;
                        p.FileName = w.Body[0].FileName;
                        p.ID = w.Body[0].ID;
                        alert("上传成功！")
                    } else {
                        alert("文件上传失败，请稍后重试！")
                    }
                }).error(function(w) {
                    alert("上传失败！")
                });
                break;
            default:
                break
            }
        } catch (v) {
            console.log(v)
        }
    }
    ;
    i.saveMedicalRecord = function(o, n) {
        var p = j.DealMedicalRecordRequest(o.currentMedicalRecord, n, 2);
        try {
            b.treatRequest(p, c.operateCode.update, function(s) {
                if (s.Header.StatusCode == 0) {
                    $("#medical_record").modal("hide");
                    i.alert("保存成功！");
                    if (o.isSendAdviceSMS) {
                        if (!o.currentPatient.PatientInfo.OpenID) {
                            i.alert("对不起，无法推送医嘱信息，请先绑定微信号！")
                        } else {
                            var r = {
                                touser: o.currentPatient.PatientInfo.OpenID,
                                template_id: "",
                                url: WeChatURL + "DCAdviceDetail.html??TreatID=" + o.currentMedicalRecord.TreatID,
                                data: {
                                    first: {
                                        value: o.currentPatient.Appoint.AppointItemName + "后注意事项",
                                        color: "#173177"
                                    },
                                    keyword1: {
                                        value: o.currentPatient.Appoint.AppointItemName,
                                        color: "#173177"
                                    },
                                    keyword2: {
                                        value: o.currentMedicalRecord.Advice,
                                        color: "#173177"
                                    },
                                    keyword3: {
                                        value: o.currentPatient.Appoint.BeginTime,
                                        color: "#173177"
                                    },
                                    remark: {
                                        value: "如有其它不适，请来院咨询！",
                                        color: "#173177"
                                    }
                                }
                            };
                            i.sendMedicalAdvice(r)
                        }
                    }
                } else {
                    i.alert(GetErrormsg(s.Header.StatusCode))
                }
            }, function(r) {
                i.alert("系统繁忙，请稍后重试！");
                console.log(r)
            })
        } catch (q) {
            console.log(q)
        }
    }
    ;
    i.upudateFileInfo = function(n, p, q) {
        var o = {
            CreateTime: p.CreateTime,
            Description: p.Description,
            FileName: p.FileName,
            FileType: p.FileType,
            ID: p.ID,
            PatientID: p.PatientID,
            SourceName: p.SourceName,
            State: p.State,
            TenantID: p.TenantID,
            TreatFileID: p.TreatFileID,
            TreatID: p.TreatID
        };
        if (o.State != 1) {
            o.Description = n.fileRemark
        }
        try {
            b.treatFileRequest(o, c.operateCode.update, function(r) {
                if (r.Header.StatusCode == 0) {
                    if (o.State == 1) {
                        $($($(q.target).parent()[0]).parent()[0]).remove()
                    } else {
                        n.currentFileDetail.Description = n.fileRemark
                    }
                } else {
                    i.alert(GetErrormsg(r.Header.StatusCode))
                }
            }, function(r) {
                i.alert("系统繁忙，请稍候重试！");
                console.log(r)
            })
        } catch (q) {
            console.log(q)
        }
    }
    ;
    i.getMedicalItems = function(n, q, p) {
        var o = {
            TenantID: CommonFun.getDataFromSession("CurrentUser").Body.Tenant.TenantID,
            CategoryID: q.CategoryID,
            SubCategoryID: q.SubCategoryID
        };
        try {
            b.recordItemsRequest(o, c.operateCode.get, function(s) {
                if (s.Header.StatusCode == 0) {
                    p.removeChildNodes();
                    k.RecordItems = s.Body;
                    if (k.RecordItems == null || k.RecordItems.length == 0) {
                        i.alert("没有病例项目！")
                    } else {
                        var u = "icon-folder-close-alt";
                        for (var t = 0; t < k.RecordItems.length; t++) {
                            p.createChildNode(k.RecordItems[t].Name, false, u, null, "", JSON.stringify(k.RecordItems[t]), 4, function(x, v) {
                                var w = $.parseJSON(x);
                                i.getMedicalTemplateByItem(w, v)
                            })
                        }
                        p.expanded = false;
                        p.expandNode()
                    }
                } else {
                    i.alert(GetErrormsg(s.Header.StatusCode))
                }
            }, function(s) {
                i.alert("系统繁忙，请稍后重试！");
                console.log(s)
            })
        } catch (r) {
            console.log(r)
        }
    }
    ;
    i.getMedicalTemplateByItem = function(n, p) {
        var o = {
            TenantID: CommonFun.getDataFromSession("CurrentUser").Body.Tenant.TenantID,
            RecordItemID: n.RecordItemID
        };
        try {
            b.medicalTemplateRequest(o, c.operateCode.get, function(r) {
                if (r.Header.StatusCode == 0) {
                    k.RecordTemplateItems = r.Body;
                    if (k.RecordTemplateItems != null && k.RecordTemplateItems.length > 0) {
                        var t = "icon-medkit";
                        p.removeChildNodes();
                        for (var s = 0; s < k.RecordTemplateItems.length; s++) {
                            p.createChildNode(k.RecordTemplateItems[s].Name, false, t, null, "", JSON.stringify(k.RecordTemplateItems[s]), 4, function(v) {
                                var u = $.parseJSON(v);
                                i.getMedicalContent(u)
                            })
                        }
                        p.expanded = false;
                        p.expandNode()
                    } else {
                        i.alert("对不起，没有模板可用，请先前往系统设置，增加该病历项目的模板！")
                    }
                } else {
                    i.alert(GetErrormsg(r.Header.StatusCode))
                }
            }, function(r) {
                i.alert("系统繁忙，请稍后重试！");
                console.log(r)
            })
        } catch (q) {
            console.log(q)
        }
    }
    ;
    i.getMedicalContent = function(p) {
        var n = {
            TenantID: p.TenantID,
            TemplateID: p.TemplateID
        };
        try {
            b.medicalTemplateContentRequest(n, c.operateCode.get, function(q) {
                if (q.Header.StatusCode == 0) {
                    if (q.Body != null && q.Body.length > 0) {
                        j.DealMedicalTemplateContent(q.Body, k)
                    }
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                i.alert("系统繁忙，请稍候重试！");
                console.log(q)
            })
        } catch (o) {
            console.log(o)
        }
    }
    ;
    i.initialize = function(n) {
        c.module = MenuEnum.PlatformMG
    }
    ;
    i.updateResourceModule = function(n) {
        c.module = n
    }
    ;
    i.sendMedicalAdvice = function(n) {
        try {
            b.sendAdviceRequest(n, c.operateCode.insert, function(p) {
                if (p.Header.StatusCode == 0) {
                    i.alert("医嘱信息已发送成功！医嘱信息请查看患者详情！")
                } else {
                    i.alert(GetErrormsg(p.Header.StatusCode))
                }
            }, function(p) {
                i.alert("服务器繁忙，请稍候重试！");
                console.log(p)
            })
        } catch (o) {
            console.log(o)
        }
    }
    ;
    i.getMedicalAdvices = function(o, n) {
        try {
            b.adviceItemsRequest(o, c.operateCode.get, function(q) {
                if (q.Header.StatusCode == 0) {
                    n.adviceTemplates = q.Body
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                i.alert("系统繁忙，请稍候再试");
                console.log(q)
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.getAdviceContent = function(o, n) {
        try {
            b.adviceContentRequest(o, c.operateCode.get, function(r) {
                if (r.Header.StatusCode == 0) {
                    n.adviceTemplateContent = r.Body;
                    var q = "";
                    if (n.adviceTemplateContent) {
                        for (var t = 0; t < n.adviceTemplateContent.length; t++) {
                            q = q + n.adviceTemplateContent[t].Self.Content + "\r";
                            if (n.adviceTemplateContent[t].Childs.length > 0) {
                                for (var s = 0; s < n.adviceTemplateContent[t].Childs.length; s++) {
                                    q = q + (s + 1) + ". " + n.adviceTemplateContent[t].Childs[s].Self.Content + "\r"
                                }
                            }
                        }
                    }
                    n.currentMedicalRecord.Advice = q
                } else {
                    i.alert(GetErrormsg(r.Header.StatusCode))
                }
            }, function(q) {
                console.log(q);
                i.alert("系统繁忙，请稍候再试！")
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.isHasModulePermission = function() {
        return f.isWithModulePermission(MenuEnum.BookMG)
    }
    ;
    i.getBillList = function(o, n) {
        n.isLoading = true;
        try {
            b.getBillRequest(o, c.operateCode.get, function(q) {
                $("#loading_div").modal("hide");
                if (q.Header.StatusCode == 0) {
                    n.billList = q.Body;
                    if (n.billList && n.billList.length > 0) {
                        var r = {
                            BillNo: n.billList[0].BillNo
                        };
                        i.getBillDetailByNo(r, n)
                    } else {
                        n.billList = null;
                        n.currentBillDetail = null;
                        n.isLoading = false
                    }
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                console.log(q);
                i.alert("系统繁忙，请稍后再试！")
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.getBillDetailByNo = function(o, n) {
        try {
            b.getBillByNoRequest(o, c.operateCode.get, function(q) {
                $("#loading_div").modal("hide");
                n.isLoading = false;
                if (q.Header.StatusCode == 0) {
                    n.currentBillDetail = q.Body;
                    n.payRequest = {
                        BillNo: n.currentBillDetail.Bill.BillNo,
                        PatientID: n.currentBillDetail.Patient.PatientID,
                        TreatID: n.currentBillDetail.Treat ? n.currentBillDetail.Treat.TreatID : "",
                        TenantID: n.currentBillDetail.Patient.TenantID,
                        Amount: 0,
                        Description: "",
                        PatientPayment: 0,
                        Change: 0,
                        Balance: 0,
                        PaymentType: "1",
                        PayeeID: !n.currentLogin.User ? n.currentLogin.Tenant.TenantID : n.currentLogin.User.UserID,
                        PayeeName: !n.currentLogin.User ? "院长" : n.currentLogin.User.UserName,
                        PaymentCategory: "1"
                    }
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                i.alert("系统繁忙，请稍后重试！");
                console.log(q)
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.billRefund = function(o, n) {
        try {
            b.billRefundRequest(o, c.operateCode.update, function(q) {
                n.isPayAble = true;
                if (q.Header.StatusCode == 0) {
                    $("#bill_refund").modal("hide");
                    i.alert("退费成功！");
                    i.getBillList(n.searchData.bill, n)
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                i.alert("系统繁忙，请稍后重试！");
                console.log(q)
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.savePay = function(o, n) {
        try {
            b.payBillRequest(o, c.operateCode.update, function(q) {
                n.isPayAble = true;
                if (q.Header.StatusCode == 0) {
                    $("#pay").modal("hide");
                    i.alert("支付成功！");
                    i.getBillList(n.searchData.bill, n)
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                i.alert("系统繁忙，请稍后重试！");
                console.log(q)
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.cancelBill = function(o, n) {
        try {
            b.cancelBillRequest(o, c.operateCode.update, function(q) {
                if (q.Header.StatusCode == 0) {
                    i.alert("账单已作废！");
                    i.getBillList(n.searchData.bill, n)
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                console.log(q);
                i.alert("系统繁忙，请稍候再试！")
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.finishedBill = function(o, n) {
        try {
            b.finishedBillRequest(o, c.operateCode.update, function(q) {
                if (q.Header.StatusCode == 0) {
                    i.alert("账单已结账！");
                    i.getBillList(n.searchData.bill, n)
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                console.log(q);
                i.alert("系统繁忙，请稍候再试！")
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.confirm = function(o, p, n) {
        c.MsgBox.Confirm("温馨提示", o, p, n)
    }
    ;
    i.alert = function(n) {
        c.MsgBox.Alert("消息", n)
    }
    ;
    i.isWithOperatePermission = function(n) {
        var o = c.Auths[n];
        return f.isWithOperatePermission(MenuEnum.PlatformMG, o)
    }
    ;
    i.accountRecharge = function(o, n) {
        try {
            b.accountRechargeRequest(o, c.operateCode.insert, function(q) {
                n.isCompleted = true;
                if (q.Header.StatusCode == 0) {
                    n.account = q.Body;
                    n.orginCurrentPatient.Account.Amount = n.account.Amount;
                    n.currentPatient.Account.Amount = n.account.Amount;
                    i.alert("充值成功！");
                    var r = {
                        TenantID: o.TenantID,
                        PatientID: o.PatientID
                    };
                    n.resetAccountUpdate();
                    i.getAccountPipeline(r, n)
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                console.log(q);
                i.alert("系统繁忙，请稍候重试！")
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.accountTransfer = function(o, n) {
        try {
            b.accountTransferRequest(o, c.operateCode.insert, function(q) {
                n.isCompleted = true;
                if (q.Header.StatusCode == 0) {
                    n.account = q.Body;
                    n.orginCurrentPatient.Account.Amount = n.account.Amount;
                    n.currentPatient.Account.Amount = n.account.Amount;
                    i.alert("转账成功！");
                    var r = {
                        TenantID: o.TenantID,
                        PatientID: o.PatientID
                    };
                    n.resetAccountUpdate();
                    i.getAccountPipeline(r, n)
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                console.log(q);
                i.alert("系统繁忙，请稍候重试！")
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.accountRefund = function(o, n) {
        try {
            b.accountRefundRequest(o, c.operateCode.insert, function(q) {
                n.isCompleted = true;
                if (q.Header.StatusCode == 0) {
                    n.account = q.Body;
                    n.orginCurrentPatient.Account.Amount = n.account.Amount;
                    n.currentPatient.Account.Amount = n.account.Amount;
                    i.alert("退款成功！");
                    var r = {
                        TenantID: o.TenantID,
                        PatientID: o.PatientID
                    };
                    n.resetAccountUpdate();
                    i.getAccountPipeline(r, n)
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                console.log(q);
                i.alert("系统繁忙，请稍候重试！")
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.getAccountPipeline = function(o, n) {
        try {
            b.accountRequest(o, c.operateCode.get, function(q) {
                if (q.Header.StatusCode == 0) {
                    n.accountPipeLineList = q.Body.Histories;
                    n.account = q.Body.Account;
                    if (!n.account) {
                        n.account = {
                            ID: 0,
                            PatientID: n.currentPatient.PatientID,
                            TenantID: n.currentPatient.TenantID,
                            Amount: 0,
                            State: 0,
                            CreateTime: ""
                        }
                    }
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                i.alert("系统繁忙，请稍后再试！");
                console.log(q)
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    i.getQRCodeInfo = function(o, n) {
        try {
            b.createSceneQRCodeRequest(o, c.operateCode.get, function(q) {
                if (q.Header.StatusCode == 0) {
                    if (n.operateType == 0) {
                        n.currentPatient.QRCodes = FileURL + "QRCode/" + q.Body.QRCode
                    } else {
                        n.currentBillDetail.QRCodes = FileURL + "QRCode/" + q.Body.QRCode
                    }
                } else {
                    i.alert(GetErrormsg(q.Header.StatusCode))
                }
            }, function(q) {
                console.log(q)
            })
        } catch (p) {
            console.log(p)
        }
    }
    ;
    return i
}
]);
module.controller("PlatformController", ["$scope", "PlatformService", "CalendarService", "$location", "PatientCommonService", "$compile", "$timeout", "PushMessageService", function(k, b, a, g, l, e, c, i) {
    k.visitStateList = [{
        Value: 0,
        Text: "全部"
    }, {
        Value: 1,
        Text: "待跟进"
    }, {
        Value: 2,
        Text: "已回访"
    }, {
        Value: 3,
        Text: "未访"
    }];
    k.genderList = [{
        Value: 1,
        Text: "男"
    }, {
        Value: 2,
        Text: "女"
    }];
    k.appointTypeList = [{
        Value: 1,
        Text: "初诊"
    }, {
        Value: 2,
        Text: "复诊"
    }];
    k.searchData = {
        patient: {},
        visit: {},
        bill: {
            TenantID: "",
            SearchDate: null,
            BeginDate: "",
            EndDate: "",
            DoctorID: null,
            Status: 0,
            SearchType: 0,
            Condition: ""
        }
    };
    k.currentUser = CommonFun.getDataFromSession("CurrentUser");
    if (k.currentUser.Body.User != null && k.currentUser.Body.User.IsDoctor == 1) {
        k.currentUserDoctorId = k.currentUser.Body.User.UserID
    } else {
        k.currentUserDoctorId = null
    }
    k.initialize = function() {
        k.isApp = true;
        k.isVis = false;
        k.isBill = false;
        k.searchData.patient.status = 0;
        k.searchData.patient.condition = "";
        k.headerButton = "新增预约";
        k.headerButtonEvent = 0;
        k.currentIndex = 0;
        k.ChargePattern = true;
        k.loadDictionary = false;
        k.isDoctor = false;
        k.isShowAllOperate = false;
        k.isWithCharge = b.isWithOperatePermission("Bill_visit");
        k.DoctorNameList = [];
        k.amount = 0;
        k.isLoading = false;
        k.currentBillDetail = {};
        k.isCompleted = true;
        k.currentLogin = CommonFun.getDataFromSession("CurrentUser").Body;
        var m = k.currentLogin.User;
        var n = k.currentLogin.Tenant;
        k.appointStatusList = [{
            Value: 1,
            Text: "已预约"
        }, {
            Value: 2,
            Text: "候诊中"
        }, {
            Value: 3,
            Text: "治疗中"
        }, {
            Value: 4,
            Text: "已完成"
        }, {
            Value: 5,
            Text: "预约未到"
        }];
        if (b.isWithOperatePermission("WorkPlatform_sign") && b.isWithOperatePermission("WorkPlatform_treat")) {
            k.isShowAllOperate = true
        } else {
            k.isShowAllOperate = false;
            if (b.isWithOperatePermission("WorkPlatform_sign")) {
                k.isDoctor = false
            }
            if (b.isWithOperatePermission("WorkPlatform_treat")) {
                k.isDoctor = true
            }
        }
        if (m) {
            switch (m.JobTitle) {
            case 2:
            case 3:
                k.bookStateList = [{
                    Value: 0,
                    Text: "状态(全部)"
                }, {
                    Value: 1,
                    Text: "已预约"
                }, {
                    Value: 2,
                    Text: "候诊中"
                }, {
                    Value: 3,
                    Text: "治疗中"
                }, {
                    Value: 4,
                    Text: "已完成"
                }, {
                    Value: 5,
                    Text: "预约未到"
                }];
                break;
            case 1:
                k.bookStateList = [{
                    Value: 0,
                    Text: "状态(全部)"
                }, {
                    Value: 2,
                    Text: "候诊中"
                }, {
                    Value: 3,
                    Text: "治疗中"
                }, {
                    Value: 4,
                    Text: "已完成"
                }];
                break;
            case 4:
                k.bookStateList = [{
                    Value: 0,
                    Text: "状态(全部)"
                }, {
                    Value: 1,
                    Text: "已预约"
                }, {
                    Value: 2,
                    Text: "候诊中"
                }, {
                    Value: 3,
                    Text: "治疗中"
                }, {
                    Value: 4,
                    Text: "已完成"
                }, {
                    Value: 5,
                    Text: "预约未到"
                }];
                break;
            case 5:
                k.bookStateList = [{
                    Value: 0,
                    Text: "状态(全部)"
                }, {
                    Value: 1,
                    Text: "已预约"
                }, {
                    Value: 2,
                    Text: "候诊中"
                }, {
                    Value: 3,
                    Text: "治疗中"
                }, {
                    Value: 4,
                    Text: "已完成"
                }, {
                    Value: 5,
                    Text: "预约未到"
                }];
                break;
            default:
                break
            }
        } else {
            if (n && k.currentLogin.UserType == 1) {
                k.bookStateList = [{
                    Value: 0,
                    Text: "状态(全部)"
                }, {
                    Value: 1,
                    Text: "已预约"
                }, {
                    Value: 2,
                    Text: "候诊中"
                }, {
                    Value: 3,
                    Text: "治疗中"
                }, {
                    Value: 4,
                    Text: "已完成"
                }, {
                    Value: 5,
                    Text: "预约未到"
                }]
            }
        }
        k.relationList = [{
            Type: 1,
            Name: "亲属"
        }, {
            Type: 2,
            Name: "朋友"
        }, {
            Type: 3,
            Name: "同事"
        }, {
            Type: 4,
            Name: "同学"
        }, {
            Type: 5,
            Name: "其他"
        }];
        k.billStateList = [{
            Type: 0,
            Name: "全部"
        }, {
            Type: 1,
            Name: "待收费"
        }, {
            Type: 2,
            Name: "欠费"
        }, {
            Type: 3,
            Name: "已作废"
        }, {
            Type: 4,
            Name: "已完成"
        }];
        b.initialize(k);
        b.search(0, k);
        k.isSendAdviceSMS = false;
        $.formValidator.initConfig({
            validatorGroup: "6",
            mode: "AlertTip"
        });
        $($("#medical_record input[name='ChiefComplaints']")[0]).formValidator({
            validatorGroup: "6"
        }).functionValidator({
            fun: PlatformMG.validateLength
        });
        $($("#medical_record input[name='PresentIllness']")[0]).formValidator({
            validatorGroup: "6"
        }).functionValidator({
            fun: PlatformMG.validateLength
        });
        $($("#medical_record input[name='PastHistory']")[0]).formValidator({
            validatorGroup: "6"
        }).functionValidator({
            fun: PlatformMG.validateLength
        });
        $($("#medical_record input[name='AllergyHistory']")[0]).formValidator({
            validatorGroup: "6"
        }).functionValidator({
            fun: PlatformMG.validateLength
        });
        $($("#medical_record textarea[name='jianchaContent']")[0]).formValidator({
            validatorGroup: "6"
        }).functionValidator({
            fun: PlatformMG.validateLength
        });
        $($("#medical_record textarea[name='fuzhujiancha']")[0]).formValidator({
            validatorGroup: "6"
        }).functionValidator({
            fun: PlatformMG.validateLength
        });
        $($("#medical_record textarea[name='zhenduanContent']")[0]).formValidator({
            validatorGroup: "6"
        }).functionValidator({
            fun: PlatformMG.validateLength
        });
        $($("#medical_record textarea[name='zhiliaoContent']")[0]).formValidator({
            validatorGroup: "6"
        }).functionValidator({
            fun: PlatformMG.validateLength
        })
    }
    ;
    k.blurHide = function(m, n) {
        $(document).click(function(p) {
            var t = p
              , s = $(t.srcElement || t.target);
            if ($(s).is("#" + n + ",#" + n + " *")) {
                var r = $($(s)[0]).parent()[0];
                if ($(r).attr("class").indexOf("first") > -1 || $(r).attr("class").indexOf("second") > -1) {
                    var o = $($(r)[0]).siblings();
                    if (o != undefined && o.length > 0) {
                        for (var q = 0; q < o.length; q++) {
                            $(o[q]).children("ul").slideUp("slow")
                        }
                    }
                }
            } else {
                if (!$(s).is(".autoSelect[name=" + m + "]")) {
                    $("#" + n).slideUp("slow")
                }
            }
        })
    }
    ;
    k.inactiveClick = function(m) {
        var n = m.target;
        if ($(n).siblings("ul").css("display") == "none") {
            $(n).parent("li").siblings("li").removeClass("inactives");
            $(n).addClass("inactives");
            $(n).siblings("ul").slideDown(100).children("li");
            if ($(n).parents("li").siblings("li").children("ul").css("display") == "block") {
                $(n).parents("li").siblings("li").children("ul").parent("li").children("a").removeClass("inactives");
                $(n).parents("li").siblings("li").children("ul").slideUp(100)
            }
        } else {
            $(n).removeClass("inactives");
            $(n).siblings("ul").slideUp(100);
            $(n).siblings("ul").children("li").children("ul").parent("li").children("a").addClass("inactives");
            $(n).siblings("ul").children("li").children("ul").slideUp(100);
            $(n).siblings("ul").children("li").children("a").removeClass("inactives")
        }
    }
    ;
    k.selectDepartmentClick = function(o, m, n, p) {
        if (m == 1) {
            $(".autoSelect[name='appointmentItemsList']").val(o.Name);
            k.addAppoint.AppointItemName = o.Name;
            k.addAppoint.CategoryID = n.CategoryID;
            k.addAppoint.CategoryName = n.Name;
            k.addAppoint.SubCategoryID = o.SubCategoryID;
            k.addAppoint.SubCategoryName = p.Name;
            k.addAppoint.AppointItemID = o.AppointItemID
        } else {
            $(".autoSelect[name='visitItemsList']").val(o.Name);
            k.addVisit.VisitItemName = o.Name;
            k.addVisit.SubCategoryID = o.SubCategoryID;
            k.addVisit.VisitItemID = o.VisitItemID
        }
    }
    ;
    k.focusShow = function(n, t) {
        var r = n.target;
        var s = $("#new_appoint div.modal-body").height();
        var o = r.offsetWidth;
        var m = r.offsetHeight;
        var q = r.offsetLeft;
        var p = r.offsetTop;
        if (t == "dataDepartment" || t == "visitItemsList") {
            $("#" + t).css({
                left: q,
                bottom: (s - p + m + 10),
                position: "absolute",
                "max-height": 300 + "px",
                width: o,
                "z-index": 9999,
                "overflow-y": "scroll"
            })
        } else {
            $("#" + t).css({
                left: q,
                top: (p + m),
                position: "absolute",
                width: o,
                "max-height": 300 + "px",
                "z-index": 9999,
                "overflow-y": "scroll"
            })
        }
        $("#" + t).slideDown("slow")
    }
    ;
    k.selectAppointItem = function(m) {
        $(".autoSelect[name='appointmentItemsList2']").val(m.Name);
        k.currentPatient.Appoint.AppointItemName = m.Name;
        k.currentPatient.Appoint.AppointItemID = m.ID
    }
    ;
    k.patientTabClick = function() {
        k.isApp = true;
        k.isVis = false;
        k.isBill = false;
        b.updateResourceModule(MenuEnum.PlatformMG);
        $("#loading_div").modal("show");
        b.searchPatientEvent(k)
    }
    ;
    k.visitTabClick = function() {
        k.isApp = false;
        k.isVis = true;
        k.isBill = false;
        b.updateResourceModule(MenuEnum.PlatformMG);
        $("#loading_div").modal("show");
        b.searchVisitEvent(k)
    }
    ;
    var f = function(s, q) {
        var o = "";
        if (q == 0 && q == 1 && !s) {
            o = new Date()
        } else {
            if (!s) {
                return ""
            } else {
                o = s
            }
        }
        var p = o.getFullYear();
        var r = (o.getMonth() + 1).toString();
        if (r.length == 1) {
            r = "0" + r
        }
        var n = o.getDate().toString();
        if (n.length == 1) {
            n = "0" + n
        }
        if (q == 0) {
            return p + "-" + r + "-" + n
        }
        var m = o.getHours().toString();
        if (m.length == 1) {
            m = "0" + m
        }
        var t = o.getMinutes().toString();
        if (t.length == 1) {
            t = "0" + t
        }
        return p + "-" + r + "-" + n + " " + m + ":" + t + ":00"
    };
    k.$watchGroup(["startTime", "endTime"], function() {
        k.calendarDate = f(k.startTime, 0)
    });
    k.$watch("calendarDate", function() {
        if (k.createCalendar == true) {
            if (k.calendarDate == "") {
                a.gotoDate("myCalendar1", new Date())
            } else {
                a.gotoDate("myCalendar1", k.calendarDate)
            }
        }
    });
    a.setScope(k);
    k.uiConfig = a.uiConfig;
    k.eventSources = a.eventSources;
    k.showAdd = function() {
        k.consultantHospitalDepartmentName = "";
        if (k.headerButtonEvent == 0) {
            k.showAddAppoint(0)
        } else {
            k.showAddVisit(0)
        }
    }
    ;
    k.refresh = function() {
        k.currentIndex = 0;
        b.search(k.headerButtonEvent, k)
    }
    ;
    k.showAddVisit = function(m) {
        if (!b.isWithOperatePermission("OperateAuth_manageVisitItem")) {
            b.alert("对不起，您没有权限，请联系管理员！");
            return
        }
        if (m != 0) {
            if (k.currentPatient == null || k.currentPatient.Appoint.Status != 4) {
                return
            }
        }
        k.AddVisitType = m;
        k.emptyAddVisit();
        $("#new_visit").modal("show")
    }
    ;
    k.emptyAddVisit = function() {
        if (k.DoctorList.length > 0) {
            k.selectedVisitor = k.DoctorList[0]
        }
        k.consultantHospitalDepartmentName = "";
        if (k.AddVisitType == 1) {
            var m = JSON.parse(JSON.stringify(k.currentPatient));
            k.addVisit = {
                PatientID: m.Appoint.PatientID,
                PatientName: m.Appoint.PatientName,
                Gender: m.Appoint.Gender,
                Mobile: m.Appoint.Mobile,
                AppointID: m.Appoint.AppointID,
                TreatDoctorID: m.Appoint.DoctorID,
                TreatDoctorName: m.Appoint.DoctorName,
                TreatTime: m.Appoint.BeginTime,
                State: 0,
                Status: 1,
                TenantID: k.currentUser.Body.Tenant.TenantID
            };
            k.selectedAppoint = m;
            k.canSelectPatientForVisit = false;
            k.canSelectAppoint = false
        } else {
            if (k.AddVisitType == 0) {
                k.selectedPatient = !k.PatientList ? null : !k.PatientList[0];
                k.addVisit = {
                    PatientID: !k.PatientList ? 0 : k.PatientList[0].PatientID,
                    PatientName: !k.PatientList ? 0 : k.PatientList[0].Name,
                    Gender: !k.PatientList ? 0 : k.PatientList[0].Gender,
                    Mobile: !k.PatientList ? 0 : k.PatientList[0].Mobile,
                    TreatTime: !k.PatientList ? 0 : k.PatientList[0].BeginTime,
                    State: 0,
                    Status: 1,
                    TenantID: k.currentUser.Body.Tenant.TenantID
                };
                k.canSelectPatientForVisit = true;
                k.canSelectAppoint = true
            }
        }
    }
    ;
    k.$watch("selectedAppoint", function() {
        var m = k.selectedAppoint;
        if (k.addVisit == null) {
            return
        }
        if (m == null) {
            k.addVisit.AppointID = "";
            k.addVisit.TreatDoctorID = "";
            k.addVisit.TreatDoctorName = "";
            k.addVisit.TreatTime = ""
        } else {
            k.addVisit.AppointID = m.Appoint.AppointID;
            k.addVisit.TreatDoctorID = m.Appoint.DoctorID;
            k.addVisit.TreatDoctorName = m.Appoint.DoctorName;
            k.addVisit.TreatTime = m.Appoint.BeginTime
        }
    });
    k.$watch("selectedPatient", function() {
        var n = k.selectedPatient;
        if (n == null) {
            return
        }
        k.addVisit.PatientID = n.PatientID;
        k.addVisit.PatientName = n.PatientName;
        k.addVisit.Gender = n.Gender;
        k.addVisit.Mobile = n.Mobile;
        var m = {
            PatientID: n.PatientID,
            TenantID: k.currentUser.Body.Tenant.TenantID
        };
        b.GetListForVisit(m, k)
    });
    k.emptyAddAppoint = function() {
        if (k.AddAppointType == 1) {
            k.addAppoint = JSON.parse(JSON.stringify(k.currentPatient.Appoint));
            k.addAppoint.Status = 1;
            k.disablePatientEdit = true;
            k.canSelectPatient = false
        } else {
            if (k.AddAppointType == 0) {
                k.addAppoint = {
                    MainID: "",
                    AppointType: 1,
                    Gender: 1,
                    TenantID: k.currentUser.Body.Tenant.TenantID,
                    Status: 1,
                    State: 0,
                    DoctorID: ((k.DoctorList == null || k.DoctorList == undefined || k.DoctorList.length == 0) ? 0 : k.DoctorList[0].UserID)
                };
                k.disablePatientEdit = false;
                k.canSelectPatient = true
            } else {
                if (!k.currentPatient) {
                    b.alert("对不起，无法创建复诊预约，请选择患者！");
                    return
                }
                var m = JSON.parse(JSON.stringify(k.currentPatient));
                k.addAppoint = {
                    AppointType: 1,
                    Gender: m.currentVisit.Visit.Gender,
                    TenantID: k.currentUser.Body.Tenant.TenantID,
                    Status: 1,
                    State: 0,
                    DoctorID: k.DoctorList[0].UserID,
                    PatientName: m.currentVisit.Visit.PatientName,
                    Birthday: m.currentVisit.Visit.Birthday,
                    Mobile: m.currentVisit.Visit.Mobile,
                    PatientLevelID: m.currentVisit.Visit.PatientLevelID,
                    PatientSourceID: m.currentVisit.Visit.PatientSourceID,
                    OtherContact: m.currentVisit.Visit.OtherContact,
                    PatientSourceName: b.findItem(m.currentVisit.Visit.PatientSourceID, "PatientSourceID", "Name", k.PatientSourceList),
                    PatientLevelName: b.findItem(m.currentVisit.Visit.PatientLevelID, "PatientLevelID", "Name", k.PatientLevelList),
                    MainID: "",
                    Relation: 1
                };
                k.disablePatientEdit = true;
                k.canSelectPatient = false
            }
        }
        if (k.AddAppointType == 1 || k.AddAppointType == 3) {
            k.addAppoint.AppointType = 2
        }
    }
    ;
    k.resetCalendar = function() {
        a.renewEvents();
        k.calendarDate = f(new Date(), 0)
    }
    ;
    k.resetClick = function() {
        k.emptyAddAppoint();
        k.resetCalendar()
    }
    ;
    k.showAddAppoint = function(m) {
        if (!b.isWithOperatePermission("OperateAuth_manageBookItem")) {
            b.alert("对不起，您没有权限，请联系管理员！");
            return
        }
        if (m == 1) {
            if (!k.currentPatient) {
                b.alert("对不起，无法创建复诊预约，请选择患者！");
                return
            } else {
                if (k.currentPatient.Appoint.Status != 3 && k.currentPatient.Appoint.Status != 4) {
                    b.alert("该患者不处于治疗中或已完成状态，不能进行复诊预约！");
                    return
                }
            }
        }
        if (m == 3) {
            if (!k.currentPatient) {
                b.alert("对不起，无法创建复诊预约，请选择患者！");
                return
            }
        }
        k.isRelation = false;
        k.AddAppointType = m;
        k.emptyAddAppoint();
        if ($("#new_appoint div.modal-dialog").height() <= 600) {
            a.uiConfig.calendar.height = 180
        }
        $("#new_appoint").modal("show");
        setTimeout(function() {
            a.changeView("agendaDay", "myCalendar1");
            a.refreshEventSources("myCalendar1");
            k.createCalendar = true;
            k.calendarDate = new Date().Format("yyyy-MM-dd");
            $("#hideDate").change(function() {
                var o = new Date($("#hideDate").val());
                k.calendarDate = f(o, 0);
                $("#workday").val(k.calendarDate)
            });
            if ($("#workday").length <= 0) {
                var n = angular.element('<input id="workday" type="text" style="font-size: 12px;" placeholder="预约日期" class="app_input_w form-control input-sm" name="workTime" ng-model="calendarDate">');
                angular.element($($("#appoint_time_view .fc-header-toolbar").children("div.fc-left")[0])).append(e(n)(k));
                CommonFun.bindingDateControl("workday", "", "", false)
            }
        }, 500);
        $("#appointmentItemsList").val("")
    }
    ;
    k.selectPatient = function(m) {
        k.addAppoint.PatientID = m.PatientID;
        k.addAppoint.PatientName = m.Name;
        k.addAppoint.Birthday = m.Birthday;
        k.addAppoint.Gender = m.Gender;
        k.addAppoint.Mobile = m.Mobile;
        k.addAppoint.Address = m.Address;
        k.addAppoint.OtherContact = m.OtherContact;
        k.addAppoint.PatientSourceID = m.PatientSourceID;
        k.addAppoint.PatientLevelID = m.PatientLevelID;
        k.disablePatientEdit = true
    }
    ;
    k.showSelectedPatientDetail = function(m, n) {
        b.showSelectedPatientDetail(m, n, k)
    }
    ;
    k.hideSelectedPatientDetail = function(m) {
        $(".tempPatientDetail").remove()
    }
    ;
    k.searchAppoints = function() {
        k.currentIndex = 0;
        b.search(0, k)
    }
    ;
    k.searchVisits = function() {
        k.currentIndex = 0;
        if (d(k.searchData.visit.BeginDate, k.searchData.visit.EndDate, "visit_start_date", "visit_end_date")) {
            b.search(1, k)
        }
    }
    ;
    k.edit = function(n) {
        if (!b.isWithOperatePermission("WorkPlatform_editPatient")) {
            b.alert("对不起，您没有权限，请联系管理员！");
            return
        }
        var m = $(n.target).parent().parent();
        var o = m.next();
        m.hide();
        o.show()
    }
    ;
    k.otherAppointForAppoint = function() {
        k.showAddAppoint(1)
    }
    ;
    k.otherAppointForVisit = function() {
        k.showAddAppoint(3)
    }
    ;
    k.otherVisit = function() {
        k.showAddVisit(1)
    }
    ;
    k.gotoDetailPageForAppoint = function() {
        k.gotoDetailPage(0)
    }
    ;
    k.gotoDetailPageForVisit = function() {
        k.gotoDetailPage(1)
    }
    ;
    k.showBaseDetail = function(p, o, r, n, s) {
        if ($($("#" + s + " tbody").children("tr.selected"))) {
            $($("#" + s + " tbody").children("tr.selected")).children("td.selected").removeClass("selected");
            $($("#" + s + " tbody").children("tr.selected")).removeClass("selected")
        }
        if (n && (n.button == 0 || n.button == 2)) {
            if (n.button == 2) {
                var q = "";
                var m = {
                    name: "",
                    textLimit: 10,
                    offsetX: 3,
                    offsetYs: 3,
                    beforeShow: $.noop,
                    afterShow: $.noop
                };
                if (r) {
                    switch (p.Visit.Status) {
                    case 1:
                    case 3:
                        m.name = "menu_5";
                        q = [[{
                            text: "取消回访",
                            func: k.deleteVisit
                        }], [{
                            text: "复诊预约",
                            func: k.otherAppointForVisit
                        }], [{
                            text: "查看详情",
                            func: k.gotoDetailPageForVisit
                        }]];
                        break;
                    case 2:
                        m.name = "menu_6";
                        q = [[{
                            text: "复诊预约",
                            func: k.otherAppointForVisit
                        }], [{
                            text: "查看详情",
                            func: k.gotoDetailPageForVisit
                        }]];
                        break;
                    default:
                        break
                    }
                } else {
                    switch (p.Appoint.Status) {
                    case 1:
                    case 5:
                        m.name = "menu_1";
                        q = [[{
                            text: "取消预约",
                            func: k.deleteAppoint
                        }], [{
                            text: "预约改期",
                            func: k.goToAppointManagement
                        }], [{
                            text: "查看详情",
                            func: k.gotoDetailPageForAppoint
                        }]];
                        break;
                    case 2:
                        m.name = "menu_2";
                        q = [[{
                            text: "查看详情",
                            func: k.gotoDetailPageForAppoint
                        }]];
                        break;
                    case 3:
                        m.name = "menu_3";
                        q = [[{
                            text: "复诊预约",
                            func: k.otherAppointForAppoint
                        }], [{
                            text: "查看详情",
                            func: k.gotoDetailPageForAppoint
                        }], [{
                            text: "编辑病案",
                            func: k.editMedicalRecord
                        }]];
                        break;
                    case 4:
                        m.name = "menu_4";
                        q = [[{
                            text: "复诊预约",
                            func: k.otherAppointForAppoint
                        }], [{
                            text: "新增回访",
                            func: k.otherVisit
                        }], [{
                            text: "创建账单",
                            func: k.addCharge
                        }], [{
                            text: "查看详情",
                            func: k.gotoDetailPageForAppoint
                        }], [{
                            text: "编辑病案",
                            func: k.editMedicalRecord
                        }]];
                        break;
                    default:
                        break
                    }
                }
                $(n.target).smartMenu(q, m)
            }
            $($("#" + s + " tbody").children("tr")[o]).addClass("selected");
            $($("#" + s + " tbody").children("tr")[o]).children("td").addClass("selected")
        }
        b.showBaseDetail(p, o, r, k)
    }
    ;
    k.refreshShowEdit = function(m) {
        if (m == 0) {
            $("#patientDetail div.div_show").show();
            $("#patientDetail div.div_edit").hide()
        } else {
            $("#visitDetail div.div_show").show();
            $("#visitDetail div.div_edit").hide()
        }
    }
    ;
    k.addAppointToDB = function() {
        if (!$.formValidator.pageIsValid("3")) {
            return
        }
        if (k.addAppoint.DoctorID == null || k.addAppoint.DoctorID == "") {
            j("", "请选择就诊医生！", "select_doctor", "bottomLeft");
            return
        }
        if (k.addAppoint.AppointItemName == null || k.addAppoint.AppointItemName == "") {
            j("", "请选择预约事项！", "appointmentItemsList", "bottomLeft");
            return
        }
        k.addAppoint.BeginTime = f(k.startTime, 1);
        k.addAppoint.EndTime = f(k.endTime, 1);
        if (k.addAppoint.BeginTime == null || k.addAppoint.BeginTime == "" || k.addAppoint.BeginTime == undefined) {
            j("", "请选择预约时间！", "workday", "bottomLeft");
            return
        }
        var p = b.findAllItem(k.addAppoint.PatientSourceID, "PatientSourceID", k.PatientSourceList);
        var o = b.findAllItem(k.addAppoint.PatientLevelID, "PatientLevelID", k.PatientLevelList);
        k.addAppoint.DoctorName = b.findItem(k.addAppoint.DoctorID, "UserID", "UserName", k.DoctorList);
        var m = k.AddAppointType == 0 || k.AddAppointType == 1;
        var n = {
            Appoint: k.addAppoint,
            Source: p,
            Level: o
        };
        b.addAppointments(n, k, m)
    }
    ;
    k.saveAppoint = function() {
        if (!b.isWithOperatePermission("OperateAuth_manageBookItem")) {
            b.alert("对不起，您没有权限，请联系管理员！");
            return
        }
        if (k.currentPatient == null) {
            return
        }
        if (k.currentPatient.Appoint.BeginTime >= k.currentPatient.Appoint.EndTime) {
            b.alert("结束时间必须大于预约开始时间！");
            return
        }
        if (k.currentPatient.Appoint.AppointItemName == undefined || k.currentPatient.Appoint.AppointItemName == "") {
            b.alert("请选择预约事项");
            return
        }
        if (!CommonFun.checkFormat($("#mobile1").val(), DataTypeEnum.PhoneMobile) && !CommonFun.checkFormat($("#mobile1").val(), DataTypeEnum.Contract)) {
            b.alert("电话号码无效，请重新输入");
            return
        }
        k.currentPatient.Source = b.findPatientSourceID(k.currentPatient.Appoint.PatientSourceID, "PatientSourceID", k.PatientSourceList);
        if (k.currentPatient.Level != null) {
            var m = b.findAllItem(k.currentPatient.Level.Name, "Name", k.PatientLevelList);
            k.currentPatient.Level.CreateTime = m.CreateTime;
            k.currentPatient.Level.ID = m.ID;
            k.currentPatient.Level.PatientLevelID = m.PatientLevelID;
            k.currentPatient.Level.State = m.State;
            k.currentPatient.Level.TenantID = m.TenantID
        } else {
            k.currentPatient.Level.CreateTime = "";
            k.currentPatient.Level.ID = "0";
            k.currentPatient.Level.PatientLevelID = "";
            k.currentPatient.Level.State = 0;
            k.currentPatient.Level.TenantID = k.currentUser.Body.Tenant.TenantID
        }
        k.currentPatient.Appoint.DoctorName = b.findItem(k.currentPatient.Appoint.DoctorID, "UserID", "UserName", k.DoctorList);
        b.updateAppointments(k.currentPatient, k, false, false)
    }
    ;
    k.checkAppoint = function(o, m, p) {
        k.showBaseDetail(o, m, 0);
        k.currentPatient.Appoint.Status = p;
        if (p == 2) {
            var n = {
                AppointID: k.currentPatient.Appoint.AppointID,
                TenantID: k.currentPatient.PatientInfo.TenantID
            };
            b.signAppoint(n, k)
        } else {
            var n = {
                Status: p,
                AppointID: k.currentPatient.Appoint.AppointID,
                TenantID: k.currentPatient.PatientInfo.TenantID
            };
            b.treatAppoint(n, k)
        }
        if (p == 4) {
            b.confirm("是否创建回访？", function() {
                k.showAddVisit(1)
            })
        }
    }
    ;
    k.deleteAppoint = function() {
        if (!b.isWithOperatePermission("OperateAuth_manageBookItem")) {
            b.alert("对不起，您没有权限，请联系管理员！");
            return
        }
        if (k.currentPatient == null || (k.currentPatient.Appoint.Status != 1 && k.currentPatient.Appoint.Status != 5)) {
            return
        }
        b.confirm("确定要取消【" + k.currentPatient.Appoint.PatientName + "】的【" + k.currentPatient.Appoint.AppointItemName + "】预约？", function() {
            k.currentPatient.Appoint.State = 1;
            b.updateAppointments(k.currentPatient, k, false, true)
        })
    }
    ;
    k.addVisitToDB = function() {
        if (!$.formValidator.pageIsValid(k.AddVisitType == 1 ? "2" : "4")) {
            return
        }
        if (k.addVisit.VisitItemID) {
            if (k.addVisit.VisitItemName != $("#visitItemsList").val()) {
                j("", "对不起，回访事项不存在，请选择相应的回访事项！", "visitItemsList");
                return
            }
        }
        var m = k.AddVisitType == 1;
        k.addVisit.VisitorID = k.selectedVisitor.UserID;
        k.addVisit.VisitorName = k.selectedVisitor.UserName;
        b.addVisits(k.addVisit, k, m)
    }
    ;
    k.saveVisit = function() {
        if (k.currentPatient == null) {
            return
        }
        if (k.currentPatient.currentVisit.Visit.VisitorName == null) {
            b.alert("请选择回访人员！");
            return
        }
        b.updateVisits(k.currentPatient.currentVisit.Visit, k, false, false)
    }
    ;
    k.deleteVisit = function() {
        if (!b.isWithOperatePermission("OperateAuth_manageVisitItem")) {
            b.alert("对不起，您没有权限，请联系管理员！");
            return
        }
        if (k.currentPatient == null || k.currentPatient.currentVisit.Visit.Status == 2) {
            return
        }
        k.currentPatient.currentVisit.Visit.State = 1;
        b.updateVisits(k.currentPatient.currentVisit.Visit, k, false, true)
    }
    ;
    k.checkVisit = function(n, m, o) {
        k.showBaseDetail(n, m, 1);
        k.currentPatient.currentVisit.Visit.Status = 2;
        if (k.addVisit != undefined) {
            k.currentPatient.currentVisit.Visit.Remark = k.addVisit.Remark
        }
        b.updateVisits(k.currentPatient.currentVisit.Visit, k, false, false)
    }
    ;
    k.addCharge = function() {
        if (!b.isWithOperatePermission("WorkPlatform_addBill")) {
            b.alert("对不起，您没有权限，请联系管理员！");
            return
        }
        if (k.currentPatient == null || k.currentPatient.Appoint.Status < 3 || k.currentPatient.Appoint.Status > 4) {
            return
        }
        $("#loading_div").modal("show");
        b.getMainCatalog(k);
        b.getDetailCatalog(k);
        b.getCatalogItems(k, 1);
        k.resetCharge(0)
    }
    ;
    k.checkChargePattern = function() {
        k.originalFee = 0;
        k.planTotalFee = 0;
        k.discount = 100;
        k.totalFeeWithoutDiscount = 0;
        if ($("#costPattern").html() == "项目明细") {
            $("#costPattern").html("快速填写");
            $("#detailedCharge").show();
            var m = 0;
            if (k.detailItemsList != undefined && k.detailItemsList != null && k.detailItemsList.length > 0) {
                angular.forEach(k.detailItemsList, function(n) {
                    if (n.amount != undefined && n.amount != "" && CommonFun.checkFormat(n.amount, DataTypeEnum.Number)) {
                        m = parseFloat(m) + parseFloat(n.amount * n.Price.Price)
                    }
                });
                k.originalFee = m.toFixed(2);
                k.totalFeeWithoutDiscount = m.toFixed(2)
            }
            $("#fastCharge").hide();
            k.ChargePattern = false
        } else {
            $("#costPattern").html("项目明细");
            $("#fastCharge").show();
            var m = 0;
            if (k.MainCategoryList != undefined && k.MainCategoryList != null && k.MainCategoryList.length > 0) {
                angular.forEach(k.MainCategoryList, function(n) {
                    if (n.Price != undefined && n.Price != "" && CommonFun.checkFormat(n.Price, DataTypeEnum.Fee)) {
                        m = parseFloat(m) + parseFloat(n.Price)
                    }
                });
                k.originalFee = m.toFixed(2);
                k.totalFeeWithoutDiscount = m.toFixed(2)
            }
            $("#detailedCharge").hide();
            k.ChargePattern = true
        }
        k.calculateDiscountFee()
    }
    ;
    k.createTree = function(r, t) {
        var m = "";
        var q = {};
        var u = {
            context1: {
                elements: [{
                    text: "展开",
                    icon: "icon-star-empty",
                    action: function(x) {
                        x.expandNode()
                    }
                }, {
                    text: "收缩",
                    icon: "icon-star-empty",
                    action: function(x) {
                        x.collapseNode()
                    }
                }]
            }
        };
        var n = function(y, x, z) {
            b.getDetailCatalog(y, x, z)
        };
        var s = function(y, x, z) {
            b.getMedicalItems(y, x, z)
        };
        switch (t) {
        case 1:
            q = n;
            m = "ItemTree";
            break;
        case 2:
            q = s;
            m = "advice_tree";
            break;
        default:
            break
        }
        if (r != undefined && r != null) {
            k.tree = createTree(m, "white", u);
            for (var p = 0; p < r.length; p++) {
                var w = k.tree.createNode(r[p].Category.Name, false, "icon-folder-close-alt", null, null, "context1", JSON.stringify(r[p]), 1);
                for (var o = 0; o < r[p].SubCategories.length; o++) {
                    r[p].SubCategories[o].CategoryName = r[p].Category.Name;
                    var v = w.createChildNode(r[p].SubCategories[o].Name, false, "icon-folder-close-alt", null, "context2", JSON.stringify(r[p].SubCategories[o]), 2, function(z, y) {
                        var x = $.parseJSON(z);
                        q(k, x, y)
                    })
                }
            }
        }
        k.tree.drawTree()
    }
    ;
    k.deleteChargeItem = function(n) {
        for (var m = 0; m < k.detailItemsList.length; m++) {
            if (n == k.detailItemsList[m]) {
                k.detailItemsList.splice(m, 1);
                k.detailItemsSum(n);
                return
            }
        }
    }
    ;
    k.resetCharge = function(m) {
        k.originalFee = 0;
        k.discount = 100;
        k.totalFeeWithoutDiscount = 0;
        k.planTotalFee = 0;
        k.Description = "";
        if (m == 0) {
            b.getFee({
                AppointID: k.currentPatient.Appoint.AppointID
            }, k)
        } else {
            k.setCharge()
        }
    }
    ;
    k.MainCategorySum = function(n) {
        var m = 0;
        if (k.MainCategoryList != undefined && k.MainCategoryList != null && k.MainCategoryList.length > 0) {
            angular.forEach(k.MainCategoryList, function(o) {
                if (o.Price != undefined && o.Price != "" && CommonFun.checkFormat(o.Price, DataTypeEnum.Fee)) {
                    m = parseFloat(m) + parseFloat(o.Price)
                }
            });
            k.originalFee = m.toFixed(2);
            k.totalFeeWithoutDiscount = m.toFixed(2)
        }
        if (k.discount) {
            if (k.discount < 0 || k.discount > 100) {
                j("", "折扣率无效，请重新输入！", "discount");
                k.discount = 100;
                k.planTotalFee = m.toFixed(2)
            } else {
                m = (k.discount / 100 * m * 1).toFixed(2);
                k.planTotalFee = m
            }
        } else {
            k.planTotalFee = m.toFixed(2)
        }
    }
    ;
    k.detailItemsSum = function(o) {
        var m = 0;
        var n = 0;
        o.planSum = (o.amount * o.Price.Price).toFixed(2);
        if (k.detailItemsList != undefined && k.detailItemsList != null && k.detailItemsList.length > 0) {
            angular.forEach(k.detailItemsList, function(p) {
                if (p.amount != undefined && p.amount != "" && CommonFun.checkFormat(p.amount, DataTypeEnum.Number)) {
                    m = parseFloat(m) + parseFloat(p.amount * p.Price.Price);
                    n = n + parseFloat(p.planSum)
                }
            });
            if (k.discount) {
                if (k.discount < 0 || k.discount > 100) {
                    j("", "折扣率无效，请重新输入！", "discount");
                    k.discount = 100;
                    k.planTotalFee = n.toFixed(2)
                } else {
                    n = (k.discount / 100 * n * 1).toFixed(2);
                    k.planTotalFee = n
                }
            } else {
                k.planTotalFee = n
            }
            k.originalFee = m.toFixed(2);
            k.totalFeeWithoutDiscount = m.toFixed(2)
        }
    }
    ;
    k.calculateSum = function(m) {
        if (m.amount != undefined && m.amount != "" && m.amount != 0) {
            if (!CommonFun.checkFormat(m.amount, DataTypeEnum.Number)) {
                return 0
            }
            m.sum = parseFloat(m.Price.Price * m.amount).toFixed(2);
            if (m.amount == 0) {
                m.sum = 0
            }
        } else {
            m.sum = 0
        }
        return m.sum
    }
    ;
    k.setCharge = function() {
        var m = JSON.parse(JSON.stringify(k.CostBody));
        if (m.Costs != null) {
            for (var n = 0; n < m.Costs.length; n++) {
                var o = m.Costs[n];
                if (o.CostItem == "口内") {
                    k.currentPatient.ChargeItem.item1 = o
                } else {
                    if (o.CostItem == "口外") {
                        k.currentPatient.ChargeItem.item2 = o
                    } else {
                        if (o.CostItem == "口修") {
                            k.currentPatient.ChargeItem.item3 = o
                        } else {
                            if (o.CostItem == "正畸") {
                                k.currentPatient.ChargeItem.item4 = o
                            } else {
                                if (o.CostItem == "种植") {
                                    k.currentPatient.ChargeItem.item5 = o
                                }
                            }
                        }
                    }
                }
            }
        }
        if (k.MainCategoryList != null && k.MainCategoryList != undefined) {
            for (var n = 0; n < k.MainCategoryList.length; n++) {
                k.MainCategoryList[n].Price = "";
                k.MainCategoryList[n].Remark = ""
            }
        }
        if (m.Treat != null && m.Treat.NurseName != null) {
            k.currentPatient.Appoint.NurseName = m.Treat.NurseName
        }
    }
    ;
    k.calculateDiscountFee = function() {
        if (k.discount < 0 || k.discount > 100) {
            j("", "折扣率无效，请重新输入！", "discount");
            k.planTotalFee = k.totalFeeWithoutDiscount
        } else {
            k.planTotalFee = (k.discount / 100 * parseFloat(k.totalFeeWithoutDiscount) * 1).toFixed(2)
        }
    }
    ;
    k.saveCharge = function() {
        var n = [];
        var o = false;
        var p = {
            Bill: {
                PatientID: k.currentPatient.PatientInfo.PatientID,
                PatientName: k.currentPatient.PatientInfo.PatientName,
                AppointID: k.currentPatient.Appoint.AppointID,
                TenantID: k.currentPatient.PatientInfo.TenantID,
                BillNo: null,
                CreateTime: null,
                OriginalPrice: k.originalFee,
                Discount: k.discount,
                DueCharge: k.planTotalFee,
                RealCharge: 0,
                Arrears: 0,
                Refund: 0,
                DoctorID: k.currentPatient.Appoint.DoctorID,
                DoctorName: k.currentPatient.Appoint.DoctorName,
                BillStatus: 1,
                State: 0,
                Description: k.Description
            },
            Costs: []
        };
        if (k.ChargePattern) {
            for (var m = 0; m < k.MainCategoryList.length; m++) {
                k.MainCategoryList[m].ChargeItem = {
                    Price: k.MainCategoryList[m].Price,
                    Remark: k.MainCategoryList[m].Remark,
                    CategoryID: k.MainCategoryList[m].CategoryID,
                    CategoryName: k.MainCategoryList[m].Name,
                    TenantID: k.currentUser.Body.Tenant.TenantID,
                    State: 0,
                    PatientID: k.currentPatient.Appoint.PatientID,
                    AppointID: k.currentPatient.Appoint.AppointID,
                    DiscountPrice: k.MainCategoryList[m].Price
                };
                if (k.MainCategoryList[m].ChargeItem.Price) {
                    n.push(k.MainCategoryList[m].ChargeItem);
                    if (k.MainCategoryList[m].isValidate != undefined && !k.MainCategoryList[m].isValidate) {
                        o = false;
                        break
                    }
                    if (k.MainCategoryList[m].isValidate) {
                        o = true
                    }
                } else {
                    if (k.MainCategoryList[m].ChargeItem.CostID != null && k.MainCategoryList[m].ChargeItem.CostID != "") {
                        k.MainCategoryList[m].ChargeItem.Price = 0;
                        k.MainCategoryList[m].ChargeItem.State = 1;
                        n.push(k.MainCategoryList[m].ChargeItem);
                        if (k.MainCategoryList[m].isValidate != undefined && !k.MainCategoryList[m].isValidate) {
                            o = false;
                            break
                        }
                        if (!k.MainCategoryList[m].isValidate) {
                            o = true
                        }
                    }
                }
            }
        } else {
            for (var m = 0; m < k.detailItemsList.length; m++) {
                k.detailItemsList[m].ChargeItem = {
                    Price: k.detailItemsList[m].sum,
                    Remark: k.detailItemsList[m].Remark,
                    CategoryID: k.detailItemsList[m].Category.CategoryID,
                    CategoryName: k.detailItemsList[m].Category.CategoryName,
                    SubCategoryID: k.detailItemsList[m].SubCategory.SubCategoryID,
                    SubCategoryName: k.detailItemsList[m].SubCategory.SubCategoryName,
                    CostItem: k.detailItemsList[m].Item.Name,
                    CostItemID: k.detailItemsList[m].Item.CostItemID,
                    TenantID: k.currentUser.Body.Tenant.TenantID,
                    State: 0,
                    PatientID: k.currentPatient.Appoint.PatientID,
                    AppointID: k.currentPatient.Appoint.AppointID,
                    DiscountPrice: k.detailItemsList[m].planSum
                };
                if (k.detailItemsList[m].ChargeItem.Price) {
                    n.push(k.detailItemsList[m].ChargeItem);
                    if (k.detailItemsList[m].isValidate != undefined && !k.detailItemsList[m].isValidate) {
                        o = false;
                        break
                    }
                    if (k.detailItemsList[m].isValidate) {
                        o = true
                    }
                } else {
                    if (k.detailItemsList[m].ChargeItem.CostID != null && k.MainCategoryList[m].ChargeItem.CostID != "") {
                        k.detailItemsList[m].ChargeItem.Price = 0;
                        k.detailItemsList[m].ChargeItem.State = 1;
                        n.push(k.detailItemsList[m].ChargeItem);
                        if (k.MainCategoryList[m].isValidate != undefined && !k.detailItemsList[m].isValidate) {
                            o = false;
                            break
                        }
                        if (k.detailItemsList[m].isValidate) {
                            o = true
                        }
                    }
                }
            }
        }
        if (n.length <= 0) {
            b.alert("请至少选择一项！");
            return
        }
        if (o) {
            p.Costs = n;
            b.saveFee(p, k)
        }
    }
    ;
    var j = function(o, p, q, n) {
        var m = "topLeft";
        if (n) {
            m = n
        }
        if (q) {
            $("#" + q).validationEngine("showPrompt", p, "", m, true);
            setTimeout(function() {
                $("#" + q).validationEngine("hideAll")
            }, 2000)
        } else {
            $(o).validationEngine("showPrompt", p, "", m, true);
            setTimeout(function() {
                $(o).validationEngine("hideAll")
            }, 2000)
        }
    };
    k.checkPriceFormat = function(n, o, m) {
        n.isValidate = false;
        n.isRefund = false;
        if (m == 1) {
            if (n.Price != undefined && n.Price != "" && !CommonFun.checkFormat(n.Price, DataTypeEnum.Fee)) {
                j(o.target, "请输入有效金额,小数点后保留2位!");
                n.isValidate = false
            } else {
                $(o.target).validationEngine("hideAll");
                n.Price = ((n.Price == "" || n.Price == undefined) ? "" : parseFloat(n.Price).toFixed(2));
                n.isValidate = true;
                if (n.Price && n.Price.indexOf("-") > -1) {
                    n.isRefund = true
                }
            }
        }
        if (m == 2) {
            if (n.amount != undefined && n.amount != "" && !CommonFun.checkFormat(n.amount, DataTypeEnum.Number)) {
                j(o.target, "请输入正整数!");
                n.isValidate = false
            } else {
                $(o.target).validationEngine("hideAll");
                n.isValidate = true
            }
        }
    }
    ;
    k.calculatePlanSum = function() {
        var m = 0;
        if (k.detailItemsList && k.detailItemsList.length > 0) {
            angular.forEach(k.detailItemsList, function(n) {
                if (n.amount && CommonFun.checkFormat(n.amount, DataTypeEnum.Number) && CommonFun.checkFormat(n.planSum, DataTypeEnum.Fee)) {
                    m = m + parseFloat(n.planSum)
                }
            });
            k.totalFeeWithoutDiscount = m.toFixed(2);
            k.calculateDiscountFee()
        }
    }
    ;
    k.gotoDetailPage = function(n) {
        if (n != 2) {
            if (k.currentPatient == null) {
                return
            }
            var m = {};
            if (n == 0) {
                m = b.findPatient(k.currentPatient.Appoint.PatientID, "PatientID", k.PatientList)
            } else {
                m = k.currentPatient.currentVisit.Visit
            }
            if (m == null) {
                b.alert("暂无该患者信息！");
                return
            }
            m.PatientLevel = b.findPatient(m.PatientLevelID, "PatientLevelID", k.PatientLevelList);
            m.PatientSource = b.findPatient(m.PatientSourceID, "PatientSourceID", k.PatientSourceList)
        }
        if (n == 2) {
            if (!k.currentBillDetail) {
                return
            } else {
                m = k.currentBillDetail.Patient;
                m.PatientLevel = k.currentBillDetail.Level;
                m.PatientSource = k.currentBillDetail.PatientSource
            }
        }
        CommonFun.saveDataToSession("CurrentPatient", m);
        CommonFun.saveDataToSession("module", MenuEnum.PlatformMG);
        window.location.href = "../WebPages/DCPatientDetail.html"
    }
    ;
    var h = function(m) {
        if (m.toString().length == 1) {
            return "0" + m
        }
        return m
    };
    k.appointTimeText = function(p, o) {
        var m = "";
        if (p != undefined && o != undefined) {
            var q = new Date(p).Format("hh:mm");
            var n = new Date(o).Format("hh:mm");
            m = q + "-" + n
        }
        return m
    }
    ;
    k.timeText = function(n) {
        var m = new Date(n);
        return h(m.getHours()) + ":" + h(m.getMinutes())
    }
    ;
    k.appointTypeText = function(m) {
        return m == 1 ? "初诊" : "复诊"
    }
    ;
    k.GenderText = function(m) {
        return m == 1 ? "男" : "女"
    }
    ;
    k.AgeText = function(m) {
        if (m == null) {
            return ""
        }
        return CommonFun.calculateAge(new Date(m).Format("yyyy-MM-dd"))
    }
    ;
    k.StateText = function(m) {
        switch (m) {
        case 1:
            return "已预约";
        case 2:
            return "候诊中";
        case 3:
            return "治疗中";
        case 4:
            return "已完成";
        case 5:
            return "预约未到";
        default:
            return ""
        }
    }
    ;
    k.VisitStateText = function(m) {
        switch (m) {
        case 1:
            return "待跟进";
        case 2:
            return "已回访";
        case 3:
            return "未访";
        default:
            return "待跟进"
        }
    }
    ;
    k.deleteFile = function(n, o) {
        if (n.ID == 0) {
            for (var m = 0; m < k.newFiles.length; m++) {
                if (k.newFiles[m].file.name == n.SourceName) {
                    k.newFiles.splice(m, 1);
                    break
                }
            }
            $($($(o.target).parent()[0]).parent()[0]).remove()
        } else {
            n.State = 1;
            b.upudateFileInfo(k, n, o)
        }
    }
    ;
    k.selectFile = function() {
        $("#selectFile").click()
    }
    ;
    k.uploadSingleFile = function(m, n) {
        k.currentFile = m;
        b.uploadFiles(k, 2)
    }
    ;
    k.downloadSingleFile = function(o, q) {
        var p = "";
        switch (o.FileType) {
        case 1:
            p = "Image/";
            break;
        case 2:
            p = "File/";
            break;
        case 3:
            p = "File/";
            break;
        default:
            break
        }
        var n = FileURL + p + o.FileName;
        var r = o.FileName.split("/");
        var m = document.getElementById("down_load");
        m.href = n;
        m.download = r[1];
        m.click()
    }
    ;
    k.showFileDetail = function(p, s, m) {
        k.fileRemark = p.Description;
        k.currentFileDetail = p;
        var o = 100;
        var r = -40;
        if (m <= 6) {
            r = r + (m) * o
        } else {
            r = 6 * o + r
        }
        var n = angular.element('<div class="file_show" style="display:none;z-index:99999;background-color:gainsboro;border-radius:5px;padding:5px;"><div style="height: 60%; text-align: center; margin: 2px;"><img style="width:50%;height:100%;" src="{{currentFileDetail.imgSrc}}" alt="暂无文件" ng-if="currentFileDetail.FileType == 1"><span ng-if="currentFileDetail.FileType != 1" class="{{currentFileDetail.ClassName}}" style="width:100%;height:100%;display:block;font-size:50px;"></span></div><div><input class="file_remark form-control" placeholder="文件备注" ng-blur="hideFileDetail($event);" ng-model="fileRemark"></div></div>');
        $(n).css({
            left: r,
            top: -100,
            height: 100,
            width: 200,
            position: "absolute"
        });
        switch (p.FileType) {
        case 1:
            if (p == undefined || p.FileName == "") {
                k.currentFileDetail.ClassName = "icon-picture"
            } else {
                k.currentFileDetail.imgSrc = FileURL + "Image/" + p.FileName
            }
            break;
        case 2:
            k.currentFileDetail.ClassName = "icon-film";
            break;
        case 3:
            k.currentFileDetail.ClassName = "icon-file-text-alt";
            break;
        default:
            break
        }
        if ($(s.target).next("div.file_show").length) {
            $($(s.target).next("div.file_show")[0]).find("input.file_remark");
            $($(s.target).next("div.file_show")[0]).fadeIn();
            $($($(s.target).next("div.file_show")[0]).find("input.file_remark")).focus()
        } else {
            var q = e(n)(k);
            angular.element($(s.target)).after(q);
            $(q).fadeIn();
            $($(q).find("input.file_remark")).focus()
        }
    }
    ;
    k.hideFileDetail = function(m) {
        if (k.currentFileDetail.Description != k.fileRemark && k.fileRemark != "") {
            k.currentFileDetail.Description = k.fileRemark;
            b.upudateFileInfo(k, k.currentFileDetail)
        }
        $($($(m.target).parent()[0]).parent()[0]).fadeOut()
    }
    ;
    k.addFiles = function(p) {
        if (p != undefined && p != "" && p.length > 0) {
            for (var m = 0; m < p.length; m++) {
                var o = 0;
                var n = "";
                if (p[m].name.indexOf(".jpg") > -1 || p[m].name.indexOf(".png") > -1 || p[m].name.indexOf(".gif") > -1 || p[m].name.indexOf(".jpeg") > -1 || p[m].name.indexOf(".svg") > -1) {
                    o = 1;
                    n = "icon-picture";
                    k.newFiles.push({
                        type: 1,
                        file: p[m]
                    })
                } else {
                    if (p[m].name.indexOf(".ppt") > -1 || p[m].name.indexOf(".pdf") > -1 || p[m].name.indexOf(".doc") > -1 || p[m].name.indexOf(".docx") > -1 || p[m].name.indexOf(".xls") > -1 || p[m].name.indexOf(".xlsx") > -1 || p[m].name.indexOf(".txt") > -1) {
                        o = 3;
                        n = "icon-file-text-alt";
                        k.newFiles.push({
                            type: 3,
                            file: p[m]
                        })
                    } else {
                        if (p[m].name.indexOf(".rm") > -1 || p[m].name.indexOf(".rmvb") > -1 || p[m].name.indexOf(".avi") > -1 || p[m].name.indexOf(".mp4") > -1 || p[m].name.indexOf(".3gp") > -1) {
                            o = 2;
                            n = "icon-film";
                            k.newFiles.push({
                                type: 2,
                                file: p[m]
                            })
                        } else {
                            b.alert("添加失败，目前只支持图片和视频文件的上传，请重新选择文件！");
                            return
                        }
                    }
                }
                k.currentMedicalRecord.TreatFileList = (k.currentMedicalRecord.TreatFileList == null ? [] : k.currentMedicalRecord.TreatFileList);
                k.currentMedicalRecord.TreatFileList.push({
                    ID: 0,
                    TreatFileID: "",
                    TreatID: k.currentMedicalRecord.TreatID,
                    PatientID: k.currentMedicalRecord.PatientID,
                    ClassName: n,
                    SourceName: p[m].name,
                    Description: "",
                    FileType: o,
                    FileName: p[m].name,
                    File: p[m],
                    State: 0,
                    CreateTime: "",
                    TenantID: k.currentMedicalRecord.TenantID,
                    isShowUpload: true
                })
            }
        }
    }
    ;
    k.uploadFiles = function() {
        if (k.newFiles.length > 0) {
            b.uploadFiles(k, 1)
        } else {
            b.alert("对不起，没有新的文件要上传！")
        }
    }
    ;
    k.drawTooth = function(o, m, n) {
        $("#constant_select_reverse").removeAttr("checked");
        $("#constant_select_all").removeAttr("checked");
        l.drawTooth(k, o);
        k.isOld = n;
        k.currentItem = m
    }
    ;
    k.closeTooth = function() {
        $("#tooth").fadeOut()
    }
    ;
    k.clickTooth = function(n, m) {
        l.clickTooth(n.target, m, k)
    }
    ;
    k.saveSelectedTeeth = function() {
        l.saveSelectedTeeth(k)
    }
    ;
    k.switchTooth = function(m) {
        l.switchTooth(m, k)
    }
    ;
    k.quickSelect = function(q, n) {
        var s = "";
        if (n == 1) {
            if (q == 1) {
                $("#constant_select_reverse").removeAttr("checked")
            } else {
                $("#constant_select_all").removeAttr("checked")
            }
            s = $("#permanent_teeth span.tooth_span")
        } else {
            if (q == 1) {
                $("#baby_select_reverse").removeAttr("checked")
            } else {
                $("#baby_select_all").removeAttr("checked")
            }
            s = $("#baby_teeth span.tooth_span")
        }
        if (s && s.length > 0) {
            var r = (q == 1 ? true : false);
            if (q == 1) {
                if (n == 1) {
                    r = $("#constant_select_all").attr("checked") ? true : false
                } else {
                    r = $("#baby_select_all").attr("checked") ? true : false
                }
            }
            for (var o = 0; o < s.length; o++) {
                var p = s[o];
                var m = $(p).attr("data-bind");
                l.clickTooth(p, m, k, r)
            }
        }
    }
    ;
    k.deleteItem = function(n, m) {
        l.deleteItem(n, m)
    }
    ;
    k.addItem = function(m, o, n) {
        l.addItem(m, o, k, n)
    }
    ;
    k.chooseTemplate = function() {
        l.chooseTemplate()
    }
    ;
    k.saveMedicalRecord = function() {
        if (!$.formValidator.pageIsValid("6")) {
            return
        }
        b.confirm("是否对患者【" + k.currentPatient.Appoint.PatientName + "】，推送医嘱信息？", function() {
            k.isSendAdviceSMS = true;
            if (!k.currentMedicalRecord.Advice) {
                b.alert("请填写医嘱信息！");
                return
            }
            var m = l.getMedicalDetail();
            k.currentPatient.Appoint.NurseName = k.currentMedicalRecord.NurseName;
            b.saveMedicalRecord(k, m)
        }, function() {
            k.isSendAdviceSMS = false;
            var m = l.getMedicalDetail();
            k.currentPatient.Appoint.NurseName = k.currentMedicalRecord.NurseName;
            b.saveMedicalRecord(k, m)
        })
    }
    ;
    k.editMedicalRecord = function() {
        if (!b.isWithOperatePermission("WorkPlatform_editMedical")) {
            b.alert("对不起，您没有权限，请联系管理员！");
            return
        }
        k.agreementList = [{
            Name: "牙体牙髓病治疗知情同意书",
            FileName: "agreement_1.xml",
            DocName: "agreement_1.doc"
        }, {
            Name: "口腔外科拔牙手术知情同意书",
            FileName: "agreement_2.xml",
            DocName: "agreement_2.doc"
        }, {
            Name: "固定义齿修复知情同意书",
            FileName: "agreement_3.xml",
            DocName: "agreement_3.doc"
        }, {
            Name: "活动/全口义齿修复知情同意书",
            FileName: "agreement_4.xml",
            DocName: "agreement_4.doc"
        }, {
            Name: "牙体牙髓病治疗须知",
            FileName: "agreement_5.xml",
            DocName: "agreement_5.doc"
        }, {
            Name: "口腔外科拔牙手术治疗须知",
            FileName: "agreement_6.xml",
            DocName: "agreement_6.doc"
        }, {
            Name: "种植治疗同意书",
            FileName: "agreement_7.xml",
            DocName: "agreement_7.doc"
        }];
        k.newFiles = [];
        k.selectedAdviceTemplate = {};
        k.adviceTemplateContent = {};
        if (k.currentPatient == null || k.currentPatient.Appoint.Status == 1 || k.currentPatient.Appoint.Status == 2 || k.currentPatient.Appoint.Status == 5) {
            return ""
        } else {
            b.getMedicalRecord(k);
            if (!k.CatalogItems) {
                b.getCatalogItems(k, 2)
            }
            var m = {
                TenantID: k.currentPatient.Appoint.TenantID,
                SubCategoryID: k.currentPatient.Appoint.SubCategoryID
            };
            b.getMedicalAdvices(m, k)
        }
    }
    ;
    k.getAdviceContent = function() {
        if (k.currentPatient && k.selectedAdviceTemplate && k.selectedAdviceTemplate.Name) {
            var m = {
                TenantID: k.currentPatient.Appoint.TenantID,
                AdviceItemID: k.selectedAdviceTemplate.AdviceItemID
            };
            b.getAdviceContent(m, k)
        } else {
            k.currentMedicalRecord.Advice = ""
        }
    }
    ;
    k.changePatientLevel = function() {
        k.searchPatientLevels = [];
        if (k.currentPatient.Level.Name == "") {
            return
        }
        for (var n = 0; n < k.PatientLevelList.length; n++) {
            var m = k.PatientLevelList[n];
            if (m.Name.indexOf(k.currentPatient.Level.Name.toUpperCase()) > -1) {
                k.searchPatientLevels.push(m)
            }
        }
    }
    ;
    k.searchTemplateClick = function(m) {
        k.currentPatient.Level.Name = m.Name;
        k.currentPatient.Level.Color = m.Color;
        k.searchPatientLevels = []
    }
    ;
    k.colorButtonClick = function() {
        $("#colorInDetail").click()
    }
    ;
    k.print = function(n, m) {
        if (m) {
            if (k.selectedAgreement) {
                $.print("#" + n)
            } else {
                PatientDetailService.alert("请先选择协议书！")
            }
        }
        if (!m && n) {
            $.print("#" + n)
        }
    }
    ;
    k.checkIsOwner = function(m) {
        if (m.Appoint.MainID) {
            return "（副）"
        } else {
            return "（主）"
        }
    }
    ;
    k.printChargeOrder = function() {
        k.chargeList = [];
        k.chargeTotal = 0;
        if (k.ChargePattern) {
            for (var m = 0; m < k.MainCategoryList.length; m++) {
                if (k.MainCategoryList[m].Price) {
                    k.chargeList.push({
                        Price: k.MainCategoryList[m].Price,
                        Remark: k.MainCategoryList[m].Remark,
                        CostItem: k.MainCategoryList[m].Name,
                        Information: k.MainCategoryList[m].Price.indexOf("-") > -1 ? "退费：￥" + Math.abs(parseFloat(k.MainCategoryList[m].Price)) : "收费：￥" + k.MainCategoryList[m].Price
                    });
                    k.chargeTotal = k.chargeTotal + parseFloat(k.MainCategoryList[m].Price)
                }
            }
        } else {
            for (var m = 0; m < k.detailItemsList.length; m++) {
                if (k.detailItemsList[m].sum) {
                    k.chargeList.push({
                        Price: k.detailItemsList[m].sum,
                        Remark: k.detailItemsList[m].Remark,
                        CostItem: k.detailItemsList[m].Item.Name,
                        Information: k.detailItemsList[m].sum.indexOf("-") > -1 ? "退费：￥" + Math.abs(parseFloat(k.detailItemsList[m].sum)) : "收费：￥" + k.detailItemsList[m].sum
                    });
                    k.chargeTotal = k.chargeTotal + parseFloat(k.detailItemsList[m].sum)
                }
            }
        }
        c(function() {
            $.print("#charge_order")
        }, 1000)
    }
    ;
    k.goToAppointManagement = function() {
        if (k.currentPatient.Appoint.Status == 1 || k.currentPatient.Appoint.Status == 5) {
            CommonFun.saveDataToSession("CurrentAppoint", k.currentPatient);
            if (b.isHasModulePermission()) {
                window.location.href = "DCBookMG.html"
            }
        }
    }
    ;
    var d = function(n, o, m, p) {
        if (n) {
            if (!CommonFun.checkFormat(n, DataTypeEnum.DateFormat)) {
                j("", "日期格式不对，请重新输入！", m, "bottomLeft");
                return false
            } else {
                if (o) {
                    if (!CommonFun.checkFormat(o, DataTypeEnum.DateFormat)) {
                        j("", "日期格式不对，请重新输入！", p, "bottomLeft");
                        return false
                    } else {
                        if (n > o) {
                            j("", "起始日期不能大于截止日期！！", m, "bottomLeft");
                            return false
                        } else {
                            return true
                        }
                    }
                } else {
                    j("", "请输入截止日期！", p, "bottomLeft");
                    return false
                }
            }
        }
        if (o) {
            if (!CommonFun.checkFormat(o, DataTypeEnum.DateFormat)) {
                j("", "日期格式不对，请重新输入！", p, "bottomLeft");
                return false
            } else {
                if (n) {
                    if (!CommonFun.checkFormat(n, DataTypeEnum.DateFormat)) {
                        j("", "日期格式不对，请重新输入！", m, "bottomLeft");
                        return false
                    } else {
                        if (n > o) {
                            j("", "起始日期不能大于截止日期！！", m, "bottomLeft");
                            return false
                        } else {
                            return true
                        }
                    }
                } else {
                    j("", "请输入起始日期！", m, "bottomLeft");
                    return false
                }
            }
        }
        if (!o && !n) {
            return true
        }
    };
    k.getBills = function() {
        k.isApp = false;
        k.isVis = false;
        k.isBill = true;
        b.updateResourceModule(8);
        $("#loading_div").modal("show");
        k.searchData.bill.TenantID = k.currentUser.Body.Tenant.TenantID;
        if (k.searchData.bill.Condition) {
            if (CommonFun.checkFormat(k.searchData.bill.Condition, DataTypeEnum.Number)) {
                k.searchData.bill.SearchType = 2
            } else {
                k.searchData.bill.SearchType = 1
            }
        }
        if (d(k.searchData.bill.BeginDate, k.searchData.bill.EndDate, "start_date", "end_date")) {
            b.getBillList(k.searchData.bill, k)
        }
    }
    ;
    k.showBillDetail = function(o, m) {
        k.isLoading = true;
        $("#cashier tr").removeClass("selected");
        if (!$($("#cashier tr")[m + 1]).attr("class").indexOf("selected") >= 0) {
            $($("#cashier tr")[m + 1]).addClass("selected")
        }
        var n = {
            BillNo: o.BillNo
        };
        b.getBillDetailByNo(n, k)
    }
    ;
    k.convertToDateTime = function(m) {
        return new Date(m)
    }
    ;
    k.billPay = function() {
        if (!b.isWithOperatePermission("Bill_pay")) {
            b.alert("对不起，您没有权限，请联系管理员！");
            return
        }
        $("#pay").modal("show");
        k.payAmount = 0;
        k.accountPayAmount = 0;
        k.payBalance = 0;
        k.giveChange = 0;
        k.isPayAble = true;
        k.payRequest.PaymentType = 1;
        k.accountBalance = 0;
        if (k.currentBillDetail.Account && k.currentBillDetail.Account.State == 0) {
            k.accountBalance = k.currentBillDetail.Account.Amount
        }
        k.ChargeTypeList = [{
            Type: "1",
            Name: "现金"
        }, {
            Type: "2",
            Name: "银行卡"
        }, {
            Type: "3",
            Name: "微信"
        }, {
            Type: "4",
            Name: "支付宝"
        }, {
            Type: "5",
            Name: "社保卡"
        }, {
            Type: "6",
            Name: "会员卡"
        }, {
            Type: "8",
            Name: "其他"
        }]
    }
    ;
    k.closeMedicacl = function() {
        $("#tooth").css("display", "none");
        $("#medical_record").modal("hide");
        l.closeAgreement(k)
    }
    ;
    k.billRefund = function() {
        if (!b.isWithOperatePermission("Bill_refund")) {
            b.alert("对不起，您没有权限，请联系管理员！");
            return
        }
        k.RefundTypeList = [{
            Type: "1",
            Name: "现金"
        }, {
            Type: "3",
            Name: "微信"
        }, {
            Type: "4",
            Name: "支付宝"
        }, {
            Type: "8",
            Name: "其他"
        }];
        $("#bill_refund").modal("show");
        k.refundAmount = 0;
        k.payBalance = 0;
        k.isPayAble = true
    }
    ;
    k.savePay = function(n) {
        if (k.isPayAble) {
            k.isPayAble = false;
            if (n == 1) {
                if (!k.payAmount && !k.accountPayAmount) {
                    b.alert("请输入账单缴费金额！");
                    k.isPayAble = true;
                    return
                }
                if (k.payAmount) {
                    if (!CommonFun.checkFormat(k.payAmount, DataTypeEnum.Fee)) {
                        j("", "缴费金额格式不对，请重新输入！", "pay_amount");
                        k.isPayAble = true;
                        return
                    }
                    k.payRequest.Amount = parseFloat(k.payAmount) - parseFloat((!k.giveChange ? 0 : k.giveChange))
                }
                if (k.accountPayAmount) {
                    if (parseFloat(k.accountBalance) < 0) {
                        j("", "对不起，账户余额不足！", "account_pay_amount");
                        k.isPayAble = true;
                        return
                    }
                    if (!CommonFun.checkFormat(k.accountPayAmount, DataTypeEnum.Fee)) {
                        j("", "缴费金额格式不对，请重新输入！", "account_pay_amount");
                        k.isPayAble = true;
                        return
                    }
                    k.payRequest.Balance = k.accountPayAmount
                }
                var p = "";
                if (k.payBalance > 0) {
                    p = "该账单金额结算存在欠费，欠费金额为【" + parseFloat(k.payBalance).toFixed(2) + "】元，是否继续？"
                }
                if (k.giveChange > 0) {
                    p = "该账单金额结算多收取了费用，应找零金额为【" + k.giveChange + "】，请确认是否已经找零？"
                }
                if (p) {
                    b.confirm(p, function() {
                        var r = !k.accountPayAmount ? 0 : k.accountPayAmount;
                        var q = !k.payAmount ? 0 : k.payAmount;
                        k.payRequest.Change = k.giveChange;
                        k.payRequest.PatientPayment = parseFloat(q) + parseFloat(r);
                        b.savePay(k.payRequest, k)
                    }, function() {
                        k.isPayAble = true
                    })
                } else {
                    var o = !k.accountPayAmount ? 0 : k.accountPayAmount;
                    var m = !k.payAmount ? 0 : k.payAmount;
                    k.payRequest.Change = k.giveChange;
                    k.payRequest.PatientPayment = parseFloat(m) + parseFloat(o);
                    b.savePay(k.payRequest, k)
                }
            } else {
                if (!CommonFun.checkFormat(k.refundAmount, DataTypeEnum.Fee)) {
                    j("", "退费金额格式不对，请重新输入！", "refund_amount");
                    k.isPayAble = true;
                    return
                }
                if (k.refundAmount > k.currentBillDetail.Bill.DueCharge) {
                    j("", "对不起，退费金额不能大于账单应收金额！", "refund_amount");
                    k.isPayAble = true;
                    return
                }
                var o = !k.accountPayAmount ? 0 : k.accountPayAmount;
                var m = !k.payAmount ? 0 : k.payAmount;
                k.payRequest.PaymentType = 2;
                k.payRequest.Amount = k.refundAmount;
                k.payRequest.Change = k.giveChange;
                k.payRequest.PatientPayment = parseFloat(m) + parseFloat(o);
                b.billRefund(k.payRequest, k)
            }
        }
    }
    ;
    k.canBill = function() {
        if (!b.isWithOperatePermission("Bill_cancelBill")) {
            b.alert("对不起，您没有权限，请联系管理员！");
            return
        }
        b.confirm("您正在作废账单，患者姓名：【" + k.currentBillDetail.Patient.Name + "】,账单号：【" + k.currentBillDetail.Bill.BillNoStr + "】，账单金额：【" + k.currentBillDetail.Bill.DueCharge + "】元；是否继续？", function() {
            var m = {
                BillNo: k.currentBillDetail.Bill.BillNo,
                PayeeID: !k.currentLogin.User ? k.currentLogin.Tenant.TenantID : k.currentLogin.User.UserID,
                PayeeName: !k.currentLogin.User ? "院长" : k.currentLogin.User.UserName
            };
            b.cancelBill(m, k)
        })
    }
    ;
    k.finishBill = function() {
        if (!b.isWithOperatePermission("Bill_pay")) {
            b.alert("对不起，您没有权限，请联系管理员！");
            return
        }
        b.confirm("您正在结束账单，患者姓名：【" + k.currentBillDetail.Patient.Name + "】,账单号：【" + k.currentBillDetail.Bill.BillNoStr + "】，账单金额：【" + k.currentBillDetail.Bill.DueCharge + "】元；是否继续？", function() {
            var m = {
                BillNo: k.currentBillDetail.Bill.BillNo
            };
            b.finishedBill(m, k)
        })
    }
    ;
    k.calculateBalance = function() {
        var m = parseFloat(k.currentBillDetail.Bill.Arrears);
        if (k.currentBillDetail.Account) {
            if (CommonFun.checkFormat(k.accountPayAmount, DataTypeEnum.Fee)) {
                m = m - parseFloat(k.accountPayAmount);
                k.accountBalance = parseFloat(k.currentBillDetail.Account.Amount) - parseFloat(k.accountPayAmount)
            } else {
                k.accountBalance = (k.currentBillDetail.Account && !k.currentBillDetail.Account.State) ? k.currentBillDetail.Account.Amount : 0
            }
        } else {
            if (k.accountPayAmount) {
                j("", "对不起，没有开通账户，无法使用！", "account_pay_amount");
                k.accountPayAmount = 0;
                return
            }
        }
        if (CommonFun.checkFormat(k.payAmount, DataTypeEnum.Fee)) {
            m = m - parseFloat(k.payAmount)
        }
        k.payBalance = m;
        if (m <= 0) {
            k.giveChange = Math.abs(m);
            k.payBalance = 0
        } else {
            k.giveChange = 0
        }
    }
    ;
    k.resetAccountUpdate = function() {
        k.recharge.RechargeAmount = 0;
        k.recharge.RechargeType = "8";
        k.recharge.Remark = "";
        k.transfer.TransferAmount = 0;
        k.transfer.Remark = "";
        k.transfer.SelectedPatientID = "";
        k.refund.RefundAmount = 0;
        k.refund.Remark = ""
    }
    ;
    k.StateTexts = function(m) {
        if (!m) {
            return "未绑定"
        } else {
            return "已绑定"
        }
    }
    ;
    k.convertInsuranceType = function(m) {
        switch (m) {
        case "0":
            return "其他";
        case "1":
            return "人寿保险";
        case "2":
            return "健康保险";
        case "3":
            return "人身意外伤害保险";
        default:
            return ""
        }
    }
    ;
    k.ChargeTypeList = [{
        Type: "1",
        Name: "现金"
    }, {
        Type: "2",
        Name: "银行卡"
    }, {
        Type: "3",
        Name: "微信"
    }, {
        Type: "4",
        Name: "支付宝"
    }, {
        Type: "5",
        Name: "社保卡"
    }, {
        Type: "6",
        Name: "会员卡"
    }, {
        Type: "8",
        Name: "其他"
    }];
    k.amountRecharge = function() {
        if (k.currentPatient) {
            $("#account_manage").modal("show");
            $("#language").val("");
            k.activePanel("recharge");
            k.recharge = {
                RechargeAmount: 0,
                RechargeType: "8",
                Remark: ""
            };
            k.transfer = {
                TransferAmount: 0,
                Remark: "",
                SelectedPatientID: ""
            };
            k.refund = {
                RefundAmount: 0,
                Remark: ""
            };
            var m = {
                TenantID: k.currentPatient.PatientInfo.TenantID,
                PatientID: k.currentPatient.PatientInfo.PatientID
            };
            k.accountPipeLineList = [];
            b.getAccountPipeline(m, k)
        } else {
            b.alert("请先选择患者！")
        }
    }
    ;
    k.activePanel = function(m) {
        $("#recharge").removeClass("cus_active");
        $("#transfer").removeClass("cus_active");
        $("#refund").removeClass("cus_active");
        $("#recharge_tab").removeClass("account_tab_active");
        $("#transfer_tab").removeClass("account_tab_active");
        $("#refund_tab").removeClass("account_tab_active");
        switch (m) {
        case "recharge":
            $("#recharge").removeClass("cus_disabled");
            $("#recharge").addClass("cus_active");
            $("#recharge_tab").addClass("account_tab_active");
            if ($("#transfer").prop("class").indexOf("cus_disabled") < 0) {
                $("#transfer").addClass("cus_disabled")
            }
            if ($("#refund").prop("class").indexOf("cus_disabled") < 0) {
                $("#refund").addClass("cus_disabled")
            }
            break;
        case "transfer":
            $("#transfer").removeClass("cus_disabled");
            $("#transfer").addClass("cus_active");
            $("#transfer_tab").addClass("account_tab_active");
            if ($("#recharge").prop("class").indexOf("cus_disabled") < 0) {
                $("#recharge").addClass("cus_disabled")
            }
            if ($("#refund").prop("class").indexOf("cus_disabled") < 0) {
                $("#refund").addClass("cus_disabled")
            }
            break;
        case "refund":
            $("#refund").removeClass("cus_disabled");
            $("#refund").addClass("cus_active");
            $("#refund_tab").addClass("account_tab_active");
            if ($("#recharge").prop("class").indexOf("cus_disabled") < 0) {
                $("#recharge").addClass("cus_disabled")
            }
            if ($("#transfer").prop("class").indexOf("cus_disabled") < 0) {
                $("#transfer").addClass("cus_disabled")
            }
            break;
        default:
            break
        }
    }
    ;
    k.updateAccount = function(n) {
        if (k.isCompleted) {
            var m = "";
            var p = "";
            if (k.currentUser.Body.UserType == 1) {
                m = k.currentUser.Body.Tenant.TenantID;
                p = "院长"
            } else {
                m = k.currentUser.Body.User.UserID;
                p = k.currentUser.Body.User.UserName
            }
            var o = {
                PatientID: k.currentPatient.PatientInfo.PatientID,
                TenantID: k.currentPatient.PatientInfo.TenantID,
                Amount: 0,
                AccountOperateType: n,
                PayeeID: m,
                PayeeName: p,
                PaymentCategory: "",
                Description: "",
                ToPatientID: ""
            };
            switch (n) {
            case 1:
                if (!b.isWithOperatePermission("WorkPlatform_accountRecharge")) {
                    b.alert("对不起，您没有权限，请联系管理员！");
                    return
                }
                if ($.formValidator.pageIsValid("6")) {
                    if (k.recharge.RechargeAmount <= 0) {
                        j("", "对不起，充值金额不能为0！", "recharge_amount");
                        return
                    }
                    k.currentAccountType = n;
                    k.isCompleted = false;
                    o.Amount = k.recharge.RechargeAmount;
                    o.PaymentCategory = k.recharge.RechargeType;
                    o.Description = k.recharge.Remark;
                    b.accountRecharge(o, k)
                }
                break;
            case 2:
                if (!b.isWithOperatePermission("WorkPlatform_accountRefund")) {
                    b.alert("对不起，您没有权限，请联系管理员！");
                    return
                }
                if ($.formValidator.pageIsValid("6")) {
                    if (k.refund.RefundAmount <= 0) {
                        j("", "对不起，退款金额不能为0！", "refund_amounts");
                        return
                    }
                    if (k.account.Amount < k.refund.RefundAmount) {
                        j("", "对不起，账户余额不足，无法退款！", "refund_amounts");
                        return
                    }
                    k.currentAccountType = n;
                    k.isCompleted = false;
                    o.Amount = k.refund.RefundAmount;
                    o.Description = k.refund.Remark;
                    o.PaymentCategory = 0;
                    b.accountRefund(o, k)
                }
                break;
            case 3:
                if (!b.isWithOperatePermission("WorkPlatform_accountTransfer")) {
                    b.alert("对不起，您没有权限，请联系管理员！");
                    return
                }
                if ($.formValidator.pageIsValid("6")) {
                    if (k.transfer.RefundAmount <= 0) {
                        j("", "对不起，转账金额不能为0！", "transfer_amount");
                        return
                    }
                    if (k.account.Amount < k.transfer.TransferAmount) {
                        j("", "对不起，账户余额不足，无法转账！", "transfer_amount");
                        return
                    }
                    k.currentAccountType = n;
                    k.isCompleted = false;
                    o.Amount = k.transfer.TransferAmount;
                    o.Description = k.transfer.Remark;
                    o.ToPatientID = $("#language-id").val();
                    o.PaymentCategory = 0;
                    b.accountTransfer(o, k)
                }
                break;
            default:
                break
            }
        } else {
            switch (k.currentAccountType) {
            case 1:
                b.alert("充值正在进行，请耐心等待！");
                break;
            case 2:
                b.alert("转账正在进行，请耐心等待！");
                break;
            case 3:
                b.alert("退款正在进行，请耐心等待！");
                break;
            default:
                break
            }
            return false
        }
    }
    ;
    k.convertOperator = function(m) {
        switch (m) {
        case 1:
            return "充值";
        case 2:
            return "退款";
        case 3:
            return "转出";
        case 4:
            return "转入";
        default:
            return "无"
        }
    }
    ;
    k.convertChargeType = function(m) {
        if (m) {
            switch (m) {
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
                return "无"
            }
        } else {
            return "无"
        }
    }
    ;
    k.getQRCode = function() {
        if (!k.currentPatient) {
            b.alert("请先选择患者！");
            return
        }
        var m = {
            PatientID: k.currentPatient.PatientInfo.PatientID
        };
        k.operateType = 0;
        b.getQRCodeInfo(m, k)
    }
    ;
    k.getBillQRCode = function() {
        if (!k.currentBillDetail) {
            b.alert("请先选择患者！");
            return
        }
        var m = {
            PatientID: k.currentBillDetail.Bill.PatientID
        };
        k.operateType = 1;
        b.getQRCodeInfo(m, k)
    }
    ;
    k.previewAgreement = function() {
        l.previewAgreement(k)
    }
    ;
    k.closeAgreement = function() {
        l.closeAgreement(k)
    }
    ;
    k.downloadAgreement = function() {
        if (k.selectedAgreement) {
            window.location.href = FileURL + "Agreement/" + k.selectedAgreement.DocName
        } else {
            PatientDetailService.alert("请先选择协议书！")
        }
    }
    ;
    k.recordCurrentItem = function(m, n, o) {
        k.currentDom = {
            DomObj: angular.element(m.target),
            ContentType: n,
            IsOld: o
        }
    }
    ;
    k.initialize()
}
]);
angular.bootstrap($("#main-content"), ["PlatformModule"]);
