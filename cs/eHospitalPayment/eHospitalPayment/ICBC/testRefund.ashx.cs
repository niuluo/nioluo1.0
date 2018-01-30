using eHospital.Payment.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eHospital.Payment.ICBC
{
    /// <summary>
    /// Summary description for testRefund
    /// </summary>
    public class testRefund : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var from = context.Request.QueryString["from"] ?? "73D589ED1";
            var tradeNo = context.Request.QueryString["tradeNo"] ?? "20171025103417195232829";
            var fee = context.Request.QueryString["fee"] ?? "10";
            var result = TradeBusiness.GetTrade(tradeNo, from);
            ICBC.Refund.execute(from, tradeNo, string.Empty, fee, result);

            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
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