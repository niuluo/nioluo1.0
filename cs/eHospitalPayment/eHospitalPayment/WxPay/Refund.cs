using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using Newtonsoft.Json.Linq;
using System;

namespace eHospital.Payment.WxPay
{
    public class Refund
    {
        public static JObject execute(string from, string out_trade_no, string trade_no, string refund_amount, JObject result)
        {
            var content = RefundRequest(out_trade_no, refund_amount);
            if (content.IsSet("refund_id") && content.IsSet("transaction_id"))
            {
                WebApiConfig.log.Error("微信退款成功:" + out_trade_no);
                JObject localResult;
                if (!TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, content.GetValue("transaction_id").ToString(), PaymentType.WechatPay, content.GetValue("refund_id").ToString(), TradeStatus.REFUND, out localResult))
                {
                    WebApiConfig.log.Error(out_trade_no + "-" + trade_no + "微信退款成功,本地数据库状态维护失败:" + out_trade_no);
                    return new JObject(new JProperty("Trade", result));
                }
                else
                {
                    return new JObject(new JProperty("Trade", localResult));
                }
            }
            else
            {
                WebApiConfig.log.Error("微信退款成功， 返回值不对:" + out_trade_no);
                throw new Exception("微信退款成功， 返回值不对:" + out_trade_no);
            }
        }

        // 退费
        public static WxPayData RefundRequest(string out_trade_no, string total_fee)
        {
            // 标识一次退款请求，同一笔交易多次退款需要保证唯一，如需部分退款，则此参数必传。
            var now = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            var out_request_no = now + CommonBusiness.CreateRandom();

            //退费
            WxPayData data = new WxPayData();
            data.SetValue("out_trade_no", out_trade_no);
            data.SetValue("out_refund_no", out_request_no);
            data.SetValue("total_fee", total_fee);
            data.SetValue("refund_fee", total_fee);
            data.SetValue("op_user_id", WxPayConfig.MCHID);

            WxPayData result = WxPayApi.Refund(data);
            if (!result.IsSet("return_code") || result.GetValue("return_code").ToString() != "SUCCESS" ||
                (result.IsSet("result_code") && result.GetValue("result_code").ToString() != "SUCCESS"))
            {
                WebApiConfig.log.Error("微信退费失败-" + out_trade_no + "," + out_request_no + "," + total_fee + "    " + result.GetValue("return_msg") ?? string.Empty + "    " + result.GetValue("err_code") ?? string.Empty);
                throw new Exception("微信退费失败 !");
            } else
            {
                WebApiConfig.log.Error("微信退费成功-" + out_trade_no + "," + out_request_no + "," + total_fee);
            }

            return result;
        }
    }
}