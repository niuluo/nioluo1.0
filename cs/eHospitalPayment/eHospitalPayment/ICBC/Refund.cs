using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Xml.Linq;

namespace eHospital.Payment.ICBC
{
    public class Refund
    {
        //public static JObject execute(string from, string out_trade_no, string trade_no, string refund_amount, JObject result)
        //{
        //    // 标识一次退款请求，同一笔交易多次退款需要保证唯一，如需部分退款，则此参数必传。
        //    var amount = (double.Parse(refund_amount)).ToString();
        //    var now = DateTime.Now;
        //    var seqno = now.ToString("yyyyMMddHHmmssfff") + CommonBusiness.CreateRandom();
        //    var signTime = now.ToString("yyyyMMddHHmmssfff");
        //    var tranDate = now.ToString("yyyyMMdd");
        //    var tranTime = now.ToString("HHmmssfff");
        //    var sb = new StringBuilder();
        //    sb.Append("<?xml version=\"1.0\" encoding=\"GBK\"?>");
        //    sb.Append("<CMS>");
        //    sb.Append("<eb>");
        //    sb.Append("<pub>");
        //    sb.Append("<TransCode>EBUSCOM</TransCode>"); //交易代码
        //    sb.Append("<CIS>100190013673155</CIS>"); // 客户注册时的归属编码,集团CIS号
        //    sb.Append("<BankCode>102</BankCode>"); // 客户注册时的归属单位,归属银行编号
        //    sb.Append("<ID>Niuluo.y.1001</ID>	"); // 无证书客户可上送空
        //    sb.Append("<TranDate>" + tranDate + "</TranDate>"); // ERP系统产生的交易日期，格式是yyyyMMdd
        //    sb.Append("<TranTime>" + tranTime + "</TranTime>"); // ERP系统产生的交易时间，格式如HHmmssSSS，精确到毫秒
        //    sb.Append("<fSeqno>" + seqno + "</fSeqno>"); // ERP系统产生的指令包序列号，一个集团永远不能重复
        //    sb.Append("</pub>");
        //    sb.Append("<in>");
        //    sb.Append("<TranType>0</TranType>"); // 0：退货 1：返还  2：转付
        //    sb.Append("<ShopType>2</ShopType>"); // 1：B2B商城  2：B2C商城
        //    sb.Append("<ShopCode>" + ConfigurationManager.AppSettings["icbc.merID"] + "</ShopCode>"); // 商城代码
        //    sb.Append("<ShopAcct>" + ConfigurationManager.AppSettings["icbc.merAcct"] + "</ShopAcct>"); // 商城账号 银联订单不可以上送
        //    sb.Append("<OrderNum>" + out_trade_no + "</OrderNum>");
        //    sb.Append("<PayType></PayType>"); // 0：普通 1：加急（B2C交易可为空）
        //    sb.Append("<PayDate>" + out_trade_no.Substring(0, 8) + "</PayDate>"); // yyyyMMdd(支持14位日期，前8位生效)
        //    sb.Append("<TransferName></TransferName>"); // B2C转付操作时必输，其他情况为空
        //    sb.Append("<TransferAccNo></TransferAccNo>"); // B2C转付操作时必输，其他情况为空
        //    sb.Append("<PayAmt>" + amount + "</PayAmt>"); // 以分为单位,B2C转付交易时需控制单笔金额（<=5万元）, 融e购订单复用为现金支付金额
        //    sb.Append("<SignTime>" + signTime + "</SignTime>"); // 格式是yyyyMMddHHmmssSSS
        //    sb.Append("<ReqReserved1></ReqReserved1>"); // 退货时，可输入退货原因
        //    sb.Append("<ReqReserved2></ReqReserved2>	"); // 融e购订单复用为退货积分值|退货积分等值金额|退货积分对应商户金额
        //    sb.Append("<AcctSeq></AcctSeq>	");
        //    sb.Append("</in>");
        //    sb.Append("</eb>");
        //    sb.Append("</CMS>");

