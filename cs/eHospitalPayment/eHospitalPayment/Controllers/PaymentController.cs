using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using eHospital.Payment.Helper;
using eHospital.PaymentDTO;
using eHospitalUtility.CommonEnum;
using Newtonsoft.Json.Linq;
using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace eHospital.Payment.Controllers
{
    public class PaymentController : ApiController
    {
        // POST api/<controller>
        public HttpResponseMessage Post()
        {
            var response = new RetDTO();
            JObject requestHeader = null;
            JObject requestBody = null;
            var token = string.Empty;
            var timeStamp = string.Empty;
            var type = string.Empty;
            var fee = string.Empty;
            var from = string.Empty;
            var subject = string.Empty;
            var fromNo = string.Empty;
            var installmentTimes = string.Empty;

            try
            {
                var httpCurrent = HttpContext.Current;
                var request = HttpHelper.GetRequestJObjectFromStream(HttpContext.Current);
                requestHeader = (JObject)request.GetValue("Header");
                token = requestHeader.GetValue("Token").ToString();
                timeStamp = requestHeader.GetValue("TimeStamp").ToString();

                requestBody = (JObject)request.GetValue("Body");
                type = requestBody.GetValue("Type").ToString();
                fee = requestBody.GetValue("Fee").ToString();
                from = requestBody.GetValue("From").ToString();
                subject = requestBody.GetValue("Subject") != null ? requestBody.GetValue("Subject").ToString() : string.Empty;
                fromNo = requestBody.GetValue("FromNo") != null ? requestBody.GetValue("FromNo").ToString() : string.Empty;
                installmentTimes = requestBody.GetValue("InstallmentTimes") != null ? requestBody.GetValue("InstallmentTimes").ToString() : ConfigurationManager.AppSettings["icbc.InstallmentTimes"];
                WebApiConfig.log.Error("Pay controller:" + request.ToString());
            }
            catch (Exception ex)
            {
                response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.CatchError, "参数错误:" + ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }

            try
            {
                if (string.IsNullOrEmpty(token))
                {
                    response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.NoLogin, "令牌为空");
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }

                double temp;
                PaymentType paymentType;
                if (string.IsNullOrEmpty(type) || !double.TryParse(fee, out temp) || !System.Enum.TryParse(type, out paymentType) || string.IsNullOrEmpty(from)
                    || paymentType != PaymentType.ICBC)
                {
                    response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.ParamError, "参数不正确");
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }

                var isPC = (requestBody.GetValue("isPC") != null && requestBody.GetValue("isPC").ToString() == "1") ? true : false;
                var  responseForm = ICBC.Pay.createForm(paymentType, from, fromNo, fee, subject, installmentTimes, isPC);
                response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.Success, string.Empty);
                response.Body = responseForm;
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.CatchError, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
        }
    }
}

//// POST api/<controller>
//public HttpResponseMessage Post()
//{
//    var response = new RetDTO();
//    JObject requestHeader = null;
//    JObject requestBody = null;
//    var token = string.Empty;
//    var timeStamp = string.Empty;
//    var type = string.Empty;
//    var fee = string.Empty;
//    var from = string.Empty;
//    var subject = string.Empty;
//    var returnUrl = string.Empty;
//    var showUrl = string.Empty;
//    var fromNo = string.Empty;

//    try
//    {
//        var httpCurrent = HttpContext.Current;
//        var request = HttpHelper.GetRequestJObjectFromStream(HttpContext.Current);
//        requestHeader = (JObject)request.GetValue("Header");
//        token = requestHeader.GetValue("Token").ToString();
//        timeStamp = requestHeader.GetValue("TimeStamp").ToString();

//        requestBody = (JObject)request.GetValue("Body");
//        type = requestBody.GetValue("Type").ToString();
//        fee = requestBody.GetValue("Fee").ToString();
//        from = requestBody.GetValue("From").ToString();
//        subject = requestBody.GetValue("Subject") != null ? requestBody.GetValue("Subject").ToString() : string.Empty;
//        returnUrl = requestBody.GetValue("ReturnUrl") != null ? requestBody.GetValue("ReturnUrl").ToString() : string.Empty;
//        showUrl = requestBody.GetValue("ShowUrl") != null ? requestBody.GetValue("ShowUrl").ToString() : string.Empty;
//        fromNo = requestBody.GetValue("FromNo") != null ? requestBody.GetValue("FromNo").ToString() : string.Empty;
//        WebApiConfig.log.Error("Pay controller:" + request.ToString());
//    }
//    catch (Exception ex)
//    {
//        response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.CatchError, "参数错误:" + ex.Message);
//        return Request.CreateResponse(HttpStatusCode.OK, response);
//    }

//    try
//    {
//        if (string.IsNullOrEmpty(token))
//        {
//            response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.NoLogin, "令牌为空");
//            return Request.CreateResponse(HttpStatusCode.OK, response);
//        }

//        double temp;
//        PaymentType paymentType;
//        if (string.IsNullOrEmpty(type) || !double.TryParse(fee, out temp) || !System.Enum.TryParse(type, out paymentType) || string.IsNullOrEmpty(from)
//            || ((paymentType == PaymentType.Alipay || paymentType == PaymentType.UnionPay || paymentType == PaymentType.AlipayWap) && string.IsNullOrEmpty(returnUrl))
//            || (paymentType == PaymentType.AlipayWap && string.IsNullOrEmpty(showUrl)))
//        {
//            response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.ParamError, "参数不正确");
//            return Request.CreateResponse(HttpStatusCode.OK, response);
//        }

//        object responseForm;
//        if (paymentType == PaymentType.Alipay || paymentType == PaymentType.AlipayWap)
//        {
//            // 支付宝单位元
//            responseForm = Alipay.Pay.createForm(paymentType, from, fromNo, fee, subject, returnUrl, showUrl);
//        }
//        else if (paymentType == PaymentType.UnionPay)
//        {
//            // 银联单位分
//            responseForm = UnionPay.Pay.createForm(from, fromNo, fee, subject, returnUrl);
//        }
//        else
//        {
//            // 微信单位分
//            var currentHost = Request.RequestUri.AbsoluteUri.Substring(0, Request.RequestUri.AbsoluteUri.ToLower().IndexOf("api"));
//            responseForm = WxPay.Pay.createUrl(from, fromNo, fee, subject, currentHost);
//        }

//        response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.Success, string.Empty);
//        response.Body = responseForm;
//        return Request.CreateResponse(HttpStatusCode.OK, response);
//    }
//    catch (Exception ex)
//    {
//        response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.CatchError, ex.Message);
//        return Request.CreateResponse(HttpStatusCode.OK, response);
//    }
//}