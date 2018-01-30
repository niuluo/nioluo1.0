using eHospital.Payment.Business;
using eHospital.Payment.Controllers;
using eHospital.Payment.Enum;
using ICBCEBANKUTILLib;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Web;

namespace eHospital.Payment.ICBC
{
    public static class CBCPayOnline
    {
        /// <summary>
        /// 银行证书文件地址
        /// </summary>
        static string strCertFN = ConfigurationManager.AppSettings["icbc.strCertFN"];

        /// <summary>
        /// 商户证书文件地址
        /// </summary>
        static string strCertFNM = ConfigurationManager.AppSettings["icbc.strCertFNM"];

        /// <summary>
        /// 私钥文件名
        /// </summary>
        static string strKeyFN = ConfigurationManager.AppSettings["icbc.strKeyFN"];

        /// <summary>
        /// 私钥口令
        /// </summary>
        static string strKey = "12345678";
        static string api_url = "https://corporbank.icbc.com.cn:446/servlet/ICBCINBSEBusinessServlet";
        static string post_params = "APIName=EAPI&APIVersion=001.001.002.001&MerReqData=";
        //static string cert_path = HttpContext.Current.Server.MapPath("~/..");
        static string cert_path = ConfigurationManager.AppSettings["icbc.strPfx"];
        //商户证书 HttpContext.Current.Server.MapPath("~/..");

        static CBCPayOnline()
        {

        }

        /// <summary>
        /// 获取工商银行验证信息
        /// </summary>
        /// <param name="tranData"></param>
        /// <returns></returns>
        public static string[] GetCheckInfo(string tranData)
        {
            var strMerSignMsg = string.Empty;
            var strMerCert = string.Empty;
            var icbcObj = new B2CUtil();
            var jg = icbcObj.init(strCertFN, strCertFNM, strKeyFN, strKey);
            if (jg == 0)
            {
                strMerSignMsg = icbcObj.signC(tranData, tranData.Length);
                if (string.IsNullOrEmpty(strMerSignMsg))
                {
                    var returnCode = icbcObj.getRC();
                    WebApiConfig.log.Error("错误编码:" + returnCode + "，签名错误");
                }

                strMerCert = icbcObj.getCert(1);
            }
            else
            {
                WebApiConfig.log.Error(jg.ToString() + ",证书错误或私钥错误编码");
            }

            return new string[] { strMerSignMsg, strMerCert };
        }