        //    var queryParams = new StringBuilder();
        //    queryParams.Append("Version=0.0.1.0");
        //    queryParams.Append("&TransCode=EBUSCOM");
        //    queryParams.Append("&BankCode=102");
        //    queryParams.Append("&GroupCIS=100190013673155");
        //    queryParams.Append("&ID=Niuluo.y.1001"); // 客户的证书ID（无证书客户可空)
        //    queryParams.Append("&PackageID=" + seqno); // 客户的指令包序列号（由客户ERP系统产生，不可重复)
        //    queryParams.Append("&Cert=客户的证书公钥信息（进行BASE64编码)");
        //    queryParams.Append("&reqData=" + CBCPayOnline.Encode(sb.ToString())); // 客户的xml请求数据

        //    var errorInfo = string.Empty;
        //    CBCPayOnline.PostDataBySSL(queryParams.ToString(), "https://银行通讯前置的地址和加密端口号?请求数据", string.Empty, string.Empty, out errorInfo);
        //    WebApiConfig.log.Info("工行退费返回结果：" + errorInfo);
        //    if (errorInfo.IndexOf("errorCode=") > -1)
        //    {
        //        WebApiConfig.log.Error("工行退费失败：" + errorInfo);
        //        throw new Exception("工行退费失败");
        //    }
        //    else if (errorInfo.IndexOf("reqData=") > -1)
        //    {
        //        var returnStr = CBCPayOnline.Decode(errorInfo.Replace("reqData=", string.Empty), "gbk");
        //        WebApiConfig.log.Info("工行退费返回xml：" + returnStr);
        //        var doc = XDocument.Parse(returnStr);
        //        var orderNum = doc.Descendants("OrderNum").FirstOrDefault().Value;
        //        var resultCode = doc.Descendants("Result").FirstOrDefault().Value;
        //        var fee = doc.Descendants("PayAmt").FirstOrDefault().Value;
        //        var retCode = doc.Descendants("RetCode").FirstOrDefault().Value;
        //        if (orderNum != out_trade_no)
        //        {
        //            WebApiConfig.log.Error("工行退费订单号不匹配：" + orderNum + "&" + out_trade_no);
        //            throw new Exception("工行退费交易不成功");
        //        }
        //        else if (resultCode != "1")
        //        {
        //            WebApiConfig.log.Error("工行退费交易不成功：" + orderNum + "&" + resultCode);
        //            throw new Exception("工行退费交易不成功");
        //        }
        //        else
        //        {
        //            WebApiConfig.log.Error("工行退费成功:" + orderNum + "&" + fee);
        //            JObject localResult;
        //            if (!TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, retCode, PaymentType.ICBC, string.Empty, TradeStatus.REFUND, out localResult))
        //            {
        //                WebApiConfig.log.Error("工行退费成功,本地数据库状态维护失败:" + orderNum);
        //                return new JObject(new JProperty("Trade", result));
        //            }
        //            else
        //            {
        //                return new JObject(new JProperty("Trade", localResult));
        //            }
        //        }
        //    }
        //    else
        //    {
        //        WebApiConfig.log.Error("工行退费结果未知：" + errorInfo);
        //        throw new Exception("工行退费失败");
        //    }
        //}

