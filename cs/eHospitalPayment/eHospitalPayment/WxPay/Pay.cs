using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using Newtonsoft.Json.Linq;
using System;
using System.Web;

namespace eHospital.Payment.WxPay
{
    public class Pay
    {
        public static JObject createUrl(string from, string fromNo, string fee, string subject, string currentHost)
        {
            var now = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            var out_trade_no = now + CommonBusiness.CreateRandom();
            //付款金额，必填
            var total_fee = (double.Parse(fee)).ToString();

            //订单名称，必填
            if (string.IsNullOrEmpty(subject))
            {
                subject = "微信支付";
            }

            var content = GetUnifiedOrderResult(out_trade_no, total_fee, subject);

            // 本地数据维护 微信单位为分
            var result = TradeBusiness.AddTrade(out_trade_no, from, fromNo, PaymentType.WechatPay, fee, subject, null, "0");
            if (!(bool)result["Flg"])
            {
                throw new Exception("本地数据维护失败");
            }

            return new JObject(
                    new JProperty("Trade", ((JObject)result["Object"])["result"]),
                    new JProperty("Content", content));
        }

        /**
         * 调用统一下单，获得下单结果
         * @return 统一下单结果
         * @失败时抛异常WxPayException
         */
        public static JObject GetUnifiedOrderResult(string out_trade_no, string total_fee, string subject)
        {
            //统一下单
            WxPayData data = new WxPayData();
            data.SetValue("body", subject);
            data.SetValue("out_trade_no", out_trade_no);
            data.SetValue("total_fee", total_fee);
            data.SetValue("notify_url", WxPayConfig.NOTIFY_URL);//通知地址
            data.SetValue("trade_type", "APP");
            //data.SetValue("trade_type", "JSAPI");
            
            WxPayData result = WxPayApi.UnifiedOrder(data);
            if (!result.IsSet("appid") || !result.IsSet("prepay_id") || string.IsNullOrEmpty(result.GetValue("prepay_id").ToString()))
            {
                WebApiConfig.log.Error("微信统一下单出错!" + result.GetValue("return_msg") ?? string.Empty);
                throw new Exception("微信统一下单出错 !");
            }


            WxPayData res = new WxPayData();
            res.SetValue("prepayid", result.GetValue("prepay_id"));
            res.SetValue("appid", result.GetValue("appid"));
            res.SetValue("partnerid", result.GetValue("mch_id"));
            res.SetValue("package", "Sign=WXPay");
            res.SetValue("noncestr", result.GetValue("nonce_str"));
            var timestamp = WxPayApi.GenerateTimeStamp();
            res.SetValue("timestamp", timestamp);
            var sign = res.MakeSign();
            var value = new JObject(
                        new JProperty("prepay_id", result.GetValue("prepay_id")),
                        new JProperty("appid", result.GetValue("appid")),
                        new JProperty("partnerid", result.GetValue("mch_id")),
                        new JProperty("package", "Sign=WXPay"),
                        new JProperty("noncestr", result.GetValue("nonce_str")),
                        new JProperty("timestamp", timestamp),
                        new JProperty("sign", sign));

            return value;
        }
    }
}