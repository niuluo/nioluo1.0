using Aop.Api.Util;
using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;

namespace eHospital.Payment.Alipay
{
    /// <summary>
    /// 功能：服务器异步通知页面
    /// 版本：3.3
    /// 日期：2012-07-10
    /// 说明：
    /// 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
    /// 该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
    /// 
    /// ///////////////////页面功能说明///////////////////
    /// 创建该页面文件时，请留心该页面文件中无任何HTML代码及空格。
    /// 该页面不能在本机电脑测试，请到服务器上做测试。请确保外部可以访问该页面。
    /// 该页面调试工具请使用写文本函数logResult。
    /// 如果没有收到该页面返回的 success 信息，支付宝会在24小时内按一定的时间策略重发通知
    /// </summary>
    public partial class notify : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            SortedDictionary<string, string> sPara = GetRequestPost();
            if (sPara.Count > 0)//判断是否有带返回参数
            {
                var str = string.Empty;
                foreach(var item in sPara)
                {
                    str += string.Format("{0}:{1},", item.Key, item.Value);
                }

                WebApiConfig.log.Info(str);

                Notify aliNotify = new Notify();
                //bool verifyResult = aliNotify.Verify(sPara, Request.Form["notify_id"], Request.Form["sign"]);
                string sign = sPara["sign"];
                sPara.Remove("sign");
                sPara.Remove("sign_type");
                string signContent = AlipaySignature.GetSignContent(sPara);
                var verifyResult = AlipaySignature.RSACheckContent(signContent, sign, ConfigurationManager.AppSettings["alipay.publicKey"], Request.QueryString["charset"], "RSA", false);
                if (verifyResult)//验证成功
                {
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //请在这里加上商户的业务逻辑程序代码


                    //——请根据您的业务逻辑来编写程序（以下代码仅作参考）——
                    //获取支付宝的通知返回参数，可参考技术文档中服务器异步通知参数列表

                    //商户订单号

                    string out_trade_no = Request.Form["out_trade_no"];

                    //支付宝交易号

                    string trade_no = Request.Form["trade_no"];

                    //交易状态
                    string trade_status = Request.Form["trade_status"];
                    JObject localResult;
                    int resultCode;
                    if (Request.Form["trade_status"] == "TRADE_FINISHED")
                    {
                        //判断该笔订单是否在商户网站中已经做过处理
                        //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                        //请务必判断请求时的total_fee、seller_id与通知时获取的total_fee、seller_id为一致的
                        //如果有做过处理，不执行商户的业务程序

                        //注意：
                        //退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知
                        WebApiConfig.log.Info(out_trade_no + "-" + trade_no + "支付宝通知订单完成");
                        if (!TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, trade_no, PaymentType.Alipay, trade_status, TradeStatus.NOTIFYFINISHED, out localResult))
                        {
                            WebApiConfig.log.Error(out_trade_no + "-" + trade_no + "支付宝通知订单完成,本地数据库状态维护失败");
                        }

                        resultCode = (int)TradeStatus.NOTIFYFINISHED;
                    }
                    else if (Request.Form["trade_status"] == "TRADE_SUCCESS")
                    {
                        //判断该笔订单是否在商户网站中已经做过处理
                        //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                        //请务必判断请求时的total_fee、seller_id与通知时获取的total_fee、seller_id为一致的
                        //如果有做过处理，不执行商户的业务程序

                        //注意：
                        //付款完成后，支付宝系统发送该交易状态通知
                        WebApiConfig.log.Info(out_trade_no + "-" + trade_no + "支付宝通知订单支付成功");
                        if (!TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, trade_no, PaymentType.Alipay, trade_status, TradeStatus.NOTIFYSUCCESS, out localResult))
                        {
                            WebApiConfig.log.Error(out_trade_no + "-" + trade_no + "支付宝通知订单支付成功,本地数据库状态维护失败");
                        }

                        resultCode = (int)TradeStatus.NOTIFYSUCCESS;
                    }
                    else
                    {
                        TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, trade_no, PaymentType.Alipay, trade_status, TradeStatus.NOTIFYISSUE, out localResult);
                        WebApiConfig.log.Error(out_trade_no + "-" + trade_no + "支付宝通知失败");
                        resultCode = (int)TradeStatus.NOTIFYISSUE;
                    }

                    // 通知患者端
                    PatientCustomerBusiness.NotifyPatient(localResult);
                    Response.Clear();
                    Response.Write("success");
                    Response.End();
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                }
                else//验证失败
                {
                    WebApiConfig.log.Error("支付宝通知验证失败");
                    Response.Write("支付宝通知验证失败");
                }
            }
            else
            {
                WebApiConfig.log.Error("支付宝无通知参数");
                Response.Write("支付宝无通知参数");
            }
        }

        /// <summary>
        /// 获取支付宝POST过来通知消息，并以“参数名=参数值”的形式组成数组
        /// </summary>
        /// <returns>request回来的信息组成的数组</returns>
        public SortedDictionary<string, string> GetRequestPost()
        {
            int i = 0;
            SortedDictionary<string, string> sArray = new SortedDictionary<string, string>();
            //Load Form variables into NameValueCollection variable.
            var coll = Request.Form;

            // Get names of all forms into a string array.
            String[] requestItem = coll.AllKeys;

            for (i = 0; i < requestItem.Length; i++)
            {
                sArray.Add(requestItem[i], Request.Form[requestItem[i]]);
            }

            return sArray;
        }
    }
}