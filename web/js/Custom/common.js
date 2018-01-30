$(document).click(function(a) {
    a = window.event || a;
    obj = $(a.srcElement || a.target);
    if ($(obj).is("#post_card *")) {} else {
        if (!($(obj).is(".icon_user_custom[name='currentUser']"))) {
            $("#post_card").slideUp("slow")
        }
    }
    if ($(obj).is("#show_current_patient *") || $(obj).is("a.fc-time-grid-event *")) {} else {
        $("#show_current_patient").slideUp("slow")
    }
});
var ResultCodeEnum = (function() {
    var a = {
        Success: 0,
        NoLogin: 1,
        NoPermit: 2,
        NoData: 3,
        Exist: 4,
        ProgramError: 5,
        CatchError: 6,
        ParamError: 7,
        InvokeError: 8,
        NotExist: 9,
        OperateError: 10,
        SMSError: 11,
        VerifyCodeError: 12,
        InvitCodeError: 13,
        RemoteLogin: 14,
        InvitCodeExpire: 15,
        NoDelete: 16,
        NoBind: 17,
        MobileExist: 18,
        UserExist: 19,
        UserNotExist: 20,
        PatientNotExist: 21,
        AppointNotExist: 22,
        UserTypeError: 23,
        LoginError: 24,
        RoleExist: 25,
        RoleNotExist: 26,
        VisitNotExist: 27,
        TenantExist: 28,
        TenantNotExist: 29,
        LogoutError: 30,
        TenantFreeze: 31,
        AmountError: 36,
        FromAccountError: 37,
        ToAccountError: 38,
        AccountError: 39,
        BalanceError: 40,
        AccountOperateError: 41,
        BillOperateError: 42,
        BillRefundError: 43,
        SystemBusying: 46
    };
    return a
})();
var ResultMessageEnum = (function() {
    var a = {
        Success: "成功",
        NoLogin: "未登录",
        NoPermit: "当前角色没有权限",
        NoData: "没有数据",
        Exist: "已存在",
        ProgramError: "执行错误",
        CatchError: "捕获错误",
        ParamError: "参数错误",
        InvokeError: "内部调用错误",
        NotExist: "不存在",
        OperateError: "操作符错误",
        SMSError: "短信错误",
        VerifyCodeError: "验证码错误",
        InvitCodeError: "邀请码错误",
        RemoteLogin: "异地登录",
        InvitCodeExpire: "邀请码过期",
        NoDelete: "不能删除",
        NoBind: "未绑定",
        MobileExist: "手机号已存在",
        UserExist: "用户已存在",
        UserNotExist: "用户不存在",
        PatientNotExist: "患者不存在",
        AppointNotExist: "预约不存在",
        UserTypeError: "用户类型错误",
        LoginError: "登录错误,用户名不存在或密码错误",
        RoleExist: "角色已存在",
        RoleNotExist: "角色不存在",
        VisitNotExist: "回访不存在",
        TenantExist: "诊所已存在",
        TenantNotExist: "诊所不存在",
        LogoutError: "退出失败",
        TenantFreeze: "诊所冻结",
        AmountError: "金额错误",
        FromAccountError: "转出账户错误",
        ToAccountError: "转入账户错误",
        AccountError: "账户错误",
        BalanceError: "余额不足",
        AccountOperateError: "账户操作错误",
        BillOperateError: "账单操作错误",
        BillRefundError: "账单退费金额错误",
        SystemBusying: "系统繁忙"
    };
    return a
})();
function GetErrormsg(b, a) {
    switch (b) {
    case ResultCodeEnum.Success:
        return ResultMessageEnum.Success;
    case ResultCodeEnum.NoLogin:
        return ResultMessageEnum.NoLogin;
    case ResultCodeEnum.NoPermit:
        return ResultMessageEnum.NoPermit;
    case ResultCodeEnum.NoData:
        return ResultMessageEnum.NoData;
    case ResultCodeEnum.Exist:
        return ResultMessageEnum.Exist;
    case ResultCodeEnum.ProgramError:
        return ResultMessageEnum.ProgramError;
    case ResultCodeEnum.CatchError:
        return ResultMessageEnum.CatchError;
    case ResultCodeEnum.ParamError:
        return ResultMessageEnum.ParamError;
    case ResultCodeEnum.InvokeError:
        return ResultMessageEnum.InvokeError;
    case ResultCodeEnum.NotExist:
        return ResultMessageEnum.NotExist;
    case ResultCodeEnum.OperateError:
        return ResultMessageEnum.OperateError;
    case ResultCodeEnum.SMSError:
        return ResultMessageEnum.SMSError;
    case ResultCodeEnum.VerifyCodeError:
        return ResultMessageEnum.VerifyCodeError;
    case ResultCodeEnum.InvitCodeError:
        return ResultMessageEnum.InvitCodeError;
    case ResultCodeEnum.RemoteLogin:
        return ResultMessageEnum.RemoteLogin;
    case ResultCodeEnum.InvitCodeExpire:
        return ResultMessageEnum.InvitCodeExpire;
    case ResultCodeEnum.NoDelete:
        return ResultMessageEnum.NoDelete;
    case ResultCodeEnum.NoBind:
        return ResultMessageEnum.NoBind;
    case ResultCodeEnum.MobileExist:
        return ResultMessageEnum.MobileExist;
    case ResultCodeEnum.UserExist:
        return ResultMessageEnum.UserExist;
    case ResultCodeEnum.UserNotExist:
        return ResultMessageEnum.UserNotExist;
    case ResultCodeEnum.PatientNotExist:
        return ResultMessageEnum.PatientNotExist;
    case ResultCodeEnum.AppointNotExist:
        return ResultMessageEnum.AppointNotExist;
    case ResultCodeEnum.UserTypeError:
        return ResultMessageEnum.UserTypeError;
    case ResultCodeEnum.LoginError:
        return ResultMessageEnum.LoginError;
    case ResultCodeEnum.RoleExist:
        return ResultMessageEnum.RoleExist;
    case ResultCodeEnum.RoleNotExist:
        return ResultMessageEnum.RoleNotExist;
    case ResultCodeEnum.VisitNotExist:
        return ResultMessageEnum.VisitNotExist;
    case ResultCodeEnum.TenantExist:
        return ResultMessageEnum.TenantExist;
    case ResultCodeEnum.TenantNotExist:
        return ResultMessageEnum.TenantNotExist;
    case ResultCodeEnum.LogoutError:
        return ResultMessageEnum.LogoutError;
    case ResultCodeEnum.TenantFreeze:
        return ResultMessageEnum.TenantFreeze;
    case ResultCodeEnum.AmountError:
        return ResultMessageEnum.AmountError;
    case ResultCodeEnum.FromAccountError:
        return ResultMessageEnum.FromAccountError;
    case ResultCodeEnum.ToAccountError:
        return ResultMessageEnum.ToAccountError;
    case ResultCodeEnum.AccountError:
        return ResultMessageEnum.AccountError;
    case ResultCodeEnum.BalanceError:
        return ResultMessageEnum.BalanceError;
    case ResultCodeEnum.AccountOperateError:
        return ResultMessageEnum.AccountOperateError;
    case ResultCodeEnum.BillOperateError:
        return ResultMessageEnum.BillOperateError;
    case ResultCodeEnum.BillRefundError:
        return ResultMessageEnum.BillRefundError;
    case ResultCodeEnum.SystemBusying:
        return ResultMessageEnum.SystemBusying
    }
}
var MenuEnum = (function() {
    var a = {
        PlatformMG: 1,
        PatientMG: 2,
        BookMG: 3,
        ClinicMG: 4,
        DataStatic: 5,
        SupplyPlatform: 6,
        SystemSet: 7,
        Person: 8,
        Logo: 9
    };
    return a
})();
var DataTypeEnum = (function() {
    var a = {
        Required: 0,
        Contract: 1,
        Email: 2,
        Identify: 3,
        Number: 4,
        PhoneMobile: 5,
        PostCode: 6,
        DateFormat: 7,
        Fee: 8,
        Length: 9,
        FeeWithNegative: 10,
        Integer: 11
    };
    return a
})();
var sessionStorage = window.sessionStorage;
Date.prototype.Format = function(a) {
    var c = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    if (/(y+)/.test(a)) {
        a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var b in c) {
        if (new RegExp("(" + b + ")").test(a)) {
            a = a.replace(RegExp.$1, (RegExp.$1.length == 1) ? (c[b]) : (("00" + c[b]).substr(("" + c[b]).length)))
        }
    }
    return a
}
;
var CommonFun = {
    checkFormat: function(d, c, a) {
        if (c == DataTypeEnum.Length) {
            return d.length <= a
        }
        if (d == undefined || d == "" || d == null) {
            return false
        }
        switch (c) {
        case DataTypeEnum.Required:
            return true;
        case DataTypeEnum.Contract:
            var b = /^(\d{3,4}-)?\d{6,8}$/;
            return b.test(d);
        case DataTypeEnum.Email:
            var b = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            return b.test(d);
        case DataTypeEnum.Identify:
            var b = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
            return b.test(d);
        case DataTypeEnum.Number:
            var b = /^[0-9]*[1-9][0-9]*$/;
            return b.test(d);
        case DataTypeEnum.PhoneMobile:
            var b = /^1(3|4|5|7|8)\d{9}$/;
            return b.test(d);
        case DataTypeEnum.PostCode:
            var b = /^\d{6}$/;
            return b.test(d);
        case DataTypeEnum.DateFormat:
            var b = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
            return b.test(d);
        case DataTypeEnum.Fee:
            var b = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
            return b.test(d);
        case DataTypeEnum.FeeWithNegative:
            var b = /^-?\d+\.?\d*$/;
            return b.test(d);
        case DataTypeEnum.Integer:
            var b = /^-?\d+$/;
            return b.test(d);
        default:
            return false;
            break
        }
    },
    saveDataToSession: function(a, c) {
        var b = sessionStorage.getItem(a);
        if (b != null) {
            sessionStorage.removeItem(a)
        }
        if (c != null && c != "" && c != undefined) {
            sessionStorage.setItem(a, JSON.stringify(c))
        }
    },
    deleteDataFromSession: function(a) {
        var b = sessionStorage.getItem(a);
        if (a != null) {
            sessionStorage.removeItem(a)
        }
    },
    getDataFromSession: function(a) {
        var b = sessionStorage.getItem(a);
        if (b != null) {
            b = JSON.parse(b)
        }
        return b
    },
    exportToExcel: function(a) {
        $("#" + a).table2excel({
            exclude: ".noExl",
            name: "Document",
            filename: "PatientList"
        })
    },
    calculateAge: function(e) {
        var b = e.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (b == null) {
            return false
        }
        var c = new Date(b[1],b[3] - 1,b[4]);
        if (c.getFullYear() == b[1] && (c.getMonth() + 1) == b[3] && c.getDate() == b[4]) {
            var a = new Date().getFullYear();
            return ( a - b[1])
        }
        return 0
    },
    bindingDateControl: function(b, a, d, e, i) {
        var c = "2999-01-01";
        var f = "1900-01-01";
        var h = "yyyy-mm-dd";
        var g = "month";
        if (a != undefined && a != "") {
            c = a
        }
        if (d != undefined && d != "") {
            f = d
        }
        if (e) {
            h = h + " hh:ii"
        }
        if (i == undefined) {
            i = "month";
            g = "month"
        } else {
            if (i != "year" && i != "month" && i != "decade") {
                g = "month"
            } else {
                g = i
            }
        }
        $("#" + b).datetimepicker({
            language:  'en',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        })
    }
};
var sessionControl;
var httpModule = angular.module("HttpModule", []);
httpModule.config(["$httpProvider", function(a) {
    a.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8"
}
]);
httpModule.factory("ResourceFactory", [function() {
    var a = {};
    a.operateCode = {
        nothing: 0,
        get: 1,
        update: 2,
        insert: 3,
        remove: 4
    };
    a.statusCode = {
        Success: 0,
        NoLogin: 1,
        NoPermit: 2,
        NoData: 3,
        Exist: 4,
        ProgramError: 5,
        CatchError: 6,
        ParamError: 7
    };
    a.module = 0;
    a.Auths = {
        OperateAuth_addPatient: {
            ModuleID: "M008",
            AuthID: "AU001",
            AuthValue: 4
        },
        OperateAuth_deletePatient: {
            ModuleID: "M008",
            AuthID: "AU002",
            AuthValue: 8
        },
        OperateAuth_lookPatientPhone: {
            ModuleID: "M008",
            AuthID: "AU003",
            AuthValue: 16
        },
        OperateAuth_exportPatient: {
            ModuleID: "M008",
            AuthID: "AU004",
            AuthValue: 32
        },
        OperateAuth_exportDataStatic: {
            ModuleID: "M008",
            AuthID: "AU005",
            AuthValue: 64
        },
        OperateAuth_exportMedical: {
            ModuleID: "M008",
            AuthID: "AU006",
            AuthValue: 128
        },
        OperateAuth_manageBookItem: {
            ModuleID: "M008",
            AuthID: "AU007",
            AuthValue: 256
        },
        OperateAuth_manageVisitItem: {
            ModuleID: "M008",
            AuthID: "AU008",
            AuthValue: 512
        },
        PatientCategory_self: {
            ModuleID: "M009",
            AuthID: "AU009",
            AuthValue: 2
        },
        PatientCategory_all: {
            ModuleID: "M009",
            AuthID: "AU010",
            AuthValue: 4
        },
        Supply_visit: {
            ModuleID: "M007",
            AuthID: "AU011",
            AuthValue: 2
        },
        SystemSet_visit: {
            ModuleID: "M006",
            AuthID: "AU012",
            AuthValue: 2
        },
        SystemSet_editMedical: {
            ModuleID: "M006",
            AuthID: "AU013",
            AuthValue: 4
        },
        SystemSet_setCostItem: {
            ModuleID: "M006",
            AuthID: "AU014",
            AuthValue: 8
        },
        SystemSet_setVisitItem: {
            ModuleID: "M006",
            AuthID: "AU015",
            AuthValue: 16
        },
        SystemSet_setAdvice: {
            ModuleID: "M006",
            AuthID: "AU016",
            AuthValue: 32
        },
        SystemSet_setBookItem: {
            ModuleID: "M006",
            AuthID: "AU017",
            AuthValue: 64
        },
        DataStatic_visit: {
            ModuleID: "M005",
            AuthID: "AU018",
            AuthValue: 2
        },
        DataStatic_daily: {
            ModuleID: "M005",
            AuthID: "AU019",
            AuthValue: 4
        },
        ClinicMG_visit: {
            ModuleID: "M004",
            AuthID: "AU020",
            AuthValue: 2
        },
        ClinicMG_editEmployee: {
            ModuleID: "M004",
            AuthID: "AU021",
            AuthValue: 4
        },
        ClinicMG_addEmployee: {
            ModuleID: "M004",
            AuthID: "AU022",
            AuthValue: 8
        },
        ClinicMG_deleteEmployee: {
            ModuleID: "M004",
            AuthID: "AU023",
            AuthValue: 16
        },
        ClinicMG_editPosition: {
            ModuleID: "M004",
            AuthID: "AU024",
            AuthValue: 32
        },
        BookMG_visit: {
            ModuleID: "M003",
            AuthID: "AU025",
            AuthValue: 2
        },
        BookMG_scheduling: {
            ModuleID: "M003",
            AuthID: "AU026",
            AuthValue: 4
        },
        PatientMG_visit: {
            ModuleID: "M002",
            AuthID: "AU027",
            AuthValue: 2
        },
        PatientMG_editPatient: {
            ModuleID: "M002",
            AuthID: "AU028",
            AuthValue: 4
        },
        PatientMG_addBill: {
            ModuleID: "M002",
            AuthID: "AU029",
            AuthValue: 8
        },
        PatientMG_accountRecharge: {
            ModuleID: "M002",
            AuthID: "AU030",
            AuthValue: 16
        },
        PatientMG_accountTransfer: {
            ModuleID: "M002",
            AuthID: "AU031",
            AuthValue: 32
        },
        PatientMG_accountRefund: {
            ModuleID: "M002",
            AuthID: "AU032",
            AuthValue: 64
        },
        PatientMG_editMedical: {
            ModuleID: "M002",
            AuthID: "AU045",
            AuthValue: 128
        },
        WorkPlatform_visit: {
            ModuleID: "M001",
            AuthID: "AU033",
            AuthValue: 2
        },
        WorkPlatform_editPatient: {
            ModuleID: "M001",
            AuthID: "AU034",
            AuthValue: 4
        },
        WorkPlatform_sign: {
            ModuleID: "M001",
            AuthID: "AU035",
            AuthValue: 8
        },
        WorkPlatform_treat: {
            ModuleID: "M001",
            AuthID: "AU036",
            AuthValue: 16
        },
        WorkPlatform_addBill: {
            ModuleID: "M001",
            AuthID: "AU037",
            AuthValue: 32
        },
        WorkPlatform_editMedical: {
            ModuleID: "M001",
            AuthID: "AU038",
            AuthValue: 128
        },
        WorkPlatform_accountRecharge: {
            ModuleID: "M001",
            AuthID: "AU046",
            AuthValue: 256
        },
        WorkPlatform_accountTransfer: {
            ModuleID: "M001",
            AuthID: "AU047",
            AuthValue: 512
        },
        WorkPlatform_accountRefund: {
            ModuleID: "M001",
            AuthID: "AU048",
            AuthValue: 1024
        },
        Bill_visit: {
            ModuleID: "M010",
            AuthID: "AU039",
            AuthValue: 2
        },
        Bill_pay: {
            ModuleID: "M010",
            AuthID: "AU040",
            AuthValue: 4
        },
        Bill_refund: {
            ModuleID: "M010",
            AuthID: "AU041",
            AuthValue: 8
        },
        Bill_editBill: {
            ModuleID: "M010",
            AuthID: "AU042",
            AuthValue: 16
        },
        Bill_cancelBill: {
            ModuleID: "M010",
            AuthID: "AU043",
            AuthValue: 32
        },
        Bill_editPayee: {
            ModuleID: "M010",
            AuthID: "AU044",
            AuthValue: 64
        },
        Equip_visit: {
            ModuleID: "M011",
            AuthID: "AU049",
            AuthValue: 2
        },
        Equip_editEquipment: {
            ModuleID: "M011",
            AuthID: "AU050",
            AuthValue: 4
        },
        Equip_exportEquipment: {
            ModuleID: "M011",
            AuthID: "AU051",
            AuthValue: 8
        }
    };
    a.GenerateHtml = function(c, e, d) {
        var b = "";
        b += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + e + "</span>";
        b += '<a id="mb_ico" class="icon-remove-circle"></a><div id="mb_msg">' + d + '</div><div id="mb_btnbox">';
        if (c == "alert") {
            b += '<button id="mb_btn_ok" class="btn btn-success">确定</button>'
        }
        if (c == "confirm") {
            b += '<button id="mb_btn_ok" class="btn btn-success">确定</button>';
            b += '<button id="mb_btn_no" class="btn btn-danger">取消</button>'
        }
        b += "</div></div>";
        $("body").append(b);
        a.GenerateCss()
    }
    ;
    a.GenerateCss = function() {
        $("#mb_box").css({
            width: "100%",
            height: "100%",
            zIndex: "99999",
            position: "fixed",
            filter: "Alpha(opacity=60)",
            backgroundColor: "black",
            top: "0",
            left: "0",
            opacity: "0.6"
        });
        $("#mb_con").css({
            zIndex: "999999",
            width: "400px",
            position: "fixed",
            backgroundColor: "White",
            borderRadius: "15px"
        });
        $("#mb_tit").css({
            display: "block",
            fontSize: "14px",
            color: "whitesmoke",
            padding: "10px 15px",
            backgroundColor: "#6666CC",
            borderRadius: "15px 15px 0 0",
            fontWeight: "bold",
            letterSpacing: "1.5px"
        });
        $("#mb_msg").css({
            padding: "20px",
            lineHeight: "20px",
            textAlign: "center",
            borderBottom: "1px dashed #DDD",
            fontSize: "13px"
        });
        $("#mb_ico").css({
            display: "block",
            position: "absolute",
            right: "10px",
            top: "9px",
            cursor: "pointer",
            fontSize: "1.5em",
            color: "White"
        });
        $("#mb_btnbox").css({
            margin: "15px 0 10px 0",
            textAlign: "center"
        });
        $("#mb_btn_ok,#mb_btn_no").css({
            width: "85px",
            height: "30px",
            color: "white",
            border: "none"
        });
        $("#mb_btn_no").css({
            marginLeft: "20px"
        });
        $("#mb_ico").hover(function() {
            $(this).css({
                color: "lightgray"
            })
        }, function() {
            $(this).css({
                color: "White"
            })
        });
        var d = document.documentElement.clientWidth;
        var b = document.documentElement.clientHeight;
        var c = $("#mb_con").width();
        var e = $("#mb_con").height();
        $("#mb_con").css({
            top: (b - e * 2) / 2 + "px",
            left: (d - c) / 2 + "px"
        })
    }
    ;
    a.btnOk = function(b) {
        $("#mb_btn_ok").click(function() {
            $("#mb_box,#mb_con").remove();
            if (typeof (b) == "function") {
                b()
            }
        })
    }
    ;
    a.btnNo = function(b) {
        $("#mb_btn_no,#mb_ico").click(function() {
            $("#mb_box,#mb_con").remove();
            if (typeof (b) == "function") {
                b()
            }
        })
    }
    ;
    a.MsgBox = {
        Alert: function(c, b) {
            a.GenerateHtml("alert", c, b);
            a.btnOk();
            a.btnNo()
        },
        Confirm: function(d, c, e, b) {
            a.GenerateHtml("confirm", d, c);
            a.btnOk(e);
            a.btnNo(b)
        }
    };
    a.requestBody = function(b, e, d, c) {
        return {
            Header: {
                Token: b,
                StatusCode: 0,
                Module: a.module,
                Message: "",
                OperateCode: e,
                TimeStamp: c
            },
            Body: d
        }
    }
    ;
    return a
}
]);
httpModule.factory("HttpBaseFactory", ["$location", "$http", "ResourceFactory", function(f, e, a) {
    var d = (new Date()).valueOf();
    var c = {};
    c.getDomain = function() {
        var g = f.protocol() + "://" + f.host() + ":" + f.port();
        return g
    }
    ;
    c.alert = function(g) {
        a.MsgBox.Alert("消息", g)
    }
    ;
    c.confirm = function(i, g, h) {
        a.MsgBox.Confirm("温馨提示", i, g, h)
    }
    ;
    var b = function() {
        var g = CommonFun.getDataFromSession("CurrentUser");
        if (g != null) {
            return g.Header.Token
        } else {
            if (f.absUrl().lastIndexOf("Login.html") > 0 || f.absUrl().lastIndexOf("Register.html") > 0 || f.absUrl().lastIndexOf("Index.html")) {
                return ""
            } else {
                window.location.href = "../WebPages/DCPatientDetail.html"
            }
        }
    };
    c.baseRequest = function(h, m, l, g, i) {
        var j = function() {
            CommonFun.deleteDataFromSession("CurrentUser");
            console.log("removeSession")
        };
        sessionControl = setInterval(j, (60 * 60 * 1000));
        var k = a.requestBody(b(), m, l, d);
        e.post(h, k).success(function(n) {
            switch (n.Header.StatusCode) {
            case 1:
                CommonFun.deleteDataFromSession("CurrentUser");
                c.confirm("您登陆超时，是否重新登录？", function() {
                    $("#login_div").modal("show")
                }, function() {
                    window.location.href = "Login.html"
                });
                return;
            case 14:
                CommonFun.deleteDataFromSession("CurrentUser");
                window.location.href = "Login.html";
                c.alert("账号异地登陆，请确认账号密码是否被盗！");
                return;
            case 15:
                CommonFun.deleteDataFromSession("CurrentUser");
                window.location.href = "Login.html";
                c.alert("邀请码过期，请联系管理员！");
                return;
            case 31:
                CommonFun.deleteDataFromSession("CurrentUser");
                window.location.href = "Login.html";
                c.alert("账户已被冻结，请联系管理员！");
                return;
            default:
                break
            }
            if (n.Header.TimeStamp != d) {
                return
            }
            if (typeof (g) == "function") {
                g(n)
            } else {
                console.log("此处应是函数");
                throw ("successCallback")
            }
        }).error(function(n) {
            if (typeof (i) == "function") {
                i(n)
            } else {
                console.log("此处应该是函数");
                throw ("errorCallback")
            }
        })
    }
    ;
    return c
}
]);
httpModule.factory("HttpRequestFactory", ["HttpBaseFactory", "ResourceFactory", function(c, a) {
    var b = {};
    b.getDomain = function() {
        c.getDomain()
    }
    ;
    b.loginRequest = function(f, d, e) {
        c.baseRequest(WebServer.getUrl("Login"), a.operateCode.nothing, f, d, e)
    }
    ;
    b.verifyCodeRequest = function(f, d, e) {
        c.baseRequest(WebServer.getUrl("VerifyCode"), a.operateCode.nothing, f, d, e)
    }
    ;
    b.provinceRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("Province"), g, f, d, e)
    }
    ;
    b.cityRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("City"), g, f, d, e)
    }
    ;
    b.districtRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("District"), g, f, d, e)
    }
    ;
    b.tenantRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("Tenant"), g, f, d, e)
    }
    ;
    b.employeeRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("Employee"), g, f, d, e)
    }
    ;
    b.roleRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("Role"), g, f, d, e)
    }
    ;
    b.patientRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("Patient"), g, f, d, e)
    }
    ;
    b.patientDetailRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("PatientDetail"), g, f, d, e)
    }
    ;
    b.appointmentRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("Appointment"), g, f, d, e)
    }
    ;
    b.visitRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("Visit"), g, f, d, e)
    }
    ;
    b.getListForVisitRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("GetListForVisit"), g, f, d, e)
    }
    ;
    b.costRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("Cost"), g, f, d, e)
    }
    ;
    b.treatRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("Treat"), g, f, d, e)
    }
    ;
    b.patientSourceReportRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("PatientSourceReport"), g, f, d, e)
    }
    ;
    b.patientAddQuantityReportRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("PatientAddQuantityReport"), g, f, d, e)
    }
    ;
    b.doctorCostReportRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("DoctorCostReport"), g, f, d, e)
    }
    ;
    b.mainCatalogRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("MainCategory"), g, f, d, e)
    }
    ;
    b.subCatalogRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("SubCategory"), g, f, d, e)
    }
    ;
    b.appointmentItemsRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("AppointItems"), g, f, d, e)
    }
    ;
    b.recordItemsRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("RecordItems"), g, f, d, e)
    }
    ;
    b.visitItemsRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("VisitItems"), g, f, d, e)
    }
    ;
    b.adviceItemsRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("AdviceItems"), g, f, d, e)
    }
    ;
    b.adviceContentRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("AdviceContent"), g, f, d, e)
    }
    ;
    b.costItemsRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("CostItems"), g, f, d, e)
    }
    ;
    b.medicalTemplateRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("MedicalTemplate"), g, f, d, e)
    }
    ;
    b.permissionRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("Permission"), g, f, d, e)
    }
    ;
    b.medicalTemplateContentRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("TemplateContent"), g, f, d, e)
    }
    ;
    b.medicalTemplateUpdateRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("TemplateDeal"), g, f, d, e)
    }
    ;
    b.reportTreatStatistics = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("ReportTreat"), g, f, d, e)
    }
    ;
    b.reportAppointStatistics = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("ReportAppoint"), g, f, d, e)
    }
    ;
    b.reportCostTypeRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("ReportCost"), g, f, d, e)
    }
    ;
    b.reportAppointItemsRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("ReportAppoint"), g, f, d, e)
    }
    ;
    b.dentalClinicRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("DentalClinicReport"), g, f, d, e)
    }
    ;
    b.treatFileRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("TreatFile"), g, f, d, e)
    }
    ;
    b.encryptionRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("EncryptionData"), g, f, d, e)
    }
    ;
    b.logoutRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("Logout"), g, f, d, e)
    }
    ;
    b.sendAdviceRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("SendAdvice"), g, f, d, e)
    }
    ;
    b.accountRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("AccountInfo"), g, f, d, e)
    }
    ;
    b.modifyPasswordRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("ModifyPassword"), g, f, d, e)
    }
    ;
    b.sendSMSForPasswordRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("SendSMSForPassword"), g, f, d, e)
    }
    ;
    b.accountRechargeRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("AccountRecharge"), g, f, d, e)
    }
    ;
    b.accountTransferRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("AccountTransfer"), g, f, d, e)
    }
    ;
    b.accountRefundRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("AccountRefund"), g, f, d, e)
    }
    ;
    b.createBillRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("CreateBill"), g, f, d, e)
    }
    ;
    b.getBillRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("GetBills"), g, f, d, e)
    }
    ;
    b.cancelBillRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("CancelBill"), g, f, d, e)
    }
    ;
    b.finishedBillRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("FinishedBill"), g, f, d, e)
    }
    ;
    b.payBillRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("PayBill"), g, f, d, e)
    }
    ;
    b.getBillByNoRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("GetBillsByNo"), g, f, d, e)
    }
    ;
    b.signAppointRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("AppointSign"), g, f, d, e)
    }
    ;
    b.treatAppointRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("AppointTreat"), g, f, d, e)
    }
    ;
    b.billRefundRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("BillRefund"), g, f, d, e)
    }
    ;
    b.createSceneQRCodeRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("CreateSceneQRCode"), g, f, d, e)
    }
    ;
    b.EquipmentCategoryDealRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("EquipmentCategoryDeal"), g, f, d, e)
    }
    ;
    b.EquipmentDealRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("EquipmentDeal"), g, f, d, e)
    }
    ;
    b.EquipmentExportRequest = function(f, g, d, e) {
        c.baseRequest(WebServer.getUrl("EquipmentExport"), g, f, d, e)
    }
    ;
    return b
}
]);
httpModule.service("HttpService", ["HttpRequestFactory", function(a) {
    var b = {};
    b.loginRequest = function(e, c, d) {
        a.loginRequest(e, c, d)
    }
    ;
    b.verifyCodeRequest = function(e, c, d) {
        a.verifyCodeRequest(e, c, d)
    }
    ;
    b.provinceRequest = function(e, f, c, d) {
        a.provinceRequest(e, f, c, d)
    }
    ;
    b.cityRequest = function(e, f, c, d) {
        a.cityRequest(e, f, c, d)
    }
    ;
    b.districtRequest = function(e, f, c, d) {
        a.districtRequest(e, f, c, d)
    }
    ;
    b.tenantRequest = function(e, f, c, d) {
        a.tenantRequest(e, f, c, d)
    }
    ;
    b.employeeRequest = function(e, f, c, d) {
        a.employeeRequest(e, f, c, d)
    }
    ;
    b.roleRequest = function(e, f, c, d) {
        a.roleRequest(e, f, c, d)
    }
    ;
    b.patientRequest = function(e, f, c, d) {
        a.patientRequest(e, f, c, d)
    }
    ;
    b.patientDetailRequest = function(e, f, c, d) {
        a.patientDetailRequest(e, f, c, d)
    }
    ;
    b.appointmentRequest = function(e, f, c, d) {
        a.appointmentRequest(e, f, c, d)
    }
    ;
    b.visitRequest = function(e, f, c, d) {
        a.visitRequest(e, f, c, d)
    }
    ;
    b.getListForVisitRequest = function(e, f, c, d) {
        a.getListForVisitRequest(e, f, c, d)
    }
    ;
    b.costRequest = function(e, f, c, d) {
        a.costRequest(e, f, c, d)
    }
    ;
    b.treatRequest = function(e, f, c, d) {
        a.treatRequest(e, f, c, d)
    }
    ;
    b.patientSourceReportRequest = function(e, f, c, d) {
        a.patientSourceReportRequest(e, f, c, d)
    }
    ;
    b.patientAddQuantityReportRequest = function(e, f, c, d) {
        a.patientAddQuantityReportRequest(e, f, c, d)
    }
    ;
    b.doctorCostReportRequest = function(e, f, c, d) {
        a.doctorCostReportRequest(e, f, c, d)
    }
    ;
    b.mainCatalogRequest = function(e, f, c, d) {
        a.mainCatalogRequest(e, f, c, d)
    }
    ;
    b.subCatalogRequest = function(e, f, c, d) {
        a.subCatalogRequest(e, f, c, d)
    }
    ;
    b.appointmentItemsRequest = function(e, f, c, d) {
        a.appointmentItemsRequest(e, f, c, d)
    }
    ;
    b.recordItemsRequest = function(e, f, c, d) {
        a.recordItemsRequest(e, f, c, d)
    }
    ;
    b.visitItemsRequest = function(e, f, c, d) {
        a.visitItemsRequest(e, f, c, d)
    }
    ;
    b.adviceItemsRequest = function(e, f, c, d) {
        a.adviceItemsRequest(e, f, c, d)
    }
    ;
    b.adviceContentRequest = function(e, f, c, d) {
        a.adviceContentRequest(e, f, c, d)
    }
    ;
    b.costItemsRequest = function(e, f, c, d) {
        a.costItemsRequest(e, f, c, d)
    }
    ;
    b.medicalTemplateRequest = function(e, f, c, d) {
        a.medicalTemplateRequest(e, f, c, d)
    }
    ;
    b.permissionRequest = function(e, f, c, d) {
        a.permissionRequest(e, f, c, d)
    }
    ;
    b.medicalTemplateContentRequest = function(e, f, c, d) {
        a.medicalTemplateContentRequest(e, f, c, d)
    }
    ;
    b.medicalTemplateUpdateRequest = function(e, f, c, d) {
        a.medicalTemplateUpdateRequest(e, f, c, d)
    }
    ;
    b.reportTreatStatisticsRequest = function(e, f, c, d) {
        a.reportTreatStatistics(e, f, c, d)
    }
    ;
    b.reportAppointStatisticsRequest = function(e, f, c, d) {
        a.reportAppointStatistics(e, f, c, d)
    }
    ;
    b.reportCostTypeRequest = function(e, f, c, d) {
        a.reportCostTypeRequest(e, f, c, d)
    }
    ;
    b.reportAppointItemsRequest = function(e, f, c, d) {
        a.reportAppointItemsRequest(e, f, c, d)
    }
    ;
    b.dentalClinicRequest = function(e, f, c, d) {
        a.dentalClinicRequest(e, f, c, d)
    }
    ;
    b.treatFileRequest = function(e, f, c, d) {
        a.treatFileRequest(e, f, c, d)
    }
    ;
    b.encryptionRequest = function(e, f, c, d) {
        a.encryptionRequest(e, f, c, d)
    }
    ;
    b.logoutRequest = function(e, f, c, d) {
        a.logoutRequest(e, f, c, d)
    }
    ;
    b.sendAdviceRequest = function(e, f, c, d) {
        a.sendAdviceRequest(e, f, c, d)
    }
    ;
    b.accountRequest = function(e, f, c, d) {
        a.accountRequest(e, f, c, d)
    }
    ;
    b.accountRechargeRequest = function(e, f, c, d) {
        a.accountRechargeRequest(e, f, c, d)
    }
    ;
    b.accountTransferRequest = function(e, f, c, d) {
        a.accountTransferRequest(e, f, c, d)
    }
    ;
    b.accountRefundRequest = function(e, f, c, d) {
        a.accountRefundRequest(e, f, c, d)
    }
    ;
    b.createBillRequest = function(e, f, c, d) {
        a.createBillRequest(e, f, c, d)
    }
    ;
    b.getBillRequest = function(e, f, c, d) {
        a.getBillRequest(e, f, c, d)
    }
    ;
    b.cancelBillRequest = function(e, f, c, d) {
        a.cancelBillRequest(e, f, c, d)
    }
    ;
    b.finishedBillRequest = function(e, f, c, d) {
        a.finishedBillRequest(e, f, c, d)
    }
    ;
    b.payBillRequest = function(e, f, c, d) {
        a.payBillRequest(e, f, c, d)
    }
    ;
    b.getBillByNoRequest = function(e, f, c, d) {
        a.getBillByNoRequest(e, f, c, d)
    }
    ;
    b.signAppointRequest = function(e, f, c, d) {
        a.signAppointRequest(e, f, c, d)
    }
    ;
    b.treatAppointRequest = function(e, f, c, d) {
        a.treatAppointRequest(e, f, c, d)
    }
    ;
    b.billRefundRequest = function(e, f, c, d) {
        a.billRefundRequest(e, f, c, d)
    }
    ;
    b.modifyPasswordRequest = function(e, f, c, d) {
        a.modifyPasswordRequest(e, f, c, d)
    }
    ;
    b.sendSMSForPasswordRequest = function(e, f, c, d) {
        a.sendSMSForPasswordRequest(e, f, c, d)
    }
    ;
    b.createSceneQRCodeRequest = function(e, f, c, d) {
        a.createSceneQRCodeRequest(e, f, c, d)
    }
    ;
    b.EquipmentCategoryDealRequest = function(e, f, c, d) {
        a.EquipmentCategoryDealRequest(e, f, c, d)
    }
    ;
    b.EquipmentDealRequest = function(e, f, c, d) {
        a.EquipmentDealRequest(e, f, c, d)
    }
    ;
    b.EquipmentExportRequest = function(e, f, c, d) {
        a.EquipmentExportRequest(e, f, c, d)
    }
    ;
    return b
}
]);
var BaseURL = "http://www.niuluo-tech.cn:81/api/";
var WeChatURL = "https://www.niuluo-tech.cn:443/WebPages/";
var FileURL = "http://www.niuluo-tech.cn:84/";
var ServerList = [{
    ActionName: "Login",
    Url: "User/Login"
}, {
    ActionName: "VerifyCode",
    Url: "Tenant/SendSMS"
}, {
    ActionName: "Tenant",
    Url: "Tenant/TenantDeal"
}, {
    ActionName: "Province",
    Url: "City/GetProvinceList"
}, {
    ActionName: "City",
    Url: "City/GetCityList"
}, {
    ActionName: "District",
    Url: "City/GetDistrictList"
}, {
    ActionName: "Employee",
    Url: "User/UserDeal"
}, {
    ActionName: "Role",
    Url: "Role/RoleDeal"
}, {
    ActionName: "Patient",
    Url: "Patient/PatientDeal"
}, {
    ActionName: "Appointment",
    Url: "Appoint/AppointDeal"
}, {
    ActionName: "Visit",
    Url: "Visit/VisitDeal"
}, {
    ActionName: "PatientDetail",
    Url: "Patient/PatientDetail"
}, {
    ActionName: "PatientExport",
    Url: "Patient/ExportExcel"
}, {
    ActionName: "GetListForVisit",
    Url: "Appoint/GetListForVisit"
}, {
    ActionName: "Cost",
    Url: "Cost/CostDeal"
}, {
    ActionName: "Treat",
    Url: "Treat/TreatDeal"
}, {
    ActionName: "PatientSourceReport",
    Url: "Report/PatientSourceReport"
}, {
    ActionName: "PatientAddQuantityReport",
    Url: "Report/PatientAddQuantityReport"
}, {
    ActionName: "DoctorCostReport",
    Url: "Report/DoctorCostReport"
}, {
    ActionName: "UpLoadFile",
    Url: "TreatFile/UploadFile"
}, {
    ActionName: "UpLoadImage",
    Url: "TreatFile/UploadImage"
}, {
    ActionName: "UpLoadLogo",
    Url: "Tenant/UploadLogo"
}, {
    ActionName: "PatientSourceExport",
    Url: "Report/PatientSourceExport"
}, {
    ActionName: "PatientAddQuantityExport",
    Url: "Report/PatientAddQuantityExport"
}, {
    ActionName: "MainCategory",
    Url: "Category/CategoryDeal"
}, {
    ActionName: "SubCategory",
    Url: "SubCategory/SubCategoryDeal"
}, {
    ActionName: "AppointItems",
    Url: "AppointItem/AppointItemDeal"
}, {
    ActionName: "RecordItems",
    Url: "RecordItem/RecordItemDeal"
}, {
    ActionName: "VisitItems",
    Url: "VisitItem/VisitItemDeal"
}, {
    ActionName: "AdviceItems",
    Url: "AdviceItem/AdviceItemDeal"
}, {
    ActionName: "AdviceContent",
    Url: "AdviceContent/AdviceContentDeal"
}, {
    ActionName: "CostItems",
    Url: "CostItem/CostItemDeal"
}, {
    ActionName: "MedicalTemplate",
    Url: "Template/TemplateDeal"
}, {
    ActionName: "Permission",
    Url: "Module/ModuleDeal"
}, {
    ActionName: "TemplateDeal",
    Url: "Template/AddOrUpdateTemplate"
}, {
    ActionName: "TemplateContent",
    Url: "TemplateContent/TemplateContentDeal"
}, {
    ActionName: "ReportTreat",
    Url: "Report/TreatQuantityReport"
}, {
    ActionName: "ReportAppoint",
    Url: "Report/AppointItemQuantityReport"
}, {
    ActionName: "TreatExport",
    Url: "Report/TreatQuantityExport"
}, {
    ActionName: "ReportCost",
    Url: "Report/CostReport"
}, {
    ActionName: "CostExport",
    Url: "Report/CostExport"
}, {
    ActionName: "AppointExport",
    Url: "Report/AppointItemQuantityExport"
}, {
    ActionName: "DentalClinicReport",
    Url: "Report/DentalClinicCostReport"
}, {
    ActionName: "DentalClinicExport",
    Url: "Report/DentalClinicCostExport"
}, {
    ActionName: "EmployeeExport",
    Url: "Report/DoctorCostExport"
}, {
    ActionName: "TreatFileDelete",
    Url: "TreatFile/Delete"
}, {
    ActionName: "TreatFile",
    Url: "TreatFile/TreatFileDeal"
}, {
    ActionName: "EncryptionData",
    Url: "User/GetUserInfo"
}, {
    ActionName: "Logout",
    Url: "User/Logout"
}, {
    ActionName: "SendAdvice",
    Url: "WeChart/SendAdviceTemplateMessage"
}, {
    ActionName: "AccountRecharge",
    Url: "Account/ReCharge"
}, {
    ActionName: "AccountTransfer",
    Url: "Account/Transferred"
}, {
    ActionName: "AccountRefund",
    Url: "Account/Refund"
}, {
    ActionName: "CreateBill",
    Url: "Bill/CreateBill"
}, {
    ActionName: "GetBillsByNo",
    Url: "Bill/GetBillByBillNo"
}, {
    ActionName: "GetBillsByAppoint",
    Url: "Bill/GetBillByAppoint"
}, {
    ActionName: "GetBills",
    Url: "Bill/GetBills"
}, {
    ActionName: "CancelBill",
    Url: "Bill/CancelledBill"
}, {
    ActionName: "PayBill",
    Url: "Bill/Pay"
}, {
    ActionName: "AppointTreat",
    Url: "Appoint/Treat"
}, {
    ActionName: "AppointSign",
    Url: "Appoint/Sign"
}, {
    ActionName: "BillRefund",
    Url: "api/Bill/Refund"
}, {
    ActionName: "FinishedBill",
    Url: "Bill/FinishedBill"
}, {
    ActionName: "AccountInfo",
    Url: "Account/AccountDeal"
}, {
    ActionName: "ModifyPassword",
    Url: "Tenant/ModifyPassword"
}, {
    ActionName: "SendSMSForPassword",
    Url: "Tenant/SendSMSForPassword"
}, {
    ActionName: "CreateSceneQRCode",
    Url: "WeChart/CreateSceneQRCode"
}, {
    ActionName: "EquipmentCategoryDeal",
    Url: "EquipmentCategory/EquipmentCategoryDeal"
}, {
    ActionName: "EquipmentDeal",
    Url: "Equipment/EquipmentDeal"
}, {
    ActionName: "EquipmentExport",
    Url: "Equipment/EquipmentExport"
}];
var WebServer = {
    getUrl: function(b) {
        var a = "";
        if (ServerList != undefined && ServerList.length > 0) {
            for (var c = 0; c < ServerList.length; c++) {
                if (ServerList[c].ActionName == b) {
                    a = BaseURL + ServerList[c].Url;
                    return a
                }
            }
        }
        return a
    }
};
var permissionModule = angular.module("PermissionModule", ["HttpModule"]);
permissionModule.factory("PermissionFactory", ["ResourceFactory", function(b) {
    var c = {};
    var a = CommonFun.getDataFromSession("CurrentUser");
    var d = function(f) {
        var e = false;
        for (var g = 0; g < a.Body.Auths.length; g++) {
            if (a.Body.Auths[g].Module.ModuleName == f) {
                if (a.Body.Auths[g].Auth.Auth) {
                    e = true
                }
                break
            }
        }
        return e
    };
    c.getModules = function(h) {
        var e = [];
        if (a.Body.UserType == 1) {
            return h
        } else {
            if (a != null && a != undefined && a.Body.Auths.length > 0) {
                for (var g = 0; g < a.Body.Auths.length; g++) {
                    for (var f = 0; f < h.length; f++) {
                        if (a.Body.Auths[g].Module.ModuleName == h[f].title && a.Body.Auths[g].Auth.Auth > 0) {
                            e.push(h[f]);
                            break
                        }
                    }
                }
            }
        }
        return e
    }
    ;
    c.isWithModulePermission = function(e) {
        var f = false;
        if (a.Body.UserType == 1) {
            f = true;
            return f
        }
        switch (e) {
        case MenuEnum.PlatformMG:
            f = d("工作平台");
            break;
        case MenuEnum.PatientMG:
            f = d("患者管理");
            break;
        case MenuEnum.BookMG:
            f = d("预约管理");
            break;
        case MenuEnum.ClinicMG:
            f = d("诊所管理");
            break;
        case MenuEnum.DataStatic:
            f = d("数据统计");
            break;
        case MenuEnum.SystemSet:
            f = d("系统设置");
            break;
        case MenuEnum.SupplyPlatform:
            f = d("产品目录");
            break;
        default:
            break
        }
        return f
    }
    ;
    c.isWithOperatePermission = function(f, g) {
        if (a.Body.UserType == 1) {
            return true
        }
        if (a.Body.Auths && a.Body.Auths.length > 0) {
            for (var e = 0; e < a.Body.Auths.length; e++) {
                if (a.Body.Auths[e].Module.ModuleID == g.ModuleID && (a.Body.Auths[e].Auth.Auth & g.AuthValue)) {
                    return true
                }
            }
        } else {
            return false
        }
    }
    ;
    return c
}
]);
var pushModule = angular.module("PushMessageModule", []);
pushModule.service("PushMessageService", [function() {
    var d = new GoEasy({
        appkey: "bc7a9892-7813-437b-9ba9-688e9d37334e"
    });
    var c = CommonFun.getDataFromSession("CurrentUser").Body;
    var b = c.User;
    var e = c.Tenant;
    var a = {};
    a.subChannel = function(f, g) {
        d.subscribe({
            channel: f,
            onMessage: function(h) {
                if (g && typeof g == "function") {
                    g(h)
                }
            }
        })
    }
    ;
    a.initAllSub = function(f) {
        a.subChannel("DentalAppointDealAdd", function(h) {
            var g = CommonFun.getDataFromSession("PushList");
            if (!g) {
                g = []
            }
            if (h.deliverMessages && h.deliverMessages.length > 0) {
                for (var j = 0; j < h.deliverMessages.length; j++) {
                    var k = JSON.parse(h.deliverMessages[j].content);
                    if (k.Appoint.TenantID == e.TenantID) {
                        if (c.UserType == 1) {
                            f.msgCount++;
                            CommonFun.saveDataToSession("MsgCount", f.msgCount);
                            g.push({
                                ID: k.Appoint.AppointID,
                                Type: 1,
                                Content: k
                            })
                        } else {
                            if (b.RoleID == "R001" && b.UserID == k.DoctorID) {
                                f.msgCount++;
                                CommonFun.saveDataToSession("MsgCount", f.msgCount);
                                g.push({
                                    ID: k.Appoint.AppointID,
                                    Type: 1,
                                    Content: k
                                })
                            }
                            if (b.RoleID != "R001") {
                                f.msgCount++;
                                CommonFun.saveDataToSession("MsgCount", f.msgCount);
                                g.push({
                                    ID: k.Appoint.AppointID,
                                    Type: 1,
                                    Content: k
                                })
                            }
                        }
                    }
                }
                CommonFun.saveDataToSession("PushList", g);
                f.$apply()
            }
        });
        a.subChannel("DentalPatientAdd", function(h) {
            var g = CommonFun.getDataFromSession("PushList");
            if (!g) {
                g = []
            }
            if (h.deliverMessages && h.deliverMessages.length > 0) {
                for (var j = 0; j < h.deliverMessages.length; j++) {
                    var k = JSON.parse(h.deliverMessages[j].content);
                    if (k.TenantID == e.TenantID) {
                        f.msgCount++;
                        CommonFun.saveDataToSession("MsgCount", f.msgCount);
                        g.push({
                            ID: k.PatientID,
                            Type: 2,
                            Content: k
                        })
                    }
                }
                CommonFun.saveDataToSession("PushList", g);
                f.$apply()
            }
        })
    }
    ;
    return a
}
]);
var menuModule = angular.module("MenuModule", ["HttpModule", "PermissionModule", "angularFileUpload", "PushMessageModule"]);
menuModule.directive("menu", function() {
    return {
        restrict: "E",
        template: "<div id='sidebar'  class='nav-collapse'><div class='menu_icon_user'><img src='../Images/male.png' ng-show='currentUser.Gender != 2' alt='暂无图片' class='icon_user_custom' style='height: 85%;' name='currentUser' ng-click='showCurrentUser($event);'><img src='../Images/female.png' ng-show='currentUser.Gender == 2' alt='暂无图片' class='icon_user_custom' style='height: 85%;' name='currentUser' ng-click='showCurrentUser($event);'><nav ng-show='msgCount > 0'><span class='badge' ng-bind='msgCount'></span></nav></div><ul class='sidebar-menu'><li id='menu_{{item.ID}}' class='sub-menu {{isActive}}' ng-repeat='item in menuList'><a href='{{item.pageUrl}}' target='{{item.target}}'><i class='{{item.icon}} menu_icon'></i><span class='menu_font' ng-bind='item.title'></span></a></li></ul><div><span><img src='{{tenantLogo}}' class='menu_logo' alt='暂无图片'/></span></div><div id='post_card' class='post_card_h post_card_w'><div class='post_title'></div><div class='post_picture'><div class='bell_out'><span class='icon-bell-alt bell_p' ng-click='showPushMsg();'><i class='badge tip' ng-bind='msgCount'></i></span></div><img src='../Images/male.png' alt='暂无图片' style='height: 80%;background-color: lightgray;border-radius: 5px;' ng-show='currentUser.Gender != 2'><img src='../Images/female.png' alt='暂无图片' style='height: 80%;background-color: lightgray;border-radius: 5px;' ng-show='currentUser.Gender == 2'><div style='height: 20%;'><span ng-bind='currentUser.UserName'></span>/<span ng-bind='currentUser.JobTitleName'></span></div></div><div class='post_button'><div class='post_btn_top'><button ng-class='{&quot;btn btn-sm post_clinic_btn btn-danger&quot;: currentUser.UserType == 1, &quot;btn btn-sm post_btn_lf btn-danger&quot;: currentUser.UserType != 1}' ng-click='showClinicInfo();'><span class='icon-file'></span>&nbsp;诊所信息</button><button ng-hide='currentUser.UserType == 1' class='btn btn-sm btn-danger post_btn_rg' ng-click='showPersonInfo();'><span class='icon-user-md'></span>&nbsp;个人信息</button></div><div class='post_btn_bot'><button class='btn btn-sm' style='width: 100%;background-color:#6666CC;color:white;' ng-click='logout();'>退出帐号</button></div></div></div></div>",
        replace: true
    }
});
menuModule.directive("info", function() {
    var a = "<div class='modal fade' id='clinic_info' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' data-backdrop='static'><div class='modal-dialog modal_dialog_width modal_dialog_height_post'><div class='modal-content modal_content_custom'><div class='modal-header modal_head modal_header_height'><div data-dismiss='modal' aria-hidden='true' title='关闭' style='display:inline-block;float:right;'><span class='icon-stack'><i class='icon-check-empty icon-stack-base'></i><i class='icon-remove icon-light'></i></span></div><span class='head_title'>诊所信息</span></div><div class='modal-body modal_body_height_post'><div class='clinic_picture modal_content_height_post'><div class='picture_bd'><img style='height:60%;width:100%;border-radius:50%;margin: 25% 0 0 0;' ng-if='tenantLogo != null' ng-src='{{tenantLogo}}' alt='暂无图片' ng-click='selectFile();'><input type='file' id='selectLogo' ng-file-select='changeFile($files)' ng-show='false' accept='image/*'></div></div><div class='clinic_info modal_content_height_post'><div><span class='post_item modal_cl_lb_w'>诊所名称：</span><span class='post_item modal_cl_con_w show_item' ng-bind='clinicInfo.TenantName'></span><span class='post_item modal_cl_con_w hide_item'><input name='tenantName' class='form-control' placeholder='诊所名称' type='text' ng-model='clinicInfo.TenantName'></span></div><div class='modal_item_post'><span class='post_item modal_cl_lb_w'>诊所地址：</span><span class='post_item modal_cl_con_w show_item' ng-bind='clinicInfo.Address'></span><span class='post_item modal_cl_con_w hide_item'><input name='address' class='form-control' placeholder='诊所地址' type='text' ng-model='clinicInfo.Address'></span></div><div><span class='post_item modal_cl_lb_w'>联系人：</span><span class='post_item modal_cl_con_w show_item' ng-bind='clinicInfo.Contact'></span><span class='post_item modal_cl_con_w hide_item'><input name='contact' class='form-control' placeholder='联系人姓名' type='text' ng-model='clinicInfo.Contact'></span></div><div><span class='post_item modal_cl_lb_w'>联系人手机：</span><span class='post_item modal_cl_con_w show_item' ng-bind='clinicInfo.ContactPhone'></span><span class='post_item modal_cl_con_w hide_item'><input name='contactMobile' class='form-control' placeholder='联系人手机' type='text' ng-model='clinicInfo.ContactPhone'></span></div><div><span class='post_item modal_cl_lb_w'>邮箱：</span><span class='post_item modal_cl_con_w show_item' ng-bind='clinicInfo.Email'></span><span class='post_item modal_cl_con_w hide_item'><input name='email' class='form-control' placeholder='邮箱' type='text' ng-model='clinicInfo.Email'></span></div><div><span class='post_item modal_cl_lb_w'>预约电话：</span><span class='post_item modal_cl_con_w show_item' ng-bind='clinicInfo.BookMobile'></span><span class='post_item modal_cl_con_w hide_item'><input name='bookMobile' class='form-control' placeholder='预约电话' type='text' ng-model='clinicInfo.BookMobile'></span></div><div><span class='post_item modal_cl_lb_w'>诊所简介：</span><span class='many_let post_item modal_cl_con_w show_item' ng-bind='clinicInfo.Description'></span><span class='many_let post_item modal_cl_con_w hide_item'><textarea name='description' class='form-control' placeholder='诊所简介' ng-model='clinicInfo.Description' style='resize:none;height:100%;overflow:auto;'></textarea></span></div><div><span class='post_item modal_cl_lb_w'>认证情况：</span><span class='many_let post_item modal_cl_con_w show_item' ng-bind='clinicInfo.Authentication' style='width:60%;'></span><span class='many_let post_item modal_cl_con_w hide_item' style='width:60%;'><textarea name='authentication' class='form-control' placeholder='认证情况' ng-model='clinicInfo.Authentication' style='resize:none;height:100%;overflow:auto;'></textarea></span><span class='post_item show_item' style='width:15%;vertical-align: text-bottom;'><button class='btn cus_btn_color' style='width: 100%;margin-left: 40%;' ng-click='editTenant();'>编辑</button></span><span class='post_item hide_item' style='width:15%;vertical-align: text-bottom;'><button class='btn cus_btn_color' style='width: 100%;margin-left: 40%;' ng-click='saveTenant();'>保存</button></span></div></div></div></div></div>";
    return {
        restrict: "E",
        template: "<div><div class='modal fade' id='person_info' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' data-backdrop='static'><div class='modal-dialog modal_dialog_wid_user modal_dialog_height_user'><div class='modal-content modal_content_custom'><div class='modal-header modal_head modal_header_height'><div data-dismiss='modal' aria-hidden='true' title='关闭' style='display:inline-block;float:right;'><span class='icon-stack'><i class='icon-check-empty icon-stack-base'></i><i class='icon-remove icon-light'></i></span></div><span class='head_title'>个人信息</span></div><div class='modal-body modal_body_height_user'><div class='clinic_picture_user'><div class='picture_bd'><img src='../Images/male.png' ng-show='currentUser.Gender == 1' alt='暂无图片' style='height: 100%;'><img src='../Images/female.png' ng-show='currentUser.Gender != 1' alt='暂无图片' style='height: 100%;'></div></div><div class='clinic_info_user'><div><span class='post_item modal_us_lb_w'>姓 名：</span><span class='post_item modal_us_con_w show_item' ng-bind='currentUser.UserName'></span><span class='post_item modal_us_con_w hide_item'><input name='name' class='form-control' placeholder='姓名' type='text' ng-model='currentUser.UserName'></span></div><div class='modal_item_post_user'><span class='post_item modal_us_lb_w'>性 别：</span><span class='post_item show_item modal_us_con_w' ng-bind='currentUser.GenderName'></span><span class='post_item hide_item modal_us_con_w'><select class='form-control' ng-model='currentUser.Gender' ng-options='x.Type as x.Name for x in genders'><option value=''>请选择性别</option></select></span></div><div><span class='post_item modal_us_lb_w'>出生日期：</span><span class='post_item show_item modal_us_con_w' ng-bind='currentUser.Birthday'></span><span class='post_item hide_item modal_us_con_w'><input name='birthDay' id='birthday_user' class='form-control' placeholder='出生日期' type='text' ng-model='currentUser.Birthday'></span></div><div><span class='post_item modal_us_lb_w'>手机号：</span><span class='post_item show_item modal_us_con_w' ng-bind='currentUser.Mobile'></span><span class='post_item hide_item modal_us_con_w'><input name='mobile' class='form-control' placeholder='手机号' type='text' ng-model='currentUser.Mobile'></span></div><div><span class='post_item modal_us_lb_w'>邮箱：</span><span class='post_item show_item modal_us_con_w' ng-bind='currentUser.Email'></span><span class='post_item hide_item modal_us_con_w'><input name='email' class='form-control' placeholder='邮箱' type='text' ng-model='currentUser.Email'></span></div><div><span class='post_item modal_us_lb_w'>职 位：</span><span class='post_item modal_us_con_w' ng-bind='currentUser.JobTitleName'></span></div><div><span class='post_item modal_us_lb_w'>角 色：</span><span class='post_item modal_us_con_w' ng-bind='currentUser.Role' style='width:60%;'></span><span class='post_item show_item' style='width:20%;vertical-align: text-bottom;'><button class='btn cus_btn_color' style='width: 70%;margin-left: 40%;' ng-click='editPersonInfo();'>编辑</button></span><span class='post_item hide_item' style='width:20%;vertical-align: text-bottom;'><button class='btn cus_btn_color' style='width: 70%;margin-left: 40%;' ng-click='savePersonInfo();'>保存</button></span></div></div></div></div></div></div>" + a + "</div>",
        replace: true
    }
});
menuModule.directive("login", function() {
    return {
        restrict: "E",
        template: "<div class='modal fade' id='login_div' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' data-backdrop='static'><div class='modal-dialog modal_dialog_custom' style='height: 100%;text-align: center;padding: 10% 0 0 0'><div style='display: inline-block;width: 50%;background-color: whitesmoke;height: 50%;padding: 5%;border-radius: 8px;'><div style='margin: 0 0 5% 0;'><span style='display: inline-block;width: 30%;text-align: right;'>账户类型：</span><span style='display: inline-block;width: 70%;'><select ng-model='loginRequest.UserType' ng-options='x.Type as x.Name for x in accountTypeList' class='form-control'></select></span></div><div style='margin: 0 0 5% 0;'><span style='display: inline-block;width: 30%;text-align: right;'>账户：</span><span style='display: inline-block;width: 70%;'><input id='login_name' type='text' ng-model='loginRequest.UserName' placeholder='账户' class='form-control' ng-keyup='enterLogin($event);'ng-readonly='isLoading'></span></div><div style='margin: 0 0 5% 0;'><span style='display: inline-block;width: 30%;text-align: right;'>密码：</span><span style='display: inline-block;width: 70%;'><input id='login_password' type='password' ng-model='loginRequest.Password' placeholder='密码' class='form-control' ng-keyup='enterLogin($event);'ng-readonly='isLoading'></span></div><div ng-show='!isLoading'><button class='btn btn-primary' style='width: 30%;' ng-click='login();'>登 录</button></div><div class='login_spinner' ng-show='isLoading'><div class='login_bounce1'></div><div class='login_bounce2'></div><div class='login_bounce3'></div></div></div></div></div>",
        replace: true
    }
});
menuModule.directive("push", function() {
    return {
        restrict: "E",
        template: "<div class='modal fade' id='push_div' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' data-backdrop='static'><div class='modal-dialog modal_push_h modal_push_w'><div class='modal-content modal_content_custom'><div class='modal-header modal_head modal_header_height'><div data-dismiss='modal' aria-hidden='true' style='display:inline-block;float:right;' title='关闭'><span class='icon-stack'><i class='icon-check-empty icon-stack-base'></i><i class='icon-remove icon-light'></i></span></div><span class='head_title'>消息推送</span></div><div class='modal-body modal_push_body_h'><div style='margin: 0 0 2px 0;'><span ng-class='{&quot;plat_menu tlt_w menu_active&quot;: isPat, &quot;plat_menu tlt_w menu_disabled&quot;: !isPat}' ng-click='showPat();'>新增患者</span><span ng-class='{&quot;plat_menu tlt_w menu_active&quot;: isApp, &quot;plat_menu tlt_w menu_disabled&quot;: !isApp}' ng-click='showApp();'>新增预约</span></div><div ng-show='isPat' class='push_con_h'><div class='bell_item_l'><span class='bell_item_h bell_item_w_2 tlt_font'>患者姓名</span><span class='bell_item_h bell_item_w_0 tlt_font'>性别</span><span class='bell_item_h bell_item_w_3 tlt_font'>手机号</span><span class='bell_item_h bell_item_w_1 tlt_font'>年龄</span><span class='bell_item_h bell_item_w_4 tlt_font'>地址</span></div><div class='source_list push_list_h'><div ng-class='{&quot;bell_item_out_h bell_list_item bell_item_disabled&quot;: !item.isSeed, &quot;bell_item_out_h bell_list_item&quot;: item.isSeed}' ng-repeat='item in sourceList | filter:{Type: 2}' ng-click='seeItem(item);'><span class='bell_item_h bell_item_w_2' ng-bind='item.Content.Name'></span><span class='bell_item_h bell_item_w_0'><span ng-show='item.Content.Gender == 1'>男</span><span ng-show='item.Content.Gender != 1'>女</span></span><span class='bell_item_h bell_item_w_3' ng-bind='item.Content.Mobile'></span><span class='bell_item_h bell_item_w_1' ng-bind='calculateAge(item.Content.Birthday);'></span><span class='bell_item_h bell_item_w_4' ng-bind='item.Content.Address'></span></div></div></div><div ng-show='isApp' class='push_con_h'><div class='bell_item_l'><span class='bell_item_h bell_item_w_2 tlt_font'>患者姓名</span><span class='bell_item_h bell_item_w_0 tlt_font'>性别</span><span class='bell_item_h bell_item_w_2 tlt_font'>预约医生</span><span class='bell_item_h bell_item_w_2 tlt_font'>预约事项</span><span class='bell_item_h bell_item_w_4 tlt_font'>预约时间</span></div><div class='source_list push_list_h'><div ng-class='{&quot;bell_item_out_h bell_list_item bell_item_disabled&quot;: !item.isSeed, &quot;bell_item_out_h bell_list_item&quot;: item.isSeed}' ng-repeat='item in sourceList | filter:{Type: 1}' ng-click='seeItem(item);'><span class='bell_item_h bell_item_w_2' ng-bind='item.Content.Appoint.PatientName'></span><span class='bell_item_h bell_item_w_0'><span ng-show='item.Content.Appoint.Gender == 1'>男</span><span ng-show='item.Content.Appoint.Gender != 1'>女</span></span><span class='bell_item_h bell_item_w_2' ng-bind='item.Content.Appoint.DoctorName'></span><span class='bell_item_h bell_item_w_2' ng-bind='item.Content.Appoint.AppointItemName'></span><span class='bell_item_h bell_item_w_4' ng-bind='formatDate(item.Content.Appoint.BeginTime);'></span></div></div></div></div></div></div>",
        replace: true
    }
});
menuModule.factory("menuFactory", ["$location", function(c) {
    var b = CommonFun.getDataFromSession("CurrentUser");
    if (b == null && c.absUrl().lastIndexOf("Register.html") <= 0) {
        window.location.href = "Login.html";
        return
    }
    var a = b.Body;
    return {
        menuList: [{
            ID: MenuEnum.PlatformMG,
            title: "工作平台",
            pageUrl: "../WebPages/DCPlatformMG.html",
            icon: "icon-desktop",
            target: "_self"
        }, {
            ID: MenuEnum.PatientMG,
            title: "患者管理",
            pageUrl: "../WebPages/DCPatientMG.html",
            icon: "icon-group",
            target: "_self"
        }, {
            ID: MenuEnum.BookMG,
            title: "预约管理",
            pageUrl: "../WebPages/DCBookMG.html",
            icon: "icon-time",
            target: "_self"
        }, {
            ID: MenuEnum.ClinicMG,
            title: "诊所管理",
            pageUrl: "../WebPages/DCClinicMG.html",
            icon: "icon-home",
            target: "_self"
        }, {
            ID: MenuEnum.DataStatic,
            title: "数据统计",
            pageUrl: "../WebPages/DCDataStatistics.html",
            icon: "icon-bar-chart",
            target: "_self"
        }, {
            ID: MenuEnum.SupplyPlatform,
            title: "产品目录",
            pageUrl: "http://mall.niuluo-tech.cn?token=" + a.ThirdToken,
            icon: "icon-tasks",
            target: "_blank"
        }, {
            ID: MenuEnum.SystemSet,
            title: "系统设置",
            pageUrl: "../WebPages/DCSystemSet.html",
            icon: "icon-gear",
            target: "_self"
        }],
        DealCurrentUserRequest: function(e) {
            var d = e;
            if (e != undefined && e != null) {
                d = {
                    ID: e.ID,
                    UserID: e.UserID,
                    UserName: e.UserName,
                    Password: e.Password,
                    IP: e.IP,
                    CreateTime: e.CreateTime,
                    LoginState: e.LoginState,
                    LastLoginTime: e.LastLoginTime,
                    Gender: e.Gender,
                    Email: e.Email,
                    Birthday: new Date(e.Birthday).Format("yyyy-MM-dd"),
                    Mobile: e.Mobile,
                    RoleID: e.RoleID,
                    PostID: e.PostID,
                    State: e.State,
                    TenantID: e.TenantID,
                    JobTitle: e.JobTitle,
                    IsDoctor: e.IsDoctor
                }
            }
            return d
        }
    }
}
]);
menuModule.service("MenuService", ["ResourceFactory", "HttpService", "menuFactory", "PermissionFactory", "$upload", "$window", function(b, c, f, a, e, g) {
    var d = {};
    d.convertUser = function(h) {
        return f.DealCurrentUserRequest(h)
    }
    ;
    d.saveTenant = function(h) {
        try {
            c.tenantRequest(h.clinicInfo, b.operateCode.update, function(k) {
                if (k.Header.StatusCode == 0) {
                    var j = CommonFun.getDataFromSession("CurrentUser");
                    j.Body.Tenant = k.Body;
                    CommonFun.saveDataToSession("CurrentUser", j);
                    $("#clinic_info").modal("hide");
                    d.alert("保存成功！")
                } else {
                    d.alert(GetErrormsg(k.Header.StatusCode))
                }
            }, function(j) {
                d.alert("系统繁忙，请稍后重试！");
                console.log(j)
            })
        } catch (i) {
            console.log(i)
        }
    }
    ;
    d.savePersonInfo = function(h) {
        var i = f.DealCurrentUserRequest(h.currentUser);
        try {
            c.employeeRequest(i, b.operateCode.update, function(l) {
                if (l.Header.StatusCode == 0) {
                    var k = CommonFun.getDataFromSession("CurrentUser");
                    k.Body.User = l.Body;
                    CommonFun.saveDataToSession("CurrentUser", k);
                    $("#person_info").modal("hide")
                } else {
                    d.alert(GetErrormsg(l.Header.StatusCode))
                }
            }, function(k) {
                d.alert("系统繁忙，请稍候重试！");
                console.log(k)
            })
        } catch (j) {
            console.log(j)
        }
    }
    ;
    d.getMenuList = function() {
        return a.getModules(f.menuList)
    }
    ;
    d.logout = function() {
        try {
            c.logoutRequest("", b.operateCode.update, function(i) {}, function(i) {})
        } catch (h) {
            console.log(h)
        }
    }
    ;
    d.uploadFiles = function(i, h) {
        try {
            e.upload({
                url: WebServer.getUrl("UpLoadLogo"),
                file: i
            }).success(function(k) {
                h.tenantLogo = FileURL + "Image/" + k.Body.Logo;
                h.clinicInfo.Logo = k.Body.Logo
            }).error(function(k) {
                d.alert("上传文件失败");
                console.log(k)
            })
        } catch (j) {
            console.log(j)
        }
    }
    ;
    d.init = function() {
        b.module = 0
    }
    ;
    d.login = function(i, h) {
        try {
            c.loginRequest(i, function(k) {
                h.isLoading = false;
                if (k.Header.StatusCode == 0) {
                    $("#login_div").modal("hide");
                    CommonFun.saveDataToSession("CurrentUser", k);
                    g.location.reload()
                } else {
                    d.alert(GetErrormsg(k.Header.StatusCode))
                }
            }, function(k) {
                d.alert("系统繁忙，请稍候重试！");
                console.log(k)
            })
        } catch (j) {
            console.log(j)
        }
    }
    ;
    d.confirm = function(i, j, h) {
        b.MsgBox.Confirm("温馨提示", i, j, h)
    }
    ;
    d.alert = function(h) {
        b.MsgBox.Alert("消息", h)
    }
    ;
    return d
}
]);
menuModule.controller("MenuController", ["$scope", "MenuService", "PushMessageService", function(a, c, b) {
    a.menuInfo = {};
    var d = function(e, f, g) {
        if (g) {
            $("#" + g).validationEngine("hideAll");
            $("#" + g).validationEngine("showPrompt", f, "", "bottomLeft", true)
        } else {
            $(e).validationEngine("hideAll");
            $(e).validationEngine("showPrompt", f, "", "bottomLeft", true)
        }
    };
    a.enterLogin = function(g) {
        var f = window.event ? g.keyCode : g.which;
        if (f == 13) {
            a.login()
        }
    }
    ;
    a.login = function() {
        a.isLoading = true;
        if (!a.loginRequest.UserName) {
            d("", "请输入账户", "login_name");
            return
        }
        if (!a.loginRequest.Password) {
            d("", "请输入密码", "login_password");
            return
        }
        if (CommonFun.checkFormat(a.loginRequest.UserName, DataTypeEnum.Email)) {
            a.loginRequest.AccountType = 2
        } else {
            if (CommonFun.checkFormat(a.loginRequest.UserName, DataTypeEnum.PhoneMobile)) {
                a.loginRequest.AccountType = 3
            } else {
                a.loginRequest.AccountType = 1
            }
        }
        c.login(a.loginRequest, a)
    }
    ;
    a.initialize = function() {
        window.onresize = function() {
            if (window.innerHeight >= 660) {
                $("#main-content").css("height", window.innerHeight);
                $("#sidebar").css("height", window.innerHeight);
                $("body").css("height", window.innerHeight)
            }
        }
        ;
        if ($("#main-content").length > 0) {
            if (window.innerHeight >= 660) {
                $("#main-content").css("height", window.innerHeight);
                $("#sidebar").css("height", window.innerHeight);
                $("body").css("height", window.innerHeight)
            }
        }
        var g = CommonFun.getDataFromSession("MsgCount");
        a.msgCount = !g ? 0 : parseInt(g);
        b.initAllSub(a);
        a.menuList = c.getMenuList();
        a.isLoading = false;
        $("#birthday_user").datetimepicker({
            format: "yyyy-mm-dd",
            language: "en",
            pickDate: true,
            pickTime: true,
            hourStep: 1,
            minView: 2,
            maxView: 4,
            minuteStep: 15,
            secondStep: 30,
            inputMask: true
        });
        var h = CommonFun.getDataFromSession("CurrentUser").Body.Tenant;
        a.tenantLogo = null;
        a.loginRequest = {
            UserName: "",
            Password: "",
            AccountType: 2,
            UserType: 1
        };
        a.accountTypeList = [{
            Type: 1,
            Name: "诊所主账户"
        }, {
            Type: 2,
            Name: "普通账户"
        }];
        if (h != null) {
            a.tenantLogo = h.Logo == null ? "../images/loginImg/logo.png" : (FileURL + "Image/" + h.Logo)
        }
        var f = h.Logo == null ? "../Images/logo.ico" : a.tenantLogo;
        var e = !h.TenantName ? "纽罗口腔" : h.TenantName;
        $("title").html(e);
        $("#icon_link").prop("href", f)
    }
    ;
    a.genders = [{
        Type: 1,
        Name: "男"
    }, {
        Type: 2,
        Name: "女"
    }];
    a.showCurrentUser = function(i) {
        var g = $("#sidebar").width();
        var h = $(i.target).parent()[0].offsetTop;
        var k = $("#post_card");
        var f = CommonFun.getDataFromSession("CurrentUser");
        var j = f.Body.UserType;
        a.currentUser = c.convertUser(f.Body.User);
        if (f.Body.UserType == 2) {
            a.currentUser.Role = f.Body.Role.RoleName
        }
        switch (j) {
        case 1:
            if (a.currentUser == null || a.currentUser == "") {
                a.currentUser = {
                    ID: 0,
                    UserID: 0,
                    Password: "",
                    IP: "",
                    CreateTime: "",
                    LoginState: 1,
                    LastLoginTime: "",
                    Gender: 0,
                    Email: "",
                    Birthday: "",
                    Mobile: "",
                    RoleID: "",
                    PostID: "",
                    State: 0,
                    TenantID: f.Body.Tenant.TenantID,
                    UserName: "暂无",
                    GenderName: "暂无",
                    JobTitle: "",
                    isDoctor: ""
                }
            }
            break;
        case 2:
            a.currentUser.Gender == 1 ? a.currentUser.GenderName = "男" : a.currentUser.GenderName = "女";
            break;
        default:
            break
        }
        switch (a.currentUser.JobTitle) {
        case 1:
            a.currentUser.JobTitleName = "主任";
            break;
        case 2:
            a.currentUser.JobTitleName = "主治医师";
            break;
        case 3:
            a.currentUser.JobTitleName = "护士长";
            break;
        case 4:
            a.currentUser.JobTitleName = "无职称";
            break;
        default:
            a.currentUser.JobTitleName = "院长";
            break
        }
        a.currentUser.UserType = j;
        k.css({
            position: "absolute",
            left: g,
            top: h,
            "z-index": "1040",
            "border-radius": "8px",
            "border-width": "1px",
            "border-right-style": "groove",
            "border-left-style": "groove",
            "border-bottom-style": "groove",
            "background-color": "aliceblue"
        });
        k.toggle("slow")
    }
    ;
    a.showPersonInfo = function() {
        $("#person_info .show_item").show();
        $("#person_info .hide_item").hide();
        $("#post_card").toggle("hide");
        $("#person_info").modal("show")
    }
    ;
    a.showClinicInfo = function() {
        a.clinicInfo = CommonFun.getDataFromSession("CurrentUser").Body.Tenant;
        $("#clinic_info .show_item").show();
        $("#clinic_info .hide_item").hide();
        $("#post_card").toggle("hide");
        $("#clinic_info").modal("show")
    }
    ;
    a.logout = function() {
        c.confirm("确定要退出当前系统吗？", function() {
            c.logout();
            CommonFun.deleteDataFromSession("CurrentUser");
            CommonFun.deleteDataFromSession("MsgCount");
            CommonFun.deleteDataFromSession("PushList");
            window.location.href = "Login.html"
        })
    }
    ;
    a.editTenant = function() {
        if (a.currentUser.UserType != 1) {
            c.alert("对不起，您没有权限，请联系管理员！");
            return
        }
        $("#clinic_info .show_item").css("display", "none");
        $("#clinic_info .hide_item").css("display", "inline-block");
        a.selectFile = function() {
            $("#selectLogo").click()
        }
        ;
        a.changeFile = function(e) {
            c.uploadFiles(e, a)
        }
    }
    ;
    a.saveTenant = function() {
        c.saveTenant(a)
    }
    ;
    a.editPersonInfo = function() {
        $("#person_info .show_item").css("display", "none");
        $("#person_info .hide_item").css("display", "inline-block")
    }
    ;
    a.savePersonInfo = function() {
        c.savePersonInfo(a)
    }
    ;
    a.cancelEdit = function() {
        $("#clinic_info .show_item").css("display", "inline-block");
        $("#clinic_info .hide_item").css("display", "none")
    }
    ;
    a.calculateAge = function(e) {
        if (e) {
            return CommonFun.calculateAge(new Date(e).Format("yyyy-MM-dd"))
        } else {
            return ""
        }
    }
    ;
    a.formatDate = function(e) {
        if (e) {
            return new Date(new Date(e)).toISOString().replace(/T/g, " ").replace(/\.[\d]{3}Z/, "")
        } else {
            return ""
        }
    }
    ;
    a.showPushMsg = function() {
        a.isPat = true;
        a.isApp = false;
        a.sourceList = CommonFun.getDataFromSession("PushList");
        $("#post_card").hide();
        $("#push_div").modal("show")
    }
    ;
    a.showPat = function() {
        a.isPat = true;
        a.isApp = false
    }
    ;
    a.showApp = function() {
        a.isPat = false;
        a.isApp = true
    }
    ;
    a.seeItem = function(g) {
        var e = [];
        e = CommonFun.getDataFromSession("PushList");
        if (e && e.length > 0 && !g.isSeed) {
            g.isSeed = true;
            for (var f = 0; f < e.length; f++) {
                if (g.Type == e[f].Type && g.ID == e[f].ID) {
                    e.splice(f, 1);
                    a.msgCount--;
                    break
                }
            }
            CommonFun.saveDataToSession("MsgCount", a.msgCount);
            CommonFun.saveDataToSession("PushList", e)
        }
    }
    ;
    a.initialize()
}
]);
angular.bootstrap($("aside"), ["MenuModule"]);
var MenuActive = {
    setActive: function(a) {
        switch (a) {
        case MenuEnum.PlatformMG:
            $("#menu_" + MenuEnum.PlatformMG).addClass("active");
            break;
        case MenuEnum.PatientMG:
            $("#menu_" + MenuEnum.PatientMG).addClass("active");
            break;
        case MenuEnum.BookMG:
            $("#menu_" + MenuEnum.BookMG).addClass("active");
            break;
        case MenuEnum.ClinicMG:
            $("#menu_" + MenuEnum.ClinicMG).addClass("active");
            break;
        case MenuEnum.DataStatic:
            $("#menu_" + MenuEnum.DataStatic).addClass("active");
            break;
        case MenuEnum.SystemSet:
            $("#menu_" + MenuEnum.SystemSet).addClass("active");
            break;
        case MenuEnum.SupplyPlatform:
            break;
        default:
            break
        }
        isActive = "active"
    }
};
var calendarModule = angular.module("CalendarModule", ["ui.calendar"]);
calendarModule.service("CalendarService", ["uiCalendarConfig", "$compile", function(b, d) {
    var g = {};
    var h = function() {
        var k = new Date();
        var s = k.getDate();
        var l = k.getMonth();
        var t = k.getFullYear();
        var n = k.getMinutes();
        var o = k.getHours();
        var p = 0;
        var j = 0;
        var r = 0;
        var q = 0;
        if (n > 30) {
            j = o + 1;
            p = 0;
            q = o + 1;
            r = 30
        } else {
            j = o;
            p = 30;
            q = o + 1;
            r = 0
        }
        return {
            startTime: new Date(t,l,s,j,p),
            endTime: new Date(t,l,s,q,r)
        }
    };
    var e = function(k) {
        var j = new Date();
        return new Date(k.toDate().getTime() + (j.getTimezoneOffset() * 60000))
    };
    var i = null;
    var a = h();
    var c = a.startTime;
    var f = a.endTime;
    g.setScope = function(j) {
        i = j
    }
    ;
    g.events = [{
        id: 10000,
        title: "预约",
        start: c,
        end: f
    }];
    g.getDateTime = function() {
        return h()
    }
    ;
    g.renewEvents = function() {
        var j = h();
        g.events.splice(0, 1);
        var k = {
            id: 10000,
            title: "预约",
            start: j.startTime,
            end: j.endTime
        };
        g.events.push(k)
    }
    ;
    g.select = function(n, j) {
        var l = n._d.toJSON();
        var k = new Date();
        k = new Date(k.getTime() - (k.getTimezoneOffset() * 60000)).toJSON();
        if (l < k) {
            return
        }
        g.events.splice(0, 1);
        var m = {
            id: 10000,
            title: "预约",
            start: n,
            end: j
        };
        g.events.push(m);
        i.startTime = e(n);
        i.endTime = e(j);
        if (i.addAppoint != undefined && typeof i.addAppoint == "function") {
            i.appointSources.splice(0, 1);
            i.addAppoint();
            i.newStartTime = e(n).Format("yyyy-MM-dd hh:mm");
            i.calendarDate = e(n).Format("yyyy-MM-dd");
            i.newEndTime = e(j).Format("yyyy-MM-dd hh:mm");
            g.gotoDate("new_calender", i.calendarDate)
        }
    }
    ;
    g.gotoDate = function(k, j) {
        b.calendars[k].fullCalendar("gotoDate", j)
    }
    ;
    g.refreshEventSources = function(j) {
        b.calendars[j].fullCalendar("removeEvents");
        b.calendars[j].fullCalendar("addEventSource", i.events);
        b.calendars[j].fullCalendar("rerenderEvents")
    }
    ;
    g.refreshEvent = function(j) {
        b.calendars[j].fullCalendar("removeEvents");
        b.calendars[j].fullCalendar("rerenderEvents")
    }
    ;
    g.addEventSources = function(j) {
        b.calendars[j].fullCalendar("addEventSource", i.events)
    }
    ;
    g.removeEventSources = function(j, k) {
        b.calendars[j].fullCalendar("removeEvents", [k])
    }
    ;
    g.alertOnEventClick = function(l, k, j) {
        if (i.showCurrentAppoint && l.source && l.source.origArray.length > 0) {
            var n = l.id;
            for (var m = 0; m < l.source.origArray.length; m++) {
                if (n == l.source.origArray[m].id) {
                    i.showCurrentAppoint(l.source.origArray[m].source);
                    break
                }
            }
        }
    }
    ;
    g.alertOnDrop = function(o, q, n, k, p, j) {
        var m = o.start.toJSON();
        var l = new Date();
        l = new Date(l.getTime() - (l.getTimezoneOffset() * 60000)).toJSON();
        if (m < l) {
            n();
            return
        }
        i.startTime = e(o.start);
        i.endTime = e(o.end)
    }
    ;
    g.alertOnResize = function(m, o, l, k, n, j) {
        i.startTime = e(m.start);
        i.endTime = e(m.end)
    }
    ;
    g.changeView = function(j, k) {
        b.calendars[k].fullCalendar("changeView", j)
    }
    ;
    g.getView = function(j) {
        return b.calendars[j].fullCalendar("getView")
    }
    ;
    g.renderCalender = function(j) {
        if (b.calendars[j]) {
            b.calendars[j].fullCalendar("render")
        }
    }
    ;
    g.eventRender = function(l, k, j) {}
    ;
    g.uiConfig = {
        calendar: {
            height: 350,
            header: {
                left: "",
                center: "",
                right: "today prev,next"
            },
            theme: true,
            axisFormat: "H(:mm):00",
            timeFormat: "H:mm",
            minTime: "8:00",
            maxTime: "23:00",
            allDaySlot: false,
            editable: true,
            selectable: true,
            dayNames: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesShort: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            eventClick: g.alertOnEventClick,
            eventDrop: g.alertOnDrop,
            eventResize: g.alertOnResize,
            eventRender: g.eventRender,
            select: g.select,
            buttonText: {
                today: "今天",
                month: "月",
                week: "周",
                day: "日",
                listMonth: "月列表",
                listDay: "日列表",
                listWeek: "周列表"
            }
        }
    };
    g.eventSources = [g.events];
    return g
}
]);
var patientCommonModule = angular.module("PatientCommonModule", []);
patientCommonModule.directive("patient", function() {
    return {
        restrict: "E",
        template: '<div class="modal fade" id="medical_record" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static"><div class="modal-dialog med_modal_h med_modal_w"><div class="modal-content modal_content_custom"><div class="modal-header modal_head modal_header_height"><div style=\'display:inline-block;float:right;\' title=\'关闭\' ng-click=\'closeMedicacl();\'><span class=\'icon-stack\'><i class=\'icon-check-empty icon-stack-base\'></i><i class=\'icon-remove icon-light\'></i></span></div><span class=\'head_title\'>病案编辑</span></div><div class="modal-body med_bd_h"><div class="agreement_div box_shadow" id="agreement"><div class="ag_head no-print"><span class="ag_w_1"><span class="icon-download-alt" ng-click="downloadAgreement();">下载同意书</span></span><span class="ag_w_1"><span class="icon-print" ng-click="print(&quot;agreement_con&quot;, 1);">打印同意书</span></span><span class="ag_w_2"><select class="form-control input-sm" ng-model="selectedAgreement" ng-options="x as x.Name for x in agreementList" ng-change="previewAgreement();"><option value="">请选择同意书</option></select></span><span class="ag_w_1 ag_cls"><span ng-click="closeAgreement();" class="icon-remove-circle"></span></span></div><div class="ag_bd" id="agreement_con"><div class="ag_title"><span ng-bind="agreementCon.Title"></span></div><div ng-repeat="item in agreementCon.Content"><div><span ng-bind="item.Title" style="font-weight: bold;"></span></div><div ng-repeat="i in item.Items"><span class="ag_item" ng-bind="i"></span></div></div></div></div><div class="item_sp med_h"><span class="med_h cus_float_lf bell_item_w_1 txt_rg">就诊事项：</span><span class="med_h cus_float_lf bell_item_w_4 txt_lf eq_mg" ng-bind="currentMedicalRecord.Appointment.AppointItemName"></span><span class="med_h cus_float_lf bell_item_w_1 txt_rg">就诊时间：</span><span class="med_h cus_float_lf bell_item_w_2 txt_lf" ng-bind="currentMedicalRecord.Appointment.BeginTime"></span><span class="cus_float_rg bell_item_w_0 txt_rg no-print"><a href="javascript:void(0);" ng-click="previewAgreement();">预览知情同意书</a></span></div><div class="item_sp med_h"><span class="med_h cus_float_lf bell_item_w_1 txt_rg">就诊医生：</span><span class="med_h cus_float_lf bell_item_w_4 txt_lf eq_mg" ng-bind="currentMedicalRecord.Appointment.DoctorName"></span><span class="med_h cus_float_lf bell_item_w_1 txt_rg">检查护士：</span><span class="med_h cus_float_lf bell_item_w_2 txt_lf"><input class="form-control input-sm" type="text" ng-model="currentMedicalRecord.NurseName" placeholder="请输入护士姓名"></span></div><div class="item_sp med_up_2"><span class="med_h cus_float_lf bell_item_w_1 txt_rg">影像资料：</span><span class="med_h cus_float_lf item_w_1 txt_cen"><a href="javascript:void(0);" class="icon-plus" ng-click="selectFile();"></a><br><br></span><span class="item_w_6 cus_float_lf item_h_1"><span class="item_w_7 lt_bodr med_pd item_h_1" id="selected_files" style="white-space: nowrap;overflow-x: auto;"><span class="med_unit med_unit_w item_h_1 cus_float_lf" ng-repeat="item in currentMedicalRecord.TreatFileList"><span class="cus_float_lf item_h_1 bell_item_w_5"><span class="op_h txt_cen pic_siz cus_float_lf item_w_7 file_type {{item.ClassName}}" ng-click="showFileDetail(item, $event, $index);"></span><span class="op_h_1 txt_cen cus_float_lf item_w_7 txt_over" ng-bind="item.SourceName"></span></span><span class="cus_float_rg item_h_1 bell_item_w_1 op_h"><a href="javascript:void(0);" class="icon-trash" style="display:inline-block" ng-click="deleteFile(item, $event);"></a><br><a ng-if="item.isShowUpload" href="javascript:void(0);" class="icon-upload" style="display:inline-block" ng-click="uploadSingleFile(item, $event);"></a><a id="down_load" ng-if="!item.isShowUpload" href="" download="" class="icon-download" style="display:inline-block" ng-click="downloadSingleFile(item, $event);"></a></span></span></span><input type="file" file-model="myFiles" id="selectFile" ng-file-select="addFiles($files);" multiple style="opacity:0;display:none;"></span><span class="cus_float_rg bell_item_w_0 txt_rg no-print"><a href="javascript:void(0);" class="icon-print" ng-click="print(&apos;print_template&apos;);">打印病案</a></span></div><div class="item_sp med_h"><span class="bell_item_w_1 tlt_bk">病案内容</span></div><div class="med_con_h item_sp"><span class="item_h_1 item_w_6 cus_float_lf" style="overflow-y:auto;"><table class="table table-bordered cus_div"><tbody class="cus_div"><tr><td><div class="col-lg-12">主诉</div></td><td colspan="2"><input type="text" name="ChiefComplaints" ng-blur="recordCurrentItem($event, 1, true);" class="form-control input-sm" placeholder="主诉" ng-model="currentMedicalRecord.ChiefComplaints"></td></tr><tr><td><div class="col-lg-12">现病史</div></td><td colspan="2"><input type="text" name="PresentIllness" ng-blur="recordCurrentItem($event, 2, true);" class="form-control input-sm" placeholder="现病史" ng-model="currentMedicalRecord.PresentIllness"></td></tr><tr><td><div class="col-lg-12">既往史</div></td><td colspan="2"><input type="text" name="PastHistory" ng-blur="recordCurrentItem($event, 3, true);" class="form-control input-sm" placeholder="既往史" ng-model="currentMedicalRecord.PastHistory"></td></tr><tr><td><div class="col-lg-12">过敏史</div></td><td colspan="2"><input type="text" name="AllergyHistory" ng-blur="recordCurrentItem($event, 4, true);" class="form-control input-sm" placeholder="过敏史" ng-model="currentMedicalRecord.AllergyHistory"></td></tr><tr class="md_check" ng-repeat="item in currentMedicalRecord.CheckItems"><td><div class="col-lg-8">{{item.ItemName}}</div><div class="col-lg-4"><a href="javascript:void(0);" class="icon-plus" ng-click="addItem(1, $event, item.DetailContent)"></a></div></td><td class="cus_tr"><div class="div_outer_tooth" ng-click="drawTooth($event, item, true);"><input type="hidden" class="tooth_type" value="1"/><div class="div_top_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_top_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div><br><div class="div_bottom_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_bottom_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div></div></td><td class="sec_td"><textarea name="jianchaContent" ng-blur="recordCurrentItem($event, 5, true);" type="text" class="form-control input-sm cus_textArea" placeholder="检查" ng-model="item.DetailContent">{{item.DetailContent}}</textarea></td></tr><tr class="md_help_check" ng-repeat="item in currentMedicalRecord.HelpCheckItems"><td><div class="col-lg-8">{{item.ItemName}}</div><div class="col-lg-4"><a href="javascript:void(0);" class="icon-plus" ng-click="addItem(2, $event, item.DetailContent)"></a></div></td><td class="cus_tr"><div class="div_outer_tooth" ng-click="drawTooth($event, item, true);"><input type="hidden" class="tooth_type" value="1"/><div class="div_top_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_top_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div><br><div class="div_bottom_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_bottom_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div></div></td><td class="sec_td"><textarea name="fuzhujiancha" ng-blur="recordCurrentItem($event, 6, true);" type="text" class="form-control input-sm cus_textArea" placeholder="辅助检查" ng-model="item.DetailContent">{{item.DetailContent}}</textarea></td></tr><tr class="md_diagnose" ng-repeat="item in currentMedicalRecord.DiagnoseItems"><td><div class="col-lg-8">{{item.ItemName}}</div><div class="col-lg-4"><a href="javascript:void(0);" class="icon-plus" ng-click="addItem(3, $event, item.DetailContent)"></a></div></td><td class="cus_tr"><div class="div_outer_tooth" ng-click="drawTooth($event, item, true);"><input type="hidden" class="tooth_type" value="1"/><div class="div_top_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_top_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div><br><div class="div_bottom_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_bottom_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div></div></td><td class="sec_td"><textarea name="zhenduanContent" ng-blur="recordCurrentItem($event, 7, true);" type="text" class="form-control input-sm cus_textArea" placeholder="诊断" ng-model="item.DetailContent">{{item.DetailContent}}</textarea></td></tr><tr class="md_treat" ng-repeat="item in currentMedicalRecord.TreatItems"><td><div class="col-lg-8">{{item.ItemName}}</div><div class="col-lg-4"><a href="javascript:void(0);" class="icon-plus" ng-click="addItem(4, $event, item.DetailContent)"></a></div></td><td class="cus_tr"><div class="div_outer_tooth" ng-click="drawTooth($event, item, true);"><input type="hidden" class="tooth_type" value="1"/><div class="div_top_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_top_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div><br><div class="div_bottom_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_bottom_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div></div></td><td class="sec_td"><textarea name="zhiliaoContent" ng-blur="recordCurrentItem($event, 8, true);" type="text" class="form-control input-sm cus_textArea" placeholder="治疗" ng-model="item.DetailContent">{{item.DetailContent}}</textarea></td></tr></tbody></table></span><span class="item_h_1 bell_item_w_4 cus_float_lf lt_bodr no-print" style="overflow-y: auto;"><h1>病历模版</h1><div id="advice_tree"></div></span></div><div class="item_sp med_h"><span class="bell_item_w_1 tlt_bk">医嘱信息</span></div><div class="item_sp med_h"><span class="med_h cus_float_lf bell_item_w_1 txt_rg">使用医嘱模版：</span><span class="med_h cus_float_lf bell_item_w_2 txt_lf"><select class="form-control input-sm" ng-change="getAdviceContent();" ng-model="selectedAdviceTemplate" ng-options="item as item.Name for item in adviceTemplates"><option value="">请选择医嘱模版</option></select></span></div><div class="item_sp med_up_2"><span class="cus_float_lf bell_item_w_1 txt_rg">医嘱内容：</span><span class="cus_float_lf bell_item_w_5 item_h_1"><textarea class="form-control" ng-model="currentMedicalRecord.Advice" style="height: 100%;"></textarea></span></div><div class="item_sp med_up_3 txt_cen"><span class="bell_item_w_2"><button class="btn cus_btn_color cus_btn_width" ng-click="saveMedicalRecord();">保 存</button></span></div></div></div></div></div>',
        replace: true
    }
});
patientCommonModule.directive("tooth", function() {
    return {
        restrict: "E",
        template: '<div id="tooth" class="hide_item tooth_modal to_mod_h to_mod_w box_shadow"><div class="div_modal_title to_tlt_h"><ul class="div_modal_title nav nav-tabs tab-bg-dark-navy-blue"><li class="active"><a data-toggle="tab" href="#permanent_teeth" class="menu_title" ng-click="switchTooth(1);">恒 牙</a></li><li class=""><a data-toggle="tab" href="#baby_teeth" class="menu_title" ng-click="switchTooth(2);">乳 牙</a></li><li class="close-info ifright margin-zero" ng-click="closeTooth();" title="取消"></li><li class="save-info ifright margin-zero" ng-click="saveSelectedTeeth();" title="保存"></li></ul></div><div class="to_bd_h"><div class="platform_height"><div class="tab-content platform_height too_mid"><div id="permanent_teeth" class="tab-pane active platform_height"><div class="tooth_div platform_height"><div class="tooth_unit tooth_left tooth_top_left"><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_left_08.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 1);" data-bind="1">8</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_left_07.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 1);" data-bind="1">7</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_left_06.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 1);" data-bind="1">6</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_left_05.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 1);" data-bind="1">5</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_left_04.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 1);" data-bind="1">4</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_left_03.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 1);" data-bind="1">3</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_left_02.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 1);" data-bind="1">2</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_left_01.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 1);" data-bind="1">1</span></div></div><div class="tooth_unit tooth_right tooth_top_right"><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_right_01.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 2);" data-bind="2">1</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_right_02.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 2);" data-bind="2">2</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_right_03.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 2);" data-bind="2">3</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_right_04.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 2);" data-bind="2">4</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_right_05.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 2);" data-bind="2">5</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_right_06.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 2);" data-bind="2">6</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_right_07.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 2);" data-bind="2">7</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/top_right_08.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 2);" data-bind="2">8</span></div></div><div class="split_line"><div class="div_cus">————————<span>左</span>—————————</div><div class="div_cus">————————<span>右</span>—————————</div></div><div class="tooth_unit tooth_left tooth_bottom_left"><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 3);" data-bind="3">8</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_left_08.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 3);" data-bind="3">7</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_left_07.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 3);" data-bind="3">6</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_left_06.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 3);" data-bind="3">5</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_left_05.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 3);" data-bind="3">4</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_left_04.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 3);" data-bind="3">3</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_left_03.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 3);" data-bind="3">2</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_left_02.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 3);" data-bind="3">1</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_left_01.png"/></span></div></div><div class="tooth_unit tooth_right tooth_bottom_right"><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 4);" data-bind="4">1</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_right_01.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 4);" data-bind="4">2</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_right_02.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 4);" data-bind="4">3</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_right_03.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 4);" data-bind="4">4</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_right_04.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 4);" data-bind="4">5</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_right_05.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 4);" data-bind="4">6</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_right_06.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 4);" data-bind="4">7</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_right_07.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 4);" data-bind="4">8</span><span><img class="tooth_img" src="../Images/Custom/PermanentTooth/bottom_right_08.png"/></span></div></div></div><hr style="width:2px;height:50%;position:absolute;background-color:#ddd;top:25%;left:54%;"></hr><div style="position:absolute;top:20%;"><span>反选</span>&nbsp;&nbsp;<span><input type="checkbox" id="constant_select_reverse" ng-click="quickSelect(2, 1);"></span></div></div><div id="baby_teeth" class="tab-pane"><div class="tooth_div"><div class="tooth_unit tooth_left tooth_top_left"><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/BabyTooth/top_left_05.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 1);" data-bind="1">E</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/BabyTooth/top_left_04.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 1);" data-bind="1">D</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/BabyTooth/top_left_03.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 1);" data-bind="1">C</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/BabyTooth/top_left_02.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 1);" data-bind="1">B</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/BabyTooth/top_left_01.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 1);" data-bind="1">A</span></div></div><div class="tooth_unit tooth_right tooth_top_right"><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/BabyTooth/top_right_01.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 2);" data-bind="2">A</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/BabyTooth/top_right_02.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 2);" data-bind="2">B</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/BabyTooth/top_right_03.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 2);" data-bind="2">C</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/BabyTooth/top_right_04.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 2);" data-bind="2">D</span></div><div class="tooth_single_unit"><span><img class="tooth_img" src="../Images/Custom/BabyTooth/top_right_05.png"/></span><span class="tooth_span" ng-click="clickTooth($event, 2);" data-bind="2">E</span></div></div><div class="split_line"><div class="div_cus">————————<span>左</span>—————————</div><div class="div_cus">————————<span>右</span>—————————</div></div><div class="tooth_unit tooth_left tooth_bottom_left"><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 3);" data-bind="3">E</span><span><img class="tooth_img" src="../Images/Custom/BabyTooth/bottom_left_05.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 3);" data-bind="3">D</span><span><img class="tooth_img" src="../Images/Custom/BabyTooth/bottom_left_04.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 3);" data-bind="3">C</span><span><img class="tooth_img" src="../Images/Custom/BabyTooth/bottom_left_03.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 3);" data-bind="3">B</span><span><img class="tooth_img" src="../Images/Custom/BabyTooth/bottom_left_02.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 3);" data-bind="3">A</span><span><img class="tooth_img" src="../Images/Custom/BabyTooth/bottom_left_01.png"/></span></div></div><div class="tooth_unit tooth_right tooth_bottom_right"><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 4);" data-bind="4">A</span><span><img class="tooth_img" src="../Images/Custom/BabyTooth/bottom_right_01.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 4);" data-bind="4">B</span><span><img class="tooth_img" src="../Images/Custom/BabyTooth/bottom_right_02.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 4);" data-bind="4">C</span><span><img class="tooth_img" src="../Images/Custom/BabyTooth/bottom_right_03.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 4);" data-bind="4">D</span><span><img class="tooth_img" src="../Images/Custom/BabyTooth/bottom_right_04.png"/></span></div><div class="tooth_single_unit"><span class="tooth_span" ng-click="clickTooth($event, 4);" data-bind="4">E</span><span><img class="tooth_img" src="../Images/Custom/BabyTooth/bottom_right_05.png"/></span></div></div></div><hr style="width:2px;height:50%;position:absolute;background-color:#ddd;top:25%;left:54%;"></hr><div style="position:absolute;top:20%;"><span>反选</span>&nbsp;&nbsp;<span><input type="checkbox" id="baby_select_reverse" ng-click="quickSelect(2, 2);"></span></div></div></div></div></div></div>',
        replace: true
    }
});
patientCommonModule.directive("template", function() {
    return {
        restrict: "E",
        template: '<div style="display:none;"><div id="print_template"><div class="print_space"><span class="print_title">就诊信息</span></div><div style="width:50%;display:inline-block;text-align:center;"><span>就诊事项：</span><span>{{currentMedicalRecord.Appointment.AppointItemName}}</span></div><div style="width:50%;display:inline-block;"><span>就诊时间：</span><span>{{currentMedicalRecord.Appointment.BeginTime}}</span></div><div style="width:50%;display:inline-block;text-align:center;"><span class="doctor_active">就诊医生：</span><span>{{currentMedicalRecord.Appointment.DoctorName}}</span></div><div style="width:50%;display:inline-block;"><span>检查护士：</span><span></span></div><div class="print_space"><span class="print_title">附件信息</span></div><div ng-repeat="item in currentMedicalRecord.TreatFileList"><div style="width:50%;display:inline-block;text-align:center;"><span class="files_name">文件名称：</span><span>{{item.SourceName}}</span></div><div style="width:50%;display:inline-block;"><span>上传时间：</span><span>{{item.CreateTime}}</span></div></div><div class="print_space"><span class="print_title">病案内容</span></div><div class="row row_space cus_div_outer"><div class="col-lg-12"><table class="table table-bordered cus_div"><tbody class="cus_div"><tr><td><div class="col-lg-12"><span style="font-size:15px;">主诉</span></div></td><td colspan="2"><input type="text" name="ChiefComplaints" class="form-control" placeholder="主诉" ng-model="currentMedicalRecord.ChiefComplaints"></td></tr><tr><td><div class="col-lg-12"><span style="font-size:15px;">现病史</span></div></td><td colspan="2"><input type="text" name="PresentIllness" class="form-control" placeholder="现病史" ng-model="currentMedicalRecord.PresentIllness"></td></tr><tr><td><div class="col-lg-12"><span style="font-size:15px;">既往史</span></div></td><td colspan="2"><input type="text"  name="PastHistory" class="form-control" placeholder="既往史" ng-model="currentMedicalRecord.PastHistory"></td></tr><tr><td><div class="col-lg-12"><span style="font-size:15px;">过敏史</span></div></td><td colspan="2"><input type="text" name="AllergyHistory" class="form-control" placeholder="过敏史" ng-model="currentMedicalRecord.AllergyHistory"></td></tr><tr class="md_check" ng-repeat="item in currentMedicalRecord.CheckItems"><td><div class="col-lg-8" style="font-size:15px;">{{item.ItemName}}</div><div class="col-lg-4"><a href="javascript:void(0);" class="icon-plus no-print" ng-click="addItem(1, $event, item.DetailContent)"></a></div></td><td class="cus_tr"><div class="div_outer_tooth" ng-click="drawTooth($event, 1, item);"><input type="hidden" class="tooth_type" value="1"/><div class="div_top_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_top_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div><br><div class="div_bottom_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_bottom_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div></div></td><td class="sec_td"><textarea name="jianchaContent" type="text" class="form-control cus_textArea" placeholder="检查" ng-model="item.DetailContent">{{item.DetailContent}}</textarea></td></tr><tr class="md_help_check" ng-repeat="item in currentMedicalRecord.HelpCheckItems"><td><div class="col-lg-8" style="font-size:15px;">{{item.ItemName}}</div><div class="col-lg-4"><a href="javascript:void(0);" class="icon-plus no-print" ng-click="addItem(2, $event, item.DetailContent)"></a></div></td><td class="cus_tr"><div class="div_outer_tooth" ng-click="drawTooth($event, 2, item);"><input type="hidden" class="tooth_type" value="1"/><div class="div_top_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_top_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div><br><div class="div_bottom_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_bottom_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div></div></td><td class="sec_td"><textarea name="fuzhujiancha" type="text" class="form-control cus_textArea" placeholder="辅助检查" ng-model="item.DetailContent">{{item.DetailContent}}</textarea></td></tr><tr class="md_diagnose" ng-repeat="item in currentMedicalRecord.DiagnoseItems"><td><div class="col-lg-8" style="font-size:15px;">{{item.ItemName}}</div><div class="col-lg-4"><a href="javascript:void(0);" class="icon-plus no-print" ng-click="addItem(3, $event, item.DetailContent)"></a></div></td><td class="cus_tr"><div class="div_outer_tooth" ng-click="drawTooth($event, 3, item);"><input type="hidden" class="tooth_type" value="1"/><div class="div_top_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_top_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div><br><div class="div_bottom_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_bottom_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div></div></td><td class="sec_td"><textarea name="zhenduanContent" type="text" class="form-control cus_textArea" placeholder="诊断" ng-model="item.DetailContent">{{item.DetailContent}}</textarea></td></tr><tr class="md_treat" ng-repeat="item in currentMedicalRecord.TreatItems"><td><div class="col-lg-8" style="font-size:15px;">{{item.ItemName}}</div><div class="col-lg-4"><a href="javascript:void(0);" class="icon-plus no-print" ng-click="addItem(4, $event, item.DetailContent)"></a></div></td><td class="cus_tr"><div class="div_outer_tooth" ng-click="drawTooth($event, 4, item);"><input type="hidden" class="tooth_type" value="1"/><div class="div_top_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_top_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.TopRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div><br><div class="div_bottom_left"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomLeft" class="selected_tooth selected_tooth_right">{{toothItem.value}}</span></div><div class="div_bottom_right"><span>&nbsp;</span><span ng-repeat="toothItem in item.TeethList.BottomRight" class="selected_tooth selected_tooth_left">{{toothItem.value}}</span></div></div></td><td class="sec_td"><textarea name="zhiliaoContent" type="text" class="form-control cus_textArea" placeholder="治疗" ng-model="item.DetailContent">{{item.DetailContent}}</textarea></td></tr></tbody></table></div></div></div>',
        replace: true
    }
});
patientCommonModule.factory("PatientCommonFactory", [function() {
    return {
        SortByData: function(d, f) {
            var a = [];
            if (d != undefined && d != null && d.length > 0) {
                for (var c = 0; c < d.length - 1; c++) {
                    for (var b = c + 1; b < d.length; b++) {
                        if (f) {
                            if (parseInt(d[c].value) < parseInt(d[b].value)) {
                                var e = {
                                    value: d[b].value,
                                    position: d[b].position,
                                    isSelected: true
                                };
                                d[b].value = d[c].value;
                                d[b].position = d[c].position;
                                d[b].isSelected = d[c].isSelected;
                                d[c] = e
                            }
                        } else {
                            if (parseInt(d[c].value) > parseInt(d[b].value)) {
                                var e = {
                                    value: d[b].value,
                                    position: d[b].position,
                                    isSelected: true
                                };
                                d[b].value = d[c].value;
                                d[b].position = d[c].position;
                                d[b].isSelected = d[c].isSelected;
                                d[c] = e
                            }
                        }
                    }
                }
                a = d
            }
            return a
        }
    }
}
]);
patientCommonModule.service("PatientCommonService", ["$compile", "PatientCommonFactory", "$http", function(d, b, g) {
    var c = {};
    var a = function(j, k, n, o) {
        var h = [];
        if (j.length > 0) {
            for (var l = 0; l < j.length; l++) {
                var m = {
                    value: $(j[l]).text(),
                    position: 1,
                    isSelected: true
                };
                h.push(m)
            }
        }
        if (k.length > 0) {
            for (var l = 0; l < k.length; l++) {
                var m = {
                    value: $(k[l]).text(),
                    position: 2,
                    isSelected: true
                };
                h.push(m)
            }
        }
        if (n.length > 0) {
            for (var l = 0; l < n.length; l++) {
                var m = {
                    value: $(n[l]).text(),
                    position: 3,
                    isSelected: true
                };
                h.push(m)
            }
        }
        if (o.length > 0) {
            for (var l = 0; l < o.length; l++) {
                var m = {
                    value: $(o[l]).text(),
                    position: 4,
                    isSelected: true
                };
                h.push(m)
            }
        }
        return h
    };
    var e = function(q, j, k, h) {
        var l = $(q).children("span.selected_tooth");
        var n = $(j).children("span.selected_tooth");
        var m = $(k).children("span.selected_tooth");
        var p = $(h).children("span.selected_tooth");
        if (l.length > 0) {
            for (var o = 0; o < l.length; o++) {
                $(l[o]).remove()
            }
        }
        if (n.length > 0) {
            for (var o = 0; o < n.length; o++) {
                $(n[o]).remove()
            }
        }
        if (m.length > 0) {
            for (var o = 0; o < m.length; o++) {
                $(m[o]).remove()
            }
        }
        if (p.length > 0) {
            for (var o = 0; o < p.length; o++) {
                $(p[o]).remove()
            }
        }
    };
    var f = function(y, l, p, u, D) {
        if (y.length > 0 && p == 1) {
            var z = $(l).children("div.div_top_left")[0];
            var m = $(l).children("div.div_top_right")[0];
            var k = $(l).children("div.div_bottom_left")[0];
            var t = $(l).children("div.div_bottom_right")[0];
            var B = b.SortByData(y, true);
            var h = "";
            var w = "";
            if (D != undefined) {
                D.TeethList.TopLeft = [];
                D.TeethList.TopRight = [];
                D.TeethList.BottomLeft = [];
                D.TeethList.BottomRight = []
            }
            for (var C = 0; C < B.length; C++) {
                switch (Number(B[C].position)) {
                case 1:
                    var E = "<span class='selected_tooth selected_tooth_right'>" + B[C].value + "</span>";
                    if (D != undefined) {
                        D.TeethList.TopLeft.push({
                            value: B[C].value,
                            position: 1,
                            isSelected: true
                        })
                    } else {
                        $(z).append(E)
                    }
                    break;
                case 2:
                    h = "<span class='selected_tooth selected_tooth_left'>" + B[C].value + "</span>" + h;
                    if (D != undefined) {
                        D.TeethList.TopRight.push({
                            value: B[C].value,
                            position: 2,
                            isSelected: true
                        })
                    }
                    break;
                case 3:
                    var E = "<span class='selected_tooth selected_tooth_right'>" + B[C].value + "</span>";
                    if (D != undefined) {
                        D.TeethList.BottomLeft.push({
                            value: B[C].value,
                            position: 3,
                            isSelected: true
                        })
                    } else {
                        $(k).append(E)
                    }
                    break;
                case 4:
                    w = "<span class='selected_tooth selected_tooth_left'>" + B[C].value + "</span>" + w;
                    if (D != undefined) {
                        D.TeethList.BottomRight.push({
                            value: B[C].value,
                            position: 4,
                            isSelected: true
                        })
                    }
                    break;
                default:
                    break
                }
                if (C == (B.length - 1) && D == undefined) {
                    $(t).append(w);
                    $(m).append(h)
                }
            }
        }
        if (y.length > 0 && p == 2) {
            var x = "";
            if (u == "1") {
                x = "#permanent_teeth"
            } else {
                x = "#baby_teeth"
            }
            var s = $("span.tooth_span");
            for (var C = 0; C < s.length; C++) {
                $(s[C]).prop("class", "tooth_span")
            }
            for (var A = 0; A < y.length; A++) {
                switch (y[A].position) {
                case 1:
                    var o = $($(x + " div.tooth_top_left")[0]).children();
                    for (var C = 0; C < o.length; C++) {
                        var n = $(o[C]).children("span.tooth_span")[0];
                        if ($(n).text() == y[A].value) {
                            $(n).prop("class", "tooth_span selected_unit");
                            break
                        }
                    }
                    break;
                case 2:
                    var q = $($(x + " div.tooth_top_right")[0]).children();
                    for (var C = 0; C < q.length; C++) {
                        var n = $(q[C]).children("span.tooth_span")[0];
                        if ($(n).text() == y[A].value) {
                            $(n).prop("class", "tooth_span selected_unit");
                            break
                        }
                    }
                    break;
                case 3:
                    var v = $($(x + " div.tooth_bottom_left")[0]).children();
                    for (var C = 0; C < v.length; C++) {
                        var n = $(v[C]).children("span.tooth_span")[0];
                        if ($(n).text() == y[A].value) {
                            $(n).prop("class", "tooth_span selected_unit");
                            break
                        }
                    }
                    break;
                case 4:
                    var r = $($(x + " div.tooth_bottom_right")[0]).children();
                    for (var C = 0; C < r.length; C++) {
                        var n = $(r[C]).children("span.tooth_span")[0];
                        if ($(n).text() == y[A].value) {
                            $(n).prop("class", "tooth_span selected_unit");
                            break
                        }
                    }
                    break;
                default:
                    break
                }
            }
        }
        if (y.length == 0) {
            var s = $("span.tooth_span");
            for (var C = 0; C < s.length; C++) {
                $(s[C]).prop("class", "tooth_span")
            }
        }
    };
    c.showMedicalRecord = function(h) {
        $("#medical_record").modal("show")
    }
    ;
    c.addItem = function(k, o, i, l) {
        var n = "";
        var j = "";
        var h = 0;
        switch (k) {
        case 1:
            n = "检查";
            j = "md_check_new";
            h = 5;
            break;
        case 2:
            n = "辅助检查";
            j = "md_help_check_new";
            h = 6;
            break;
        case 3:
            n = "诊断";
            j = "md_diagnose_new";
            h = 7;
            break;
        case 4:
            n = "治疗方案";
            j = "md_treat_new";
            h = 8;
            break;
        default:
            n = "";
            break
        }
        var m = angular.element("<tr class=" + j + "><td><div class='col-lg-8'>&nbsp;</div><div class='col-lg-4'><a href='javascript:void(0);' class='icon-trash' ng-click='deleteItem($event);'></a>&nbsp;</div></td><td class='cus_tr'><div class='div_outer_tooth_new' ng-click='drawTooth($event, null, false);'><input type='hidden' class='tooth_type_new' value='1'/><div class='div_top_left'><span>&nbsp;</span></div><div class='div_top_right'><span>&nbsp;</span></div><br><div class='div_bottom_left'><span>&nbsp;</span></div><div class='div_bottom_right'><span>&nbsp;</span></div></div></td><td class='sec_td'><textarea class='form-control input-sm cus_textArea' ng-blur='recordCurrentItem($event, " + h + ");' placeholder='" + n + "'>" + l + "</textarea></td></tr>");
        var i = d(m)(i);
        angular.element($(o.target).parent().parent().parent()).after(i)
    }
    ;
    c.deleteItem = function(i, h) {
        if (h != undefined && h != "") {
            h.State = 1
        }
        angular.element($(i.target).parent().parent().parent()).remove()
    }
    ;
    c.drawTooth = function(k, m) {
        if (m != undefined && m != "") {
            if (m.target.nodeName == "SPAN") {
                k.showElement = $($(m.target).parent()[0]).parent()[0]
            } else {
                k.showElement = $(m.target).parent()[0]
            }
        }
        var i = $($(k.showElement).children("div.div_top_left")[0]).children("span.selected_tooth");
        var j = $($(k.showElement).children("div.div_top_right")[0]).children("span.selected_tooth");
        var l = $($(k.showElement).children("div.div_bottom_left")[0]).children("span.selected_tooth");
        var n = $($(k.showElement).children("div.div_bottom_right")[0]).children("span.selected_tooth");
        var h = $($(k.showElement).children(":first")).val();
        k.selectedTeeth = a(i, j, l, n);
        $("#tooth").fadeIn();
        f(k.selectedTeeth, "", 2, h)
    }
    ;
    c.clickTooth = function(o, h, k, n) {
        var l = $(o).attr("class");
        var m = "";
        if (!n && l.indexOf("selected_unit") > -1) {
            $(o).attr("class", "tooth_span");
            for (var j = 0; j < k.selectedTeeth.length; j++) {
                if (k.selectedTeeth[j].value == $(o).text() && k.selectedTeeth[j].position == h) {
                    k.selectedTeeth.splice(j, 1);
                    break
                }
            }
        } else {
            if (n && l.indexOf("selected_unit") > -1) {
                return
            }
            $(o).attr("class", "tooth_span selected_unit");
            m = {
                value: $(o).text(),
                position: h,
                isSelected: true
            };
            k.selectedTeeth.push(m)
        }
    }
    ;
    c.saveSelectedTeeth = function(p) {
        $("#tooth").fadeOut();
        if (p.isOld) {
            var h = $("div.div_outer_tooth");
            var r = p.currentMedicalRecord.CheckItems;
            for (var q = 0; q < h.length; q++) {
                var u = $(h[q]).children("div.div_top_left")[0];
                var m = $(h[q]).children("div.div_top_right")[0];
                var n = $(h[q]).children("div.div_bottom_left")[0];
                var k = $(h[q]).children("div.div_bottom_right")[0];
                e(u, m, n, k);
                if (r != undefined && r.length > 0) {
                    for (var o = 0; o < r.length; o++) {
                        f(p.selectedTeeth, h[q], 1, 0, r[o])
                    }
                }
            }
            var l = p.currentMedicalRecord.HelpCheckItems;
            for (var q = 0; q < h.length; q++) {
                var u = $(h[q]).children("div.div_top_left")[0];
                var m = $(h[q]).children("div.div_top_right")[0];
                var n = $(h[q]).children("div.div_bottom_left")[0];
                var k = $(h[q]).children("div.div_bottom_right")[0];
                e(u, m, n, k);
                if (l != undefined && l.length > 0) {
                    for (var o = 0; o < r.length; o++) {
                        f(p.selectedTeeth, h[q], 1, 0, l[o])
                    }
                }
            }
            var t = p.currentMedicalRecord.DiagnoseItems;
            for (var q = 0; q < h.length; q++) {
                var u = $(h[q]).children("div.div_top_left")[0];
                var m = $(h[q]).children("div.div_top_right")[0];
                var n = $(h[q]).children("div.div_bottom_left")[0];
                var k = $(h[q]).children("div.div_bottom_right")[0];
                e(u, m, n, k);
                if (t != undefined && t.length > 0) {
                    for (var o = 0; o < t.length; o++) {
                        f(p.selectedTeeth, h[q], 1, 0, t[o])
                    }
                }
            }
            var s = p.currentMedicalRecord.TreatItems;
            for (var q = 0; q < h.length; q++) {
                var u = $(h[q]).children("div.div_top_left")[0];
                var m = $(h[q]).children("div.div_top_right")[0];
                var n = $(h[q]).children("div.div_bottom_left")[0];
                var k = $(h[q]).children("div.div_bottom_right")[0];
                e(u, m, n, k);
                if (s != undefined && s.length > 0) {
                    for (var o = 0; o < s.length; o++) {
                        f(p.selectedTeeth, h[q], 1, 0, s[o])
                    }
                }
            }
        } else {
            f(p.selectedTeeth, p.showElement, 1)
        }
    }
    ;
    c.chooseTemplate = function() {
        $("#entry_template").modal("show")
    }
    ;
    c.switchTooth = function(j, i) {
        if (i.isOld) {
            $("#medical_record").find("input.tooth_type").val(j)
        } else {
            var h = $(i.showElement).children(":first");
            i.selectedTeeth = [];
            $(h).val(j)
        }
    }
    ;
    c.getMedicalDetail = function() {
        var m = $("#medical_record table tbody");
        var n = m.children("tr.md_check_new");
        var t = m.children("tr.md_help_check_new");
        var j = m.children("tr.md_diagnose_new");
        var s = m.children("tr.md_treat_new");
        var u = [];
        for (var o = 0; o < n.length; o++) {
            var h = $(n[o]).children().eq(1);
            var p = $(n[o]).children().eq(2);
            var q = $($($(h).children()).children("div.div_top_left")[0]).children("span.selected_tooth");
            var l = $($($(h).children()).children("div.div_top_right")[0]).children("span.selected_tooth");
            var r = $($($(h).children()).children("div.div_bottom_left")[0]).children("span.selected_tooth");
            var k = $($($(h).children()).children("div.div_bottom_right")[0]).children("span.selected_tooth");
            u.push({
                DetailType: 1,
                Teeth: a(q, l, r, k),
                ToothType: $($(h).children()[0]).children().eq(0).val(),
                Content: $($(p).children("textarea")[0]).val()
            })
        }
        for (var o = 0; o < t.length; o++) {
            var h = $(t[o]).children().eq(1);
            var p = $(t[o]).children().eq(2);
            var q = $($($(h).children()).children("div.div_top_left")[0]).children("span.selected_tooth");
            var l = $($($(h).children()).children("div.div_top_right")[0]).children("span.selected_tooth");
            var r = $($($(h).children()).children("div.div_bottom_left")[0]).children("span.selected_tooth");
            var k = $($($(h).children()).children("div.div_bottom_right")[0]).children("span.selected_tooth");
            u.push({
                DetailType: 2,
                Teeth: a(q, l, r, k),
                ToothType: $($(h).children()[0]).children().eq(0).val(),
                Content: $($(p).children("textarea")[0]).val()
            })
        }
        for (var o = 0; o < j.length; o++) {
            var h = $(j[o]).children().eq(1);
            var p = $(j[o]).children().eq(2);
            var q = $($($(h).children()).children("div.div_top_left")[0]).children("span.selected_tooth");
            var l = $($($(h).children()).children("div.div_top_right")[0]).children("span.selected_tooth");
            var r = $($($(h).children()).children("div.div_bottom_left")[0]).children("span.selected_tooth");
            var k = $($($(h).children()).children("div.div_bottom_right")[0]).children("span.selected_tooth");
            u.push({
                DetailType: 3,
                Teeth: a(q, l, r, k),
                ToothType: $($(h).children()[0]).children().eq(0).val(),
                Content: $($(p).children("textarea")[0]).val()
            })
        }
        for (var o = 0; o < s.length; o++) {
            var h = $(s[o]).children().eq(1);
            var p = $(s[o]).children().eq(2);
            var q = $($($(h).children()).children("div.div_top_left")[0]).children("span.selected_tooth");
            var l = $($($(h).children()).children("div.div_top_right")[0]).children("span.selected_tooth");
            var r = $($($(h).children()).children("div.div_bottom_left")[0]).children("span.selected_tooth");
            var k = $($($(h).children()).children("div.div_bottom_right")[0]).children("span.selected_tooth");
            u.push({
                DetailType: 4,
                Teeth: a(q, l, r, k),
                ToothType: $($(h).children()[0]).children().eq(0).val(),
                Content: $($(p).children("textarea")[0]).val()
            })
        }
        return u
    }
    ;
    c.previewAgreement = function(h) {
        $("#agreement").fadeIn();
        if (h.selectedAgreement) {
            try {
                g.get(FileURL + "Agreement/" + h.selectedAgreement.FileName).success(function(l) {
                    var k = {
                        Title: "",
                        Content: []
                    };
                    var p = angular.element(l.trim()).find("title");
                    k.Title = p.text();
                    var q = angular.element(l.trim()).find("content");
                    if (q && q.length > 0) {
                        for (var n = 0; n < q.length; n++) {
                            var o = {
                                Title: q[n].children[0].innerText.trim(),
                                Type: 0,
                                Items: []
                            };
                            switch (q[n].getAttribute("contentid")) {
                            case "000":
                                o.Type = 0;
                                break;
                            case "001":
                                o.Type = 1;
                                break;
                            case "002":
                                o.Type = 2;
                                break;
                            case "003":
                                o.Type = 3;
                                break;
                            default:
                                break
                            }
                            if (q[n].children.length > 1) {
                                for (var m = 1; m < q[n].children.length; m++) {
                                    o.Items.push(q[n].children[m].innerText.trim())
                                }
                            }
                            k.Content.push(o)
                        }
                    }
                    h.agreementCon = k
                }).error(function(j) {
                    console.log(j)
                })
            } catch (i) {
                console.log(i)
            }
        } else {
            h.agreementCon = null
        }
    }
    ;
    c.closeAgreement = function(h) {
        h.selectedAgreement = null;
        h.agreementCon = null;
        $("#agreement").fadeOut()
    }
    ;
    return c
}
]);



