using Aop.Api.Util;
using eHospital.Log;
using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;

namespace eHospital.Payment.Alipay
{
    public partial class _return : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            WebApiConfig.log.Info(Request.RawUrl);
            SortedDictionary<string, string> sPara = GetRequestGet();
            if (sPara.Count > 0)//判断是否有带返回参数
            {
                Notify aliNotify = new Notify();
                //bool verifyResult = aliNotify.Verify(sPara, Request.QueryString["notify_id"], Request.QueryString["sign"]);

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
                    //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表

                    //商户订单号

                    string out_trade_no = Request.QueryString["out_trade_no"];

                    //支付宝交易号

                    string trade_no = Request.QueryString["trade_no"];

                    //交易状态
                    string trade_status = Request.QueryString["trade_status"] ?? string.Empty;
                    JObject localResult;
                    int resultCode;
                    if (Request.QueryString["trade_status"] == "TRADE_FINISHED")
                    {
                        //判断该笔订单是否在商户网站中已经做过处理
                        //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                        //如果有做过处理，不执行商户的业务程序
                        WebApiConfig.log.Info(out_trade_no + "-" + trade_no + "支付宝返回订单完成");
                        if (!TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, trade_no, PaymentType.Alipay, trade_status, TradeStatus.RETURNFINISHED, out localResult))
                        {
                            WebApiConfig.log.Error(out_trade_no + "-" + trade_no + "支付宝返回订单完成,本地数据库状态维护失败");
                        }

                        resultCode = (int)TradeStatus.RETURNFINISHED;
                    }
                    else if (Request.QueryString["trade_status"] == "TRADE_SUCCESS")
                    {
                        WebApiConfig.log.Info(out_trade_no + "-" + trade_no + "支付宝返回订单支付成功");
                        if (!TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, trade_no, PaymentType.Alipay, trade_status, TradeStatus.RETURNSUCCESS, out localResult))
                        {
                            WebApiConfig.log.Error(out_trade_no + "-" + trade_no + "支付宝返回订单支付成功,本地数据库状态维护失败");
                        }

                        resultCode = (int)TradeStatus.RETURNSUCCESS;
                    }
                    else
                    {
                        WebApiConfig.log.Error(out_trade_no + "-" + trade_no + "支付宝沒有返回订单支付結果");
                        // ? 新接口return 沒有trade_status
                        //TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, trade_no, PaymentType.Alipay, trade_status, TradeStatus.RETURNISSUE, out localResult);
                        //resultCode = (int)TradeStatus.RETURNISSUE;
                        TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, trade_no, PaymentType.Alipay, trade_status, TradeStatus.RETURNISSUE, out localResult);
                        resultCode = (int)TradeStatus.RETURNSUCCESS;
                    }

                    var returnUrl = localResult.GetValue("ReturnUrl") == null ? string.Empty : localResult.GetValue("ReturnUrl").ToString();
                    if (string.IsNullOrEmpty(returnUrl))
                    {
                        //打印页面
                        Response.Write(out_trade_no + "订单处理完毕");
                    }
                    else
                    {
                        var fee = localResult.GetValue("Fee").ToString();
                        Response.Clear();
                        Response.Write("<script>top.postMessage('{\"url\":\"" + string.Format("{0}?result={1}&tradeNo={2}&fee={3}\"", returnUrl, resultCode, out_trade_no, fee) + "}', '*');</script>");
                        Response.End();
                    }

                    //——请根据您的业务逻辑来编写程序（以上代码仅作参考）——
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                }
                else//验证失败
                {
                    WebApiConfig.log.Error("支付宝返回结果验证失败");
                    Response.Write("支付宝返回结果验证失败");
                }
            }
            else
            {
                WebApiConfig.log.Error("支付宝返回结果无返回参数");
                Response.Write("支付宝返回结果无返回参数");
            }
        }

        /// <summary>
        /// 获取支付宝GET过来通知消息，并以“参数名=参数值”的形式组成数组
        /// </summary>
        /// <returns>request回来的信息组成的数组</returns>
        public SortedDictionary<string, string> GetRequestGet()
        {
            int i = 0;
            SortedDictionary<string, string> sArray = new SortedDictionary<string, string>();
            NameValueCollection coll;
            //Load Form variables into NameValueCollection variable.
            coll = Request.QueryString;

            // Get names of all forms into a string array.
            String[] requestItem = coll.AllKeys;

            for (i = 0; i < requestItem.Length; i++)
            {
                sArray.Add(requestItem[i], Request.QueryString[requestItem[i]]);
            }

            return sArray;
        }
    }
}