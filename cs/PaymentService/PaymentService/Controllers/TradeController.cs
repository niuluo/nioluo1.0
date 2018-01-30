using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PaymentDao;
using PaymentModel.Entities;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PaymentService.Controllers
{
    public class TradeController : ApiController
    {
        TradeDao tradeDao = new TradeDao();

        // 获取订单
        [Route("api/Trade/Get")]
        [HttpPost]
        public HttpResponseMessage Get([FromBody]JObject requestParam)
        {
            Trade trade = null;
            try
            {
                trade = JsonConvert.DeserializeObject<Trade>(requestParam["Trade"].ToString());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "参数错误" + ex.Message);
            }

            try
            {
                var result = tradeDao.Get(trade);
                if (result != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { result });
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, "获取失败");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // 获取订单
        [Route("api/Trade/GetByActualTradeNo")]
        [HttpPost]
        public HttpResponseMessage GetByActualTradeNo([FromBody]JObject requestParam)
        {
            Trade trade = null;
            try
            {
                trade = JsonConvert.DeserializeObject<Trade>(requestParam["Trade"].ToString());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "参数错误" + ex.Message);
            }

            try
            {
                var result = tradeDao.GetByActualTradeNo(trade);
                if (result != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { result });
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, "获取失败");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // 获取订单
        [Route("api/Trade/GetByTradeFromNo")]
        [HttpPost]
        public HttpResponseMessage GetByTradeFromNo([FromBody]JObject requestParam)
        {
            Trade trade = null;
            try
            {
                trade = JsonConvert.DeserializeObject<Trade>(requestParam["Trade"].ToString());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "参数错误" + ex.Message);
            }

            try
            {
                var result = tradeDao.GetByTradeFromNo(trade);
                if (result != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { result });
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, "获取失败");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // 获取订单列表
        [Route("api/Trade/GetTradeList")]
        [HttpPost]
        public HttpResponseMessage GetTradeList([FromBody]JObject requestParam)
        {
            DateTime startTime;
            DateTime endTime;
            try
            {
                startTime = DateTime.Parse(requestParam.GetValue("startTime").ToString());
                endTime = DateTime.Parse(requestParam.GetValue("endTime").ToString());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "参数错误" + ex.Message);
            }

            try
            {
                var result = tradeDao.GetTradeList(startTime, endTime);
                if (result != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { result });
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, "获取失败");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // 新增订单
        [Route("api/Trade/Add")]
        [HttpPost]
        public HttpResponseMessage Add([FromBody]JObject requestParam)
        {
            Trade trade = null;
            try
            {
                trade = JsonConvert.DeserializeObject<Trade>(requestParam["Trade"].ToString());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "参数错误" + ex.Message);
            }

            try
            {
                var result = tradeDao.Add(trade);
                if (result != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { result });
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, "添加失败");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // 修改订单状态
        [Route("api/Trade/UpdateStatus")]
        [HttpPost]
        public HttpResponseMessage UpdateStatus([FromBody]JObject requestParam)
        {
            Trade trade = null;
            try
            {
                trade = JsonConvert.DeserializeObject<Trade>(requestParam["Trade"].ToString());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "参数错误" + ex.Message);
            }

            try
            {
                var result = tradeDao.UpdateStatus(trade);
                if (result != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { result });
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, "更新失败");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}