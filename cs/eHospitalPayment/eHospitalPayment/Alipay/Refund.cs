using Aop.Api;
using Aop.Api.Request;
using Aop.Api.Response;
using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using Newtonsoft.Json.Linq;
using System;
using System.Configuration;

namespace eHospital.Payment.Alipay
{
    public class Refund
    {
        public static JObject execute(string from, string out_trade_no, string trade_no, string refund_amount, JObject result)
        {
            // 标识一次退款请求，同一笔交易多次退款需要保证唯一，如需部分退款，则此参数必传。
            var now = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            var out_request_no = now + CommonBusiness.CreateRandom();
            var amount = (double.Parse(refund_amount) / 100).ToString();
            IAopClient client = new DefaultAopClient(ConfigurationManager.AppSettings["alipay.port"], ConfigurationManager.AppSettings["alipay.appId"], ConfigurationManager.AppSettings["alipay.privateKey"]);
            AlipayTradeRefundRequest request = new AlipayTradeRefundRequest();
            request.BizContent = "{" + string.Format(
            "    \"out_trade_no\":\"{0}\"," +
            "    \"trade_no\":\"{1}\"," +
            "    \"refund_amount\":{2}," +
            "    \"refund_reason\":\"正常退款\"," +
            "    \"out_request_no\":{3}", out_trade_no, trade_no, amount, out_request_no) + "  }";
            AlipayTradeRefundResponse response = client.Execute(request);
            if (!response.IsError)
            {
                WebApiConfig.log.Error("支付宝退款成功:" + out_trade_no + "," + out_request_no + "," + amount);
                JObject localResult;
                if (!TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, response.TradeNo, PaymentType.Alipay, string.Empty, TradeStatus.REFUND, out localResult))
                {
                    WebApiConfig.log.Error(out_trade_no + "-" + trade_no + "支付宝退款成功,本地数据库状态维护失败:" + out_trade_no);
                    return new JObject(new JProperty("Trade", result));
                }
                else
                {
                    return new JObject(new JProperty("Trade", localResult));
                }
            }
            else
            {
                WebApiConfig.log.Error("支付宝退款失败:" + out_trade_no + "," + out_request_no + "," + amount + "-" + response.SubMsg);
                throw new Exception("支付宝退款失败:" + response.SubMsg);
            }
        }
    }
}