        /// <summary>
        /// 获取工商银行验证信息
        /// </summary>
        /// <param name="argIcbc"></param>
        /// <returns></returns>
        public static bool GetCheckReturnInfo(string tranData, string merSignMsg)
        {
            string strMerSignMsg = string.Empty;
            B2CUtil icbcObj = new B2CUtil();
            if (icbcObj.init(strCertFN, strCertFNM, strKeyFN, strKey) == 0)
            {
                tranData = Decode(tranData);
                //判断验证银行签名是否成功
                if (icbcObj.verifySignC(tranData, tranData.Length, merSignMsg, merSignMsg.Length) == 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 解密信息
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string Decode(string str, string language = null)
        {
            byte[] outputb = Convert.FromBase64String(str);
            if (string.IsNullOrEmpty(language))
            {
                string orgStr = Encoding.Default.GetString(outputb);
                return orgStr;
            } else
            {
                return Encoding.GetEncoding(language).GetString(outputb);
            }
        }

        /// <summary>
        /// 加密信息
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string Encode(string str, string language = null)
        {
            if (!string.IsNullOrEmpty(language))
            {
                var bytes = Encoding.GetEncoding(language).GetBytes(str);
                return Convert.ToBase64String(bytes);
            }
            else
            {
                var bytes = Encoding.Default.GetBytes(str);
                return Convert.ToBase64String(bytes);
            }
        }

        /// <summary>
        /// 检查未提交订单
        /// </summary>
        public static void CheckOrder()
        {
            while (true)
            {
                var now = DateTime.Now;
                var start = now.AddHours(-24);
                var list = TradeBusiness.GetTradeList(start.ToString(), now.ToString());
                var outMess = string.Empty;
                foreach (var item in list)
                {
                    var jObject = item as JObject;
                    var tradeNo = jObject.GetValue("TradeNo").ToString();
                    var status = jObject.GetValue("Status").ToString();
                    if (status == "4" || status == "7")
                    {
                        break;
                    }

                    try
                    {
                        var mess = CheckOrder(tradeNo, tradeNo.Substring(0, 8), ConfigurationManager.AppSettings["icbc.merID"], ConfigurationManager.AppSettings["icbc.merAcct"], out outMess);
                        if (mess.Length > 5)//缴费成功，未返回错误编码,返回xml数据
                        {
                            DataSet myds = new DataSet();
                            StringReader strReader = new StringReader(mess);
                            myds.ReadXml(strReader);
                            string stat = myds.Tables["out"].Rows[0]["tranStat"].ToString();
                            if (stat == "1" || stat == "0")
                            {
                                var actualTradeNo = myds.Tables["out"].Rows[0]["tranSerialNum"].ToString();
                                JObject localResult;
                                if (!TradeBusiness.UpdateTradeStatusSeveralTimes(tradeNo, actualTradeNo, PaymentType.ICBC, stat, TradeStatus.NOTIFYSUCCESS, out localResult))
                                {
                                    WebApiConfig.log.Info(tradeNo + ":工行查询支付成功,本地数据库状态维护失败");
                                }

                                // 通知患者端
                                PatientCustomerBusiness.NotifyPatient(localResult);
                            }
                            else//支付失败
                            {
                                WebApiConfig.log.Error(tradeNo + ":工行查询支付失败");
                            }
                        }
                        else
                        {
                            string pays = "";
                            switch (mess)
                            {
                                case "40972": pays = "API查询的订单不存在"; break;
                                case "40973": pays = "API查询过程中系统异常"; break;
                                case "40976": pays = "API查询系统异常"; break;
                                case "40977": pays = "商户证书信息错"; break;
                                case "40978": pays = "解包商户请求数据报错"; break;
                                case "40979": pays = "查询的订单不存在"; break;
                                case "40980": pays = "API查询过程中系统异常"; break;
                                case "40981": pays = "给商户打包返回数据错"; break;

                                case "40982": pays = "系统错误"; break;
                                case "40983": pays = "查询的订单不唯一"; break;
                                case "40987": pays = "商户代码或者商城账号有误"; break;
                                case "40947": pays = "给商户打包返回数据错"; break;
                                case "40948": pays = "商城状态非法"; break;
                                case "40949": pays = "商城类别非法"; break;

                                case "40950": pays = "商城应用类别非法"; break;
                                case "40951": pays = "商户证书id状态非法"; break;
                                case "40952": pays = "商户证书id未绑定"; break;
                                case "40953": pays = "商户id权限非法"; break;
                                case "40954": pays = "检查商户状态时数据库异常"; break;
                            }

                            WebApiConfig.log.Error(tradeNo + ":工行查询支付发生错误, 错误编码:" + mess + "-" + pays);
                        }
                    }
                    catch (Exception e)
                    {

                        WebApiConfig.log.Error(tradeNo + ":工行查询支付发生错误:" + e.ToString());
                    }
                }

                System.Threading.Thread.Sleep(1000 * 60 * 60);
            }
        }

        /// <summary>
        /// 查询订单
        /// </summary>
        /// <param name="strOrderNum">订单号</param>
        /// <param name="strTranDate">交易日期</param>
        /// <param name="strShopCode">商家代码</param>
        /// <param name="strShopAccount">商城账号</param>
        /// <param name="errInfo"></param>
        /// <returns></returns>
        public static string CheckOrder(string strOrderNum, string strTranDate, string strShopCode, string strShopAccount, out string errInfo)
        {
            try
            {
                errInfo = string.Empty;
                StringBuilder sb = new StringBuilder();
                sb.Append("<?xml  version=\"1.0\" encoding=\"GBK\" standalone=\"no\" ?><ICBCAPI><in><orderNum>");
                sb.Append(strOrderNum);
                sb.Append("</orderNum><tranDate>");
                sb.Append(strTranDate);
                sb.Append("</tranDate><ShopCode>");
                sb.Append(strShopCode);
                sb.Append("</ShopCode><ShopAccount>");
                sb.Append(strShopAccount);
                sb.Append("</ShopAccount></in></ICBCAPI>");
                string post_data = post_params + sb.ToString();
                string retruenstring = PostDataBySSL(post_data, api_url, cert_path, strKey, out errInfo);
                //var result = SpringFactory.BusinessFactory.GetBusinessAnonymousUser();
                //result.AddLogs("返回3：" + (retruenstring.Length > 400 ? retruenstring.Substring(0, 400) : retruenstring));
                if (retruenstring.Length <= 5)
                {
                    return retruenstring;
                }

                return HttpUtility.UrlDecode(retruenstring);
            }
            catch (Exception ex)
            {
                WebApiConfig.log.Error("返回1：" + "查询缴费接口失败" + ex.Message);
                errInfo = "查询缴费接口失败";
                return "99";
            }
        }

        /// <summary>
        /// 发送SSL加密请求
        /// </summary>
        /// <param name="post_data"></param>
        /// <param name="url"></param>
        /// <param name="cert_path"></param>
        /// <param name="cert_password"></param>
        /// <param name="errInfo"></param>
        /// <returns></returns>
        public static string PostDataBySSL(string post_data, string url, string cert_path, string cert_password, out string errInfo)
        {
            errInfo = string.Empty;
            try
            {
                ASCIIEncoding encoding = new ASCIIEncoding();
                byte[] data = encoding.GetBytes(post_data);
                if (!string.IsNullOrEmpty(cert_path))
                {
                    ServicePointManager.ServerCertificateValidationCallback = new RemoteCertificateValidationCallback(ValidateServerCertificate);
                }

                WebRequest webRequest = WebRequest.Create(url);
                HttpWebRequest httpRequest = webRequest as HttpWebRequest;
                if (cert_path.ToLower().EndsWith(".cer"))
                {
                    httpRequest.ClientCertificates.Add(X509Certificate.CreateFromCertFile(cert_path));
                }
                else if (!string.IsNullOrEmpty(cert_path))
                {
                    httpRequest.ClientCertificates.Add(new X509Certificate2(cert_path, cert_password, X509KeyStorageFlags.MachineKeySet));
                }

                httpRequest.KeepAlive = true;
                httpRequest.UserAgent = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)";
                httpRequest.ContentType = "application/x-www-form-urlencoded";
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

                return stringResponse;
            }
            catch (Exception e)
            {
                WebApiConfig.log.Error(e.Message);
                return string.Empty;
            }
        }

        public static bool ValidateServerCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }
    }
}