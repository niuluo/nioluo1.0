using Aop.Api;
using Aop.Api.Request;
using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;

namespace eHospital.Payment.ICBC
{
    public class Pay
    {
        public static JObject createForm(PaymentType paymentType, string from, string fromNo, string fee, string subject, string installmentTimes, bool isPC = false)
        {
            ////////////////////////////////////////////请求参数////////////////////////////////////////////
            //商户订单号，商户网站订单系统中唯一订单号，必填
            var now = DateTime.Now;
            var out_trade_no = now.ToString("yyyyMMddHHmmssfff") + CommonBusiness.CreateRandom();
            var orderDate = now.ToString("yyyyMMddHHmmss");

            //订单名称，必填
            if (string.IsNullOrEmpty(subject))
            {
                subject = "工行支付";
            }

            //付款金额，必填
            var total_fee = (double.Parse(fee)).ToString();
            if (!isPC)
            {
                var tranData = CreateTranData(orderDate, out_trade_no, total_fee, installmentTimes);

                // 本地数据维护 支付宝单位为元 支付宝类型统一为alipay 不好区分
                var result = TradeBusiness.AddTrade(out_trade_no, from, fromNo, PaymentType.ICBC, total_fee, subject, string.Empty, "0");
                if (!(bool)result["Flg"])
                {
                    throw new Exception("本地数据维护失败");
                }

                var bytes = Encoding.GetEncoding("gbk").GetBytes(tranData);
                var translateString = Convert.ToBase64String(bytes);
                var form = new StringBuilder();
                var signs = CBCPayOnline.GetCheckInfo(tranData);
                form.Append("<h3>页面跳转中。。。</h3>");
                //form.Append("<form style=\"display:none;\" id=\"payForm\" action=\"http://wap2.icbc.com.cn/servlet/ICBCWAPEBizServlet\" > ");
                form.Append("<form style=\"display:none;\" id=\"payForm\" action=\"https://mywap2.icbc.com.cn/ICBCWAPBank/servlet/ICBCWAPEBizServlet\" > ");
                form.Append("<INPUT NAME=\"interfaceName\" TYPE=\"text\" value=\"ICBC_WAPB_B2C\">");
                form.Append("<INPUT NAME=\"interfaceVersion\" TYPE=\"text\" value=\"1.0.0.6\">");
                form.Append("<INPUT NAME=\"tranData\" TYPE=\"text\" value=\"" + translateString + "\">");
                form.Append("<INPUT NAME=\"merSignMsg\" TYPE=\"text\" value=\"" + signs[0] + "\">");
                form.Append("<INPUT NAME=\"merCert\" TYPE=\"text\" value=\"" + signs[1] + "\">");
                form.Append("<INPUT NAME=\"clientType\" TYPE=\"text\" value=\"0\">");
                form.Append("</form>");
                form.Append("<script>document.forms['payForm'].submit();</script>");

                return new JObject(
                        new JProperty("Trade", ((JObject)result["Object"])["result"]),
                        new JProperty("Content", form.ToString()));
            }
            else
            {
                var tranData = CreateTranData_PC(orderDate, out_trade_no, total_fee, installmentTimes);

                // 本地数据维护 支付宝单位为元 支付宝类型统一为alipay 不好区分
                var result = TradeBusiness.AddTrade(out_trade_no, from, fromNo, PaymentType.ICBC, total_fee, subject, string.Empty, "0");
                if (!(bool)result["Flg"])
                {
                    throw new Exception("本地数据维护失败");
                }

                var bytes = Encoding.GetEncoding("gbk").GetBytes(tranData);
                var translateString = Convert.ToBase64String(bytes);
                var form = new StringBuilder();
                var signs = CBCPayOnline.GetCheckInfo(tranData);
                form.Append("<h3>页面跳转中。。。</h3>");
                //form.Append("<form style=\"display:none;\" id=\"payForm\" action=\"http://wap2.icbc.com.cn/servlet/ICBCWAPEBizServlet\" > ");
                form.Append("<form style=\"display:none;\" id=\"payForm\" action=\"https://B2C.icbc.com.cn/servlet/ICBCINBSEBusinessServlet\" > ");
                form.Append("<INPUT NAME=\"interfaceName\" TYPE=\"text\" value=\"ICBC_PERBANK_B2C\">");
                form.Append("<INPUT NAME=\"interfaceVersion\" TYPE=\"text\" value=\"1.0.0.11\">");
                form.Append("<INPUT NAME=\"tranData\" TYPE=\"text\" value=\"" + translateString + "\">");
                form.Append("<INPUT NAME=\"merSignMsg\" TYPE=\"text\" value=\"" + signs[0] + "\">");
                form.Append("<INPUT NAME=\"merCert\" TYPE=\"text\" value=\"" + signs[1] + "\">");
                //form.Append("<INPUT NAME=\"clientType\" TYPE=\"text\" value=\"0\">");
                form.Append("</form>");
                form.Append("<script>document.forms['payForm'].submit();</script>");

                return new JObject(
                        new JProperty("Trade", ((JObject)result["Object"])["result"]),
                        new JProperty("Content", form.ToString()));
            }
        }

