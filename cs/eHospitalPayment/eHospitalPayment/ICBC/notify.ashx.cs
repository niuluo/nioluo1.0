using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml.Linq;

namespace eHospital.Payment.ICBC
{
    /// <summary>
    /// Summary description for notify
    /// </summary>
    public class notify : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var result = false;

            try
            {
                var str = "工行通知:";
                foreach (var item in context.Request.Form.AllKeys)
                {
                    str += string.Format("{0}:{1},", item, context.Request.Form[item]);
                }

                WebApiConfig.log.Info(str);
                var notifyData = Encoding.GetEncoding("gbk").GetString(Convert.FromBase64String(context.Request.Form["notifyData"]));
                WebApiConfig.log.Info("notifyData:" + notifyData);
                var xdocument = XDocument.Parse(notifyData);
                var return_code = xdocument.Descendants("tranStat").First().Value;
                var out_trade_no = xdocument.Descendants("orderid").First().Value;
                var orderDate = xdocument.Descendants("orderDate").First().Value;
                var amount = xdocument.Descendants("amount").First().Value;
                var installmentTimes = xdocument.Descendants("installmentTimes").First().Value;
                var tranSerialNoNode = xdocument.Descendants("TranSerialNo").FirstOrDefault();
                if(tranSerialNoNode == null)
                {
                    tranSerialNoNode = xdocument.Descendants("tranSerialNo").FirstOrDefault();
                }

                var tranSerialNo = tranSerialNoNode.Value; // 银行端指令流水号
                var comment = xdocument.Descendants("comment").First().Value;

                WebApiConfig.log.Info("工行通知(" + out_trade_no + "-" + orderDate + "-" + amount + "-" + installmentTimes + "):" + return_code);

                TradeStatus status;
                if (return_code == "1")
                {
                    status = TradeStatus.NOTIFYSUCCESS;
                }
                else if (return_code == "2")
                {
                    status = TradeStatus.NOTIFYISSUE;
                }
                else if (return_code == "3")
                {
                    status = TradeStatus.NOTIFYSUSPECT;
                }
                else
                {
                    status = TradeStatus.NOTIFYUNKNOWN;
                }

                JObject localResult;
                if (!TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, tranSerialNo, PaymentType.ICBC, return_code, status, out localResult))
                {
                    WebApiConfig.log.Error(out_trade_no + "-" + tranSerialNo + ":接受到工行通知,本地数据库状态维护失败");
                }
                else
                {
                    result = true;
                }

                if (return_code == "1")
                {
                    // 通知患者端
                    PatientCustomerBusiness.NotifyPatient(localResult);
                }
            }
            catch (Exception e)
            {
                WebApiConfig.log.Error(e.ToString());
            }

            // todo
            if (result)
            {
                context.Response.ContentType = "text/html";
                context.Response.Write("success");
            }
            else
            {
                context.Response.ContentType = "text/html";
                context.Response.Write("failure");
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