        public static JObject execute(string from, string out_trade_no, string trade_no, string refund_amount, JObject result)
        {
            //return new JObject(new JProperty("Trade", result));

            // 标识一次退款请求，同一笔交易多次退款需要保证唯一，如需部分退款，则此参数必传。
            var amount = (double.Parse(refund_amount)).ToString();
            var now = DateTime.Now;
            var seqno = now.ToString("yyyyMMddHHmmssfff") + CommonBusiness.CreateRandom();
            var signTime = now.ToString("yyyyMMddHHmmssfff");
            var tranDate = now.ToString("yyyyMMdd");
            var tranTime = now.ToString("HHmmssfff");
            var sb = new StringBuilder();
            sb.Append("<?xml version=\"1.0\" encoding=\"GBK\"?>");
            sb.Append("<CMS>");
            sb.Append("<eb>");
            sb.Append("<pub>");
            sb.Append("<TransCode>EBUSCOM</TransCode>"); //交易代码
            sb.Append("<CIS>100190013673155</CIS>"); // 客户注册时的归属编码,集团CIS号
            sb.Append("<BankCode>102</BankCode>"); // 客户注册时的归属单位,归属银行编号
            sb.Append("<ID>Niuluo.y.1001</ID>	"); // 无证书客户可上送空
            sb.Append("<TranDate>" + tranDate + "</TranDate>"); // ERP系统产生的交易日期，格式是yyyyMMdd
            sb.Append("<TranTime>" + tranTime + "</TranTime>"); // ERP系统产生的交易时间，格式如HHmmssSSS，精确到毫秒
            sb.Append("<fSeqno>" + seqno + "</fSeqno>"); // ERP系统产生的指令包序列号，一个集团永远不能重复
            sb.Append("</pub>");
            sb.Append("<in>");
            sb.Append("<TranType>0</TranType>"); // 0：退货 1：返还  2：转付
            sb.Append("<ShopType>2</ShopType>"); // 1：B2B商城  2：B2C商城
            sb.Append("<ShopCode>" + ConfigurationManager.AppSettings["icbc.merID"] + "</ShopCode>"); // 商城代码
            sb.Append("<ShopAcct>" + ConfigurationManager.AppSettings["icbc.merAcct"] + "</ShopAcct>"); // 商城账号 银联订单不可以上送
            sb.Append("<OrderNum>" + out_trade_no + "</OrderNum>");
            sb.Append("<PayType></PayType>"); // 0：普通 1：加急（B2C交易可为空）
            sb.Append("<PayDate>" + out_trade_no.Substring(0, 8) + "</PayDate>"); // yyyyMMdd(支持14位日期，前8位生效)
            sb.Append("<TransferName></TransferName>"); // B2C转付操作时必输，其他情况为空
            sb.Append("<TransferAccNo></TransferAccNo>"); // B2C转付操作时必输，其他情况为空
            sb.Append("<PayAmt>" + amount + "</PayAmt>"); // 以分为单位,B2C转付交易时需控制单笔金额（<=5万元）, 融e购订单复用为现金支付金额
            sb.Append("<SignTime>" + signTime + "</SignTime>"); // 格式是yyyyMMddHHmmssSSS
            sb.Append("<ReqReserved1></ReqReserved1>"); // 退货时，可输入退货原因
            sb.Append("<ReqReserved2></ReqReserved2>	"); // 融e购订单复用为退货积分值|退货积分等值金额|退货积分对应商户金额
            sb.Append("<AcctSeq></AcctSeq>	");
            sb.Append("</in>");
            sb.Append("</eb>");
            sb.Append("</CMS>");

            try
            {
                // NC签名数据处理
                ASCIIEncoding encoding = new ASCIIEncoding();
                byte[] data = encoding.GetBytes(sb.ToString());

                WebRequest webRequest = WebRequest.Create("http://www.niuluo-tech.cn:95");
                HttpWebRequest httpRequest = webRequest as HttpWebRequest;
                httpRequest.KeepAlive = true;
                httpRequest.UserAgent = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)";
                httpRequest.ContentType = "INFOSEC_SIGN/1.0";
                httpRequest.Method = "POST";
                httpRequest.ContentLength = data.Length;
                Stream requestStream = httpRequest.GetRequestStream();
                requestStream.Write(data, 0, data.Length);
                requestStream.Close();
                Stream responseStream = null;
                responseStream = httpRequest.GetResponse().GetResponseStream();

                string stringResponse = string.Empty;
                if (responseStream != null)
                {
                    using (StreamReader responseReader =
                        new StreamReader(responseStream, Encoding.GetEncoding("GBK")))
                    {
                        stringResponse = responseReader.ReadToEnd();
                    }

                    responseStream.Close();
                }

                WebApiConfig.log.Info("NC签名数据:" + stringResponse);
                var beginSign = 0;
                var endSign = 0;
                try
                {
                    beginSign = stringResponse.IndexOf("<sign>") + 6;
                    endSign = stringResponse.IndexOf("</sign>");
                    WebApiConfig.log.Info("NC签名结果:" + beginSign + "&" + endSign);
                }
                catch (Exception e)
                {
                    WebApiConfig.log.Error("！！！！！！！！！！接收签名数据失败，请检查nc设置！！！！！！！！！！");
                }

                // NC工行退款
                var repSignContent = stringResponse.Substring(beginSign, endSign - beginSign);
                var queryParams = new StringBuilder();
                queryParams.Append("Version=0.0.1.0");
                queryParams.Append("&TransCode=EBUSCOM");
                queryParams.Append("&BankCode=102");
                queryParams.Append("&GroupCIS=100190013673155");
                queryParams.Append("&ID=Niuluo.y.1001"); // 客户的证书ID（无证书客户可空)
                queryParams.Append("&PackageID=" + seqno); // 客户的指令包序列号（由客户ERP系统产生，不可重复)
                queryParams.Append("&Cert=");
                queryParams.Append("&reqData=" + repSignContent); // 客户的xml请求数据
                ASCIIEncoding encoding2 = new ASCIIEncoding();
                byte[] data2 = encoding.GetBytes(queryParams.ToString());
                WebRequest webRequest2 = WebRequest.Create("http://www.niuluo-tech.cn:94/servlet/ICBCCMPAPIReqServlet?PackageID=" + seqno + "&SendTime=" + now.ToString("yyyyMMddHHmmss"));
                HttpWebRequest httpRequest2 = webRequest2 as HttpWebRequest;
                httpRequest2.KeepAlive = true;
                httpRequest2.UserAgent = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)";
                httpRequest2.ContentType = "application/x-www-form-urlencoded";
                httpRequest2.Method = "POST";
                httpRequest2.ContentLength = data2.Length;
                Stream requestStream2 = httpRequest2.GetRequestStream();
                requestStream2.Write(data2, 0, data2.Length);
                requestStream2.Close();
                Stream responseStream2 = null;
                responseStream2 = httpRequest2.GetResponse().GetResponseStream();
                string stringResponse2 = string.Empty;
                if (responseStream2 != null)
                {
                    using (StreamReader responseReader =
                        new StreamReader(responseStream2, Encoding.GetEncoding("GBK")))
                    {
                        stringResponse2 = responseReader.ReadToEnd();
                    }

                    responseStream2.Close();
                }