        public static string CreateTranData(string orderDate, string orderid, string amount, string installmentTimes)
        {
            var result = new StringBuilder();
            result.Append("<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"no\"?>");
            result.Append("<B2CReq>");
            result.Append("<interfaceName>ICBC_WAPB_B2C</interfaceName>");
            result.Append("<interfaceVersion>1.0.0.6</interfaceVersion>");
            result.Append("<orderInfo>");
            result.Append("<orderDate>" + orderDate + "</orderDate>");
            result.Append("<orderid>" + orderid + "</orderid>");
            result.Append("<amount>" + amount + "</amount>");
            result.Append("<installmentTimes>" + installmentTimes + "</installmentTimes>");
            //result.Append("<installmentTimes>" + "12" + "</installmentTimes>");
            result.Append("<curType>001</curType>");
            result.Append("<merID>" + ConfigurationManager.AppSettings["icbc.merID"] + "</merID>");
            result.Append("<merAcct>" + ConfigurationManager.AppSettings["icbc.merAcct"] + "</merAcct>");
            result.Append("</orderInfo>");
            result.Append("<custom>");
            result.Append("<verifyJoinFlag>0</verifyJoinFlag>");
            result.Append("<Language></Language>");
            result.Append("</custom>");
            result.Append("<message>");
            result.Append("<goodsID></goodsID>");
            result.Append("<goodsName></goodsName>");
            result.Append("<goodsNum></goodsNum>");
            result.Append("<carriageAmt></carriageAmt>");
            result.Append("<merHint></merHint>");
            result.Append("<remark1></remark1>"); // 如果希望对订单的有效日期进行限定，此项必须输入类似”20110802152230”的时间串代表8月2日15:22:30之前支付订单有效。若不需要限定，此项送空，送其他值不合法。
            result.Append("<remark2></remark2>");
            result.Append("<merURL>" + ConfigurationManager.AppSettings["icbc.notifyUrl"] + "</merURL>");
            result.Append("<merVAR></merVAR>");
            result.Append("<notifyType>HS</notifyType>");
            result.Append("<resultType>0</resultType>");
            result.Append("<backup1></backup1>");
            result.Append("<backup2></backup2>");
            result.Append("<backup3></backup3>");
            result.Append("<backup4></backup4>");
            result.Append("</message>");
            result.Append("</B2CReq>");
            return result.ToString();
        }

        public static string CreateTranData_PC(string orderDate, string orderid, string amount, string installmentTimes)
        {
            var result = new StringBuilder();
            result.Append("<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"no\"?>");
            result.Append("<B2CReq>");
            result.Append("<interfaceName>ICBC_PERBANK_B2C</interfaceName>");
            result.Append("<interfaceVersion>1.0.0.11</interfaceVersion>");
            result.Append("<orderInfo>");
            result.Append("<orderDate>" + orderDate + "</orderDate>");
            result.Append("<curType>001</curType>");
            result.Append("<merID>" + ConfigurationManager.AppSettings["icbc.merID"] + "</merID>");
            result.Append("<subOrderInfoList>");
            result.Append("<subOrderInfo>");
            result.Append("<orderid>" + orderid + "</orderid>");
            result.Append("<amount>" + amount + "</amount>");
            result.Append("<installmentTimes>" + installmentTimes + "</installmentTimes>");
            result.Append("<merAcct>" + ConfigurationManager.AppSettings["icbc.merAcct"] + "</merAcct>");
            result.Append("<goodsID></goodsID>");
            result.Append("<goodsName>工行支付</goodsName>");
            result.Append("<goodsNum></goodsNum>");
            result.Append("<carriageAmt></carriageAmt>");
            result.Append("</subOrderInfo>");
            result.Append("</subOrderInfoList>");
            result.Append("</orderInfo>");
            result.Append("<custom>");
            result.Append("<verifyJoinFlag>0</verifyJoinFlag>");
            result.Append("<Language></Language>");
            result.Append("</custom>");
            result.Append("<message>");
            result.Append("<creditType>2</creditType>");
            result.Append("<notifyType>HS</notifyType>");
            result.Append("<resultType>0</resultType>");
            result.Append("<merReference></merReference>");
            result.Append("<merCustomIp></merCustomIp>");
            result.Append("<goodsType></goodsType>");
            result.Append("<merCustomID></merCustomID>");
            result.Append("<merCustomPhone></merCustomPhone>");
            result.Append("<goodsAddress></goodsAddress>");
            result.Append("<merOrderRemark></merOrderRemark>");
            result.Append("<merHint></merHint>");
            result.Append("<remark1></remark1>"); // 如果希望对订单的有效日期进行限定，此项必须输入类似”20110802152230”的时间串代表8月2日15:22:30之前支付订单有效。若不需要限定，此项送空，送其他值不合法。
            result.Append("<remark2></remark2>");
            result.Append("<merURL>" + ConfigurationManager.AppSettings["icbc.notifyUrl"] + "</merURL>");
            result.Append("<merVAR></merVAR>");
            //result.Append("<notifyType>HS</notifyType>");
            //result.Append("<resultType>0</resultType>");
            //result.Append("<backup1></backup1>");
            //result.Append("<backup2></backup2>");
            //result.Append("<backup3></backup3>");
            //result.Append("<backup4></backup4>");
            result.Append("</message>");
            result.Append("<extend>");
            result.Append("<e_isMerFlag></e_isMerFlag>");
            result.Append("<e_Name></e_Name>");
            result.Append("<e_TelNum></e_TelNum>");
            result.Append("<e_CredType></e_CredType>");
            result.Append("<e_CredNum></e_CredNum>");
            result.Append("<e_CardNo></e_CardNo>");
            result.Append("<orderFlag_ztb></orderFlag_ztb>");
            result.Append("</extend>");
            result.Append("</B2CReq>");
            return result.ToString();
        }
    }
}