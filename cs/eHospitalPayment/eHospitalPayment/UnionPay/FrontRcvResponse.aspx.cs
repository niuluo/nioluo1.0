using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace eHospital.Payment.UnionPay
{
    public partial class FrontRcvResponse : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // **************演示前台接收银联返回报文交易结果展示***********************
            if (Request.HttpMethod == "POST")
            {
                // 使用Dictionary保存参数
                Dictionary<string, string> resData = new Dictionary<string, string>();
                var coll = Request.Form;
                string[] requestItem = coll.AllKeys;
                for (int i = 0; i < requestItem.Length; i++)
                {
                    resData.Add(requestItem[i], Request.Form[requestItem[i]]);
                }

                // 返回报文中不包含UPOG,表示Server端正确接收交易请求,则需要验证Server端返回报文的签名
                if (AcpService.Validate(resData, System.Text.Encoding.UTF8))
                {
                    var respcode = resData["respCode"]; //00、A6为成功，其余为失败。其他字段也可按此方式获取。
                    var out_trade_no = resData["orderId"];
                    var trade_no = resData["queryId"];

                    //如果卡号我们业务配了会返回且配了需要加密的话，请按此方法解密
                    //if(resData.ContainsKey("accNo"))
                    //{
                    //    string accNo = SecurityUtil.DecryptData(resData["accNo"], System.Text.Encoding.UTF8); 
                    //}

                    JObject localResult;
                    int resultCode;
                    if (respcode == "00" || respcode == "A6")
                    {
                        //判断该笔订单是否在商户网站中已经做过处理
                        //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                        //如果有做过处理，不执行商户的业务程序
                        WebApiConfig.log.Info(out_trade_no + "-" + trade_no + "银联返回完成");
                        if (!TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, trade_no, PaymentType.UnionPay, respcode, TradeStatus.RETURNSUCCESS, out localResult))
                        {
                            WebApiConfig.log.Error(out_trade_no + "-" + trade_no + "银联返回完成,本地数据库状态维护失败");
                        }

                        resultCode = (int)TradeStatus.RETURNSUCCESS;
                    }
                    else
                    {
                        WebApiConfig.log.Error(out_trade_no + "-" + trade_no + "银联返回错误");
                        TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, trade_no, PaymentType.UnionPay, respcode, TradeStatus.RETURNISSUE, out localResult);
                        resultCode = (int)TradeStatus.RETURNISSUE;
                    }

                    var returnUrl = localResult.GetValue("ReturnUrl") == null ? string.Empty : localResult.GetValue("ReturnUrl").ToString();
                    if (string.IsNullOrEmpty(returnUrl))
                    {
                        //打印页面
                        //商户端根据返回报文内容处理自己的业务逻辑 ,DEMO此处只输出报文结果
                        StringBuilder builder = new StringBuilder();
                        builder.Append("<tr><td align=\"center\" colspan=\"2\"><b>商户端接收银联返回报文并按照表格形式输出结果</b></td></tr>");

                        for (int i = 0; i < requestItem.Length; i++)
                        {
                            builder.Append("<tr><td width=\"30%\" align=\"right\">" + requestItem[i] + "</td><td style='word-break:break-all'>" + Request.Form[requestItem[i]] + "</td></tr>");
                        }

                        builder.Append("<tr><td width=\"30%\" align=\"right\">商户端验证银联返回报文结果</td><td>验证签名成功.</td></tr>");
                        Response.Write(builder.ToString());
                    }
                    else
                    {
                        var fee = localResult.GetValue("Fee").ToString();
                        Response.Clear();
                        Response.Write("<script>top.postMessage('{\"url\":\"" + string.Format("{0}?result={1}&tradeNo={2}&fee={3}\"", returnUrl, resultCode, out_trade_no, fee) + "}', '*');</script>");
                        Response.End();
                    }
                }
                else
                {
                    Response.Write("<tr><td width=\"30%\" align=\"right\">商户端验证银联返回报文结果</td><td>验证签名失败.</td></tr>");
                }

            }
        }
    }
}