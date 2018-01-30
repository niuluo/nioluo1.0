using eHospital.Payment.Business;
using eHospital.Payment.Helper;
using eHospital.PaymentDTO;
using eHospitalUtility.CommonEnum;
using Newtonsoft.Json.Linq;
using System;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace eHospital.Payment.Controllers
{
    public class DetailController : ApiController
    {
        public HttpResponseMessage Get(string no, string from, string type)
        {
            var response = new RetDTO();
            JObject requestHeader = new JObject();

            try
            {
                if (string.IsNullOrEmpty(no) || string.IsNullOrEmpty(from) || string.IsNullOrEmpty(type))
                {
                    response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.ParamError, "参数不正确");
                    return Request.CreateResponse(HttpStatusCode.OK, response, "application/json");
                }

                JObject result;
                if (type == "1")
                {
                    result = TradeBusiness.GetTrade(no, from);
                }
                else if (type == "2")
                {
                    result = TradeBusiness.GetByActualTradeNo(no, from);
                }
                else
                {
                    result = TradeBusiness.GetByTradeFromNo(no, from);
                }

                response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.Success, string.Empty);
                response.Body = result;
                return Request.CreateResponse(HttpStatusCode.OK, response, "application/json");
            }
            catch (Exception ex)
            {
                response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.CatchError, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, response, "application/json");
            }
        }

        public HttpResponseMessage Get(string startTime, string endTime)
        {
            var response = new RetDTO();
            JObject requestHeader = new JObject();

            try
            {
                if (string.IsNullOrEmpty(startTime) || string.IsNullOrEmpty(endTime))
                {
                    response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.ParamError, "参数不正确");
                    return Request.CreateResponse(HttpStatusCode.OK, response, "application/json");
                }

                var result = TradeBusiness.GetTradeList(startTime, endTime);
                response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.Success, string.Empty);
                response.Body = result;
                return Request.CreateResponse(HttpStatusCode.OK, response, "application/json");
            }
            catch (Exception ex)
            {
                response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.CatchError, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, response, "application/json");
            }
        }

        // POST api/<controller>
        public HttpResponseMessage Post()
        {
            var response = new RetDTO();
            JObject requestHeader = null;
            JObject requestBody = null;
            var token = string.Empty;
            var timeStamp = string.Empty;
            var no = string.Empty;
            var from = string.Empty;
            var type = string.Empty;

            try
            {
                var httpCurrent = HttpContext.Current;
                var request = HttpHelper.GetRequestJObjectFromStream(HttpContext.Current);
                requestHeader = (JObject)request.GetValue("Header");
                token = requestHeader.GetValue("Token").ToString();
                timeStamp = requestHeader.GetValue("TimeStamp").ToString();

                requestBody = (JObject)request.GetValue("Body");
                no = requestBody.GetValue("No").ToString();
                from = requestBody.GetValue("From").ToString();
                type = requestBody.GetValue("Type").ToString();
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
                if (string.IsNullOrEmpty(no) || string.IsNullOrEmpty(from) || string.IsNullOrEmpty(type))
                {
                    response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.ParamError, "参数不正确");
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }

                JObject result;
                if (type == "1")
                {
                    result = TradeBusiness.GetTrade(no, from);
                }
                else if (type == "2")
                {
                    result = TradeBusiness.GetByActualTradeNo(no, from);
                }
                else
                {
                    result = TradeBusiness.GetByTradeFromNo(no, from);
                }

                response.Header = CommonBusiness.SetHeader(requestHeader, CustomizeStatus.Success, string.Empty);
                response.Body = result;
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