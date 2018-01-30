using Aop.Api;
using Aop.Api.Request;
using Aop.Api.Response;
using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using eHospital.Payment.Helper;
using eHospital.PaymentDTO;
using eHospitalUtility.CommonEnum;
using Newtonsoft.Json.Linq;
using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Web;
using System.Web.Http;

namespace eHospital.Payment.Controllers
{
    public class RefundTestController : ApiController
    {
        public string Get(string tradeNo, string fee)
        {
            IAopClient client = new DefaultAopClient(ConfigurationManager.AppSettings["alipay.port"], ConfigurationManager.AppSettings["alipay.appId"], ConfigurationManager.AppSettings["alipay.privateKey"]);
            AlipayTradeRefundRequest request = new AlipayTradeRefundRequest();
            request.BizContent = "{" + string.Format(
            "    \"out_trade_no\":\"{0}\"," +
            "    \"trade_no\":\"{1}\"," +
            "    \"refund_amount\":{2}," +
            "    \"refund_reason\":\"正常退款\"", tradeNo, string.Empty, fee) + "  }";
            AlipayTradeRefundResponse response = client.Execute(request);
            if (!response.IsError)
            {
                return "支付宝退款成功:" + tradeNo;
            }
            else
            {
                return "支付宝退款失败:" + tradeNo + "-" + response.SubMsg;
            }
        }
    }
}