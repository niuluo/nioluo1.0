using Aop.Api;
using Aop.Api.Request;
using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;

namespace eHospital.Payment.Alipay
{
    public class Pay
    {
        public static JObject createForm(PaymentType paymentType, string from, string fromNo, string fee, string subject, string returnUrl, string showUrl)
        {
            ////////////////////////////////////////////请求参数////////////////////////////////////////////
            //商户订单号，商户网站订单系统中唯一订单号，必填
            var now = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            var out_trade_no = now + CommonBusiness.CreateRandom();

            //订单名称，必填
            if (string.IsNullOrEmpty(subject))
            {
                subject = "alipay";
            }

            //付款金额，必填
            var total_fee = (double.Parse(fee) / 100).ToString();

            //商品描述，可空
            var body = string.Empty;
            ////////////////////////////////////////////////////////////////////////////////////////////////

            //把请求参数打包成数组
            var sParaTemp = new SortedDictionary<string, string>();
            if (paymentType == PaymentType.Alipay)
            {
                sParaTemp.Add("service", Config.directService);
                sParaTemp.Add("anti_phishing_key", Config.anti_phishing_key);
                sParaTemp.Add("exter_invoke_ip", Config.exter_invoke_ip);
            }
            else
            {
                sParaTemp.Add("service", Config.service);
                sParaTemp.Add("show_url", showUrl);
            }

            sParaTemp.Add("partner", Config.partner);
            sParaTemp.Add("seller_id", Config.seller_id);
            sParaTemp.Add("_input_charset", Config.input_charset.ToLower());
            sParaTemp.Add("payment_type", Config.payment_type);
            sParaTemp.Add("notify_url", Config.notify_url);
            sParaTemp.Add("return_url", Config.return_url);
            sParaTemp.Add("out_trade_no", out_trade_no);
            sParaTemp.Add("subject", subject);
            sParaTemp.Add("total_fee", total_fee);
            sParaTemp.Add("body", body);
            //其他业务参数根据在线开发文档，添加参数.文档地址:https://doc.open.alipay.com/doc2/detail.htm?spm=a219a.7629140.0.0.O9yorI&treeId=62&articleId=103740&docType=1
            //如sParaTemp.Add("参数名","参数值");

            // 本地数据维护 支付宝单位为元 支付宝类型统一为alipay 不好区分
            var result = TradeBusiness.AddTrade(out_trade_no, from, fromNo, PaymentType.Alipay, fee, subject, returnUrl, "0");
            if (!(bool)result["Flg"])
            {
                throw new Exception("本地数据维护失败");
            }

            //建立请求
            //var content = Submit.BuildRequest(sParaTemp, "get", "确认");
            //return new JObject(
            //        new JProperty("Trade", ((JObject)result["Object"])["result"]),
            //        new JProperty("Content", content));


            DefaultAopClient client = new DefaultAopClient(ConfigurationManager.AppSettings["alipay.port"], ConfigurationManager.AppSettings["alipay.appId"], ConfigurationManager.AppSettings["alipay.privateKey"]);
            client.return_url = Config.return_url;
            AlipayTradeWapPayRequest alipayRequest = new AlipayTradeWapPayRequest();//创建API对应的request
            // alipayRequest.setReturnUrl("http://domain.com/CallBack/return_url.jsp");
            alipayRequest.SetNotifyUrl(Config.notify_url);//在公共参数中设置回跳和通知地址
            alipayRequest.BizContent = "{" + string.Format("    \"out_trade_no\":\"{0}\"," +
                "    \"total_amount\":{1}," +
                "    \"subject\":\"{2}\"," +
                "    \"seller_id\":\"{3}\"," +
                "    \"product_code\":\"QUICK_WAP_PAY\"", out_trade_no, total_fee, subject, Config.seller_id)
                 +
                "  }";//填充业务参数
            var form = client.pageExecute(alipayRequest).Body; //调用SDK生成表单
            if(form.IndexOf("<form id='alipaysubmit'") > -1)
            {
                form = form.Replace("<form id='alipaysubmit'", "<form style='display:none;' id='alipaysubmit'");
            }

            form = "<h3>页面跳转中。。。</h3>" + form;

            return new JObject(
                    new JProperty("Trade", ((JObject)result["Object"])["result"]),
                    new JProperty("Content", form));
        }
    }
}