                WebApiConfig.log.Info("工行退费返回结果：" + stringResponse2);
                if (stringResponse2.IndexOf("errorCode=") > -1)
                {
                    WebApiConfig.log.Error("工行退费失败：" + stringResponse2);
                    throw new Exception("工行退费失败");
                }
                else if (stringResponse2.IndexOf("reqData=") > -1)
                {
                    var returnStr = CBCPayOnline.Decode(stringResponse2.Replace("reqData=", string.Empty), "gbk");
                    WebApiConfig.log.Info("工行退费返回xml：" + returnStr);
                    var doc = XDocument.Parse(returnStr);
                    var orderNum = doc.Descendants("OrderNum").FirstOrDefault().Value;
                    var resultCode = doc.Descendants("Result").FirstOrDefault().Value;
                    var fee = doc.Descendants("PayAmt").FirstOrDefault().Value;
                    var retCode = doc.Descendants("fSeqno").FirstOrDefault().Value;
                    if (orderNum != out_trade_no)
                    {
                        WebApiConfig.log.Error("工行退费订单号不匹配：" + orderNum + "&" + out_trade_no);
                        throw new Exception("工行退费交易不成功");
                    }
                    else if (resultCode != "1")
                    {
                        var retMsg = doc.Descendants("RetMsg").FirstOrDefault().Value;
                        WebApiConfig.log.Error("工行退费交易不成功：" + orderNum + "&" + resultCode + ":" + retMsg);
                        throw new Exception("工行退费交易不成功");
                    }
                    else
                    {
                        WebApiConfig.log.Info("工行退费成功:" + orderNum + "&" + fee + ":" + retCode);
                        JObject localResult;
                        if (!TradeBusiness.UpdateTradeStatusSeveralTimes(out_trade_no, result.GetValue("ActualTradeNo").ToString(), PaymentType.ICBC, string.Empty, TradeStatus.REFUND, out localResult))
                        {
                            WebApiConfig.log.Error("工行退费成功,本地数据库状态维护失败:" + orderNum);
                            return new JObject(new JProperty("Trade", result));
                        }
                        else
                        {
                            return new JObject(new JProperty("Trade", localResult));
                        }
                    }
                }
                else
                {
                    WebApiConfig.log.Error("工行退费结果未知：" + stringResponse2);
                    throw new Exception("工行退费失败");
                }
            }
            catch (Exception e)
            {
                WebApiConfig.log.Error(e.Message);
                WebApiConfig.log.Error("退费出错:" + e.ToString());
            }

            return null;
        }
    }
}