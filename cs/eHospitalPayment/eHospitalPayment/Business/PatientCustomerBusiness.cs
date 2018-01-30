using eHospital.Payment.Helper;
using Newtonsoft.Json.Linq;
using System;
using System.Net;
using System.Net.Http;

namespace eHospital.Payment.Business
{
    public class PatientCustomerBusiness
    {
        public static void NotifyPatient(JObject data)
        {
            var result = new JObject();
            var url = string.Empty;
            try
            {
                if (data == null)
                {
                    return;
                }

                url = "PatientWeChat/PaymentNotify";

                //var from = data.GetValue("TradeFrom") == null ? string.Empty : data.GetValue("TradeFrom").ToString();
                //if (from == "gysyapp_order")
                //{
                //    url = "ReqToHis/PayOrder";
                //}
                //else if (from == "gysyapp_ghaddorder")
                //{
                //    url = "ReqToHis/PayGHAddorder";
                //}
                //else if (from == "gysyapp_prescription")
                //{
                //    url = "ReqToHis/PayPrescriptionOrder";
                //}
                //else if (from == "Recharge" || from == "Consult")
                //{
                //    url = "PayRecord/EditThirdStatus";
                //}
                //else
                //{
                //    return;
                //}

                var request = new JObject(
                    new JProperty("Header",
                    new JObject(
                        new JProperty("Token", "8A200AF6A63F395BBE5A9BE902D07906"),
                        new JProperty("StatusCode", 0),
                        new JProperty("Message", string.Empty),
                        new JProperty("OperateCode", 1),
                        new JProperty("TimeStamp", string.Empty))),
                    new JProperty("Body",
                    new JObject(
                    new JProperty("Trade", data))));

                System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
                HttpResponseMessage httpResult = HttpHelper.RequestPatientPost<JObject>(url, request);
                if (httpResult.StatusCode == HttpStatusCode.OK)
                {
                    var tradeFromNo = data.GetValue("TradeFromNo") == null ? string.Empty : data.GetValue("TradeFromNo").ToString();
                    var tradeNo = data.GetValue("TradeNo") == null ? string.Empty : data.GetValue("TradeNo").ToString();
                    WebApiConfig.log.Info(tradeNo + "-" + tradeFromNo + "通知患者端api成功");
                }
            }
            catch (Exception e)
            {
                var tradeFromNo = data.GetValue("TradeFromNo") == null ? string.Empty : data.GetValue("TradeFromNo").ToString();
                var tradeNo = data.GetValue("TradeNo") == null ? string.Empty : data.GetValue("TradeNo").ToString();
                WebApiConfig.log.Error(tradeNo + "-" + tradeFromNo + "通知患者端api失败");
                WebApiConfig.log.Error("失败url为" + url);
                WebApiConfig.log.Error("失败原因:" + e.ToString());
            }
        }
    }
}