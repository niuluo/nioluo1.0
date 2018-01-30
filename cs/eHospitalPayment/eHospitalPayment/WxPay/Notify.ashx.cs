using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace eHospital.Payment.WxPay
{
    /// <summary>
    /// Summary description for Notify
    /// </summary>
    public class Notify : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var result = false;

            try
            {
                var xdocument = XDocument.Load(context.Request.InputStream);
                var return_code = xdocument.Descendants("return_code").FirstOrDefault();
                if (return_code != null && return_code.Value == "SUCCESS")
                {
                    var result_code = xdocument.Descendants("result_code").First().Value;
                    var out_trade_no = xdocument.Descendants("out_trade_no").First().Value;
                    var transaction_id = xdocument.Descendants("transaction_id").First().Value;
                    var status = (result_code == "SUCCESS" ? TradeStatus.NOTIFYSUCCESS : TradeStatus.NOTIFYISSUE);
                    WebApiConfig.log.Info("微信通知 " + out_trade_no + "-" + transaction_id + ":" + result_code);
                    JObject localResult;
                    if (!TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, transaction_id, PaymentType.WechatPay, result_code, status, out localResult))
                    {
                        WebApiConfig.log.Error(out_trade_no + "-" + transaction_id + "微信通知支付成功,本地数据库状态维护失败");
                    } else
                    {
                        result = true;
                    }

                    // 通知患者端
                    PatientCustomerBusiness.NotifyPatient(localResult);
                }
            } catch
            {

            }

            if(result)
            {
                context.Response.ContentType = "text/xml";
                context.Response.Write("<xml><return_code><![CDATA[SUCCESS]]></return_code></xml>");
            } else
            {
                context.Response.ContentType = "text/xml";
                context.Response.Write("<xml><return_code><![CDATA[FAIL]]></return_code></xml>");
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}