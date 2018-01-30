using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using eHospital.Payment.Helper;
using eHospital.PaymentDTO;
using eHospitalUtility.CommonEnum;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Web;
using System.Web.Http;

namespace eHospital.Payment.Controllers
{
    public class RefundController : ApiController
    {
        // POST api/<controller>
        public HttpResponseMessage Post()
        {
            var response = new RetDTO();
            JObject requestHeader = null;
            JObject requestBody = null;
            var token = string.Empty;
            var timeStamp = string.Empty;
            var tradeNo = string.Empty;
            var fee = string.Empty;
            var from = string.Empty;
            var sign = string.Empty;

            try
            {
                var httpCurrent = HttpContext.Current;
                var request = HttpHelper.GetRequestJObjectFromStream(HttpContext.Current);
                requestHeader = (JObject)request.GetValue("Header");
                token = requestHeader.GetValue("Token").ToString();
                timeStamp = requestHeader.GetValue("TimeStamp").ToString();

                requestBody = (JObject)request.GetValue("Body");
                tradeNo = requestBody.GetValue("TradeNo").ToString();
                fee = requestBody.GetValue("Fee").ToString();
                from = requestBody.GetValue("From").ToString();
                sign = requestBody.GetValue("sign").ToString();
                WebApiConfig.log.Info("Refund controller:" + request.ToString());
            }
            catch (Exception ex)
            {
                WebApiConfig.log.Error("参数错误");
                response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.CatchError, "参数错误:" + ex.Message);
                return Request.CreateResponse(HttpStatusCode.BadRequest, response);
            }

            try
            {
                if (string.IsNullOrEmpty(token))
                {
                    WebApiConfig.log.Error("令牌为空");
                    response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.NoLogin, "令牌为空");
                    return Request.CreateResponse(HttpStatusCode.BadRequest, response);
                }

                double temp;
                if (string.IsNullOrEmpty(tradeNo) || !double.TryParse(fee, out temp) || string.IsNullOrEmpty(from) || string.IsNullOrEmpty(sign))
                {
                    WebApiConfig.log.Error("参数不正确");
                    response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.ParamError, "参数不正确");
                    return Request.CreateResponse(HttpStatusCode.BadRequest, response);
                }

                //sign = EncryptDES(tradeNo + "," + from);
                var signValue = Decode(sign);
                var splits = signValue.Split(',');
                if (splits.Length != 2 || splits[0] != tradeNo || splits[1] != from)
                {
                    WebApiConfig.log.Error("验证签名不过");
                    response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.ParamError, "验证签名不过");
                    return Request.CreateResponse(HttpStatusCode.BadRequest, response);
                }

                var result = TradeBusiness.GetByActualTradeNo(tradeNo, from);
                if (result == null)
                {
                    WebApiConfig.log.Error("传入的订单号不存在");
                    throw new Exception("传入的订单号不存在");
                }

                object responseForm;
                var paymentType = result.GetValue("Type").ToString();
                //if (paymentType == ((int)PaymentType.Alipay).ToString() || paymentType == ((int)PaymentType.AlipayWap).ToString())
                //{
                //    responseForm = Alipay.Refund.execute(from, tradeNo, string.Empty, fee, result);
                //}
                //else if (paymentType == ((int)PaymentType.WechatPay).ToString())
                //{
                //    responseForm = WxPay.Refund.execute(from, tradeNo, string.Empty, fee, result);
                //}
                if (paymentType == ((int)PaymentType.ICBC).ToString())
                {
                    WebApiConfig.log.Info("开始退款流程");
                    responseForm = ICBC.Refund.execute(from, result.GetValue("TradeNo").ToString(), string.Empty, fee, result);
                }
                else
                {
                    WebApiConfig.log.Error("该模式不支持退款");
                    throw new Exception("该模式不支持退款");
                }

                response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.Success, string.Empty);
                response.Body = responseForm;
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.CatchError, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }

        public string Decode(string data)
        {
            string KEY_64 = "ylj12345";// "VavicApp";密钥
            string IV_64 = "pay12345";// "VavicApp"; 向量
            try
            {
                byte[] byKey = System.Text.ASCIIEncoding.ASCII.GetBytes(KEY_64);
                byte[] byIV = System.Text.ASCIIEncoding.ASCII.GetBytes(IV_64);
                byte[] byEnc;
                byEnc = Convert.FromBase64String(data); //把需要解密的字符串转为8位无符号数组
                DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider();
                MemoryStream ms = new MemoryStream(byEnc);
                CryptoStream cst = new CryptoStream(ms, cryptoProvider.CreateDecryptor(byKey, byIV), CryptoStreamMode.Read);
                StreamReader sr = new StreamReader(cst);
                return sr.ReadToEnd();
            }
            catch (Exception x)
            {
                return x.Message;
            }
        }

        public static string EncryptDES(string data)
        {
            string KEY_64 = "ylj12345";// "VavicApp";密钥
            string IV_64 = "pay12345";// "VavicApp"; 向量
            byte[] byKey = System.Text.ASCIIEncoding.ASCII.GetBytes(KEY_64);
            byte[] byIV = System.Text.ASCIIEncoding.ASCII.GetBytes(IV_64);
            DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider();
            int i = cryptoProvider.KeySize;
            MemoryStream ms = new MemoryStream();
            CryptoStream cst = new CryptoStream(ms, cryptoProvider.CreateEncryptor(byKey, byIV), CryptoStreamMode.Write);
            StreamWriter sw = new StreamWriter(cst);
            sw.Write(data);
            sw.Flush();
            cst.FlushFinalBlock();
            sw.Flush();
            return Convert.ToBase64String(ms.GetBuffer(), 0, (int)ms.Length);
        }
    }
}