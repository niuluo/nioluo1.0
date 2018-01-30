using eHospital.Payment.Enum;
using eHospital.Payment.Helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;

namespace eHospital.Payment.Business
{
    public class TradeBusiness
    {
        public static JEnumerable<JToken>? GetTradeList(string startTime, string endTime)
        {
            var result = new JObject();
            try
            {
                var request = new JObject(new JProperty("startTime", startTime),
                        new JProperty("endTime", endTime));

                HttpResponseMessage httpResult = HttpHelper.RequestPost<JObject>("Trade/GetTradeList", request);
                if (httpResult.StatusCode == HttpStatusCode.OK)
                {
                    result = HttpHelper.GetResult<JObject>(httpResult);

                    if (result != null)
                    {
                        return result["result"].Children();
                    }
                }
            }
            catch
            {
            }

            return null;
        }

        public static JObject GetTrade(string tradeNo, string from)
        {
            var result = new JObject();
            try
            {
                var request = new JObject(
                    new JProperty("Trade",
                    new JObject(
                        new JProperty("TradeNo", tradeNo),
                        new JProperty("TradeFrom", from))));

                HttpResponseMessage httpResult = HttpHelper.RequestPost<JObject>("Trade/Get", request);
                if (httpResult.StatusCode == HttpStatusCode.OK)
                {
                    result = HttpHelper.GetResult<JObject>(httpResult);

                    if (result != null)
                    {
                        return result["result"] as JObject;
                    }
                }
            }
            catch
            {
            }

            return null;
        }

        public static JObject GetByActualTradeNo(string actualTradeNo, string from)
        {
            var result = new JObject();
            try
            {
                var request = new JObject(
                    new JProperty("Trade",
                    new JObject(
                        new JProperty("ActualTradeNo", actualTradeNo),
                        new JProperty("TradeFrom", from))));

                HttpResponseMessage httpResult = HttpHelper.RequestPost<JObject>("Trade/GetByActualTradeNo", request);
                if (httpResult.StatusCode == HttpStatusCode.OK)
                {
                    result = HttpHelper.GetResult<JObject>(httpResult);

                    if (result != null)
                    {
                        return result["result"] as JObject;
                    }
                }
            }
            catch
            {
            }

            return null;
        }

        public static JObject GetByTradeFromNo(string tradeFromNo, string from)
        {
            var result = new JObject();
            try
            {
                var request = new JObject(
                    new JProperty("Trade",
                    new JObject(
                        new JProperty("TradeFromNo", tradeFromNo),
                        new JProperty("TradeFrom", from))));

                HttpResponseMessage httpResult = HttpHelper.RequestPost<JObject>("Trade/GetByTradeFromNo", request);
                if (httpResult.StatusCode == HttpStatusCode.OK)
                {
                    result = HttpHelper.GetResult<JObject>(httpResult);

                    if (result != null)
                    {
                        return result["result"] as JObject;
                    }
                }
            }
            catch
            {
            }

            return null;
        }

        public static Dictionary<string, object> AddTrade(string tradeNo, string from, string fromNo, PaymentType type, string fee, string subject, string returnUrl, string typeStatus)
        {
            var result = new JObject();
            var flg = false;
            try
            {
                var request = new JObject(
                    new JProperty("Trade",
                    new JObject(
                        new JProperty("TradeNo", tradeNo),
                        new JProperty("TradeFrom", from),
                        new JProperty("TradeFromNo", fromNo),
                        new JProperty("Type", type),
                        new JProperty("Fee", fee),
                        new JProperty("Subject", subject),
                        new JProperty("ReturnUrl", returnUrl),
                        new JProperty("TypeStatus", typeStatus))));

                HttpResponseMessage httpResult = HttpHelper.RequestPost<JObject>("Trade/Add", request);
                if (httpResult.StatusCode == HttpStatusCode.OK)
                {
                    result = HttpHelper.GetResult<JObject>(httpResult);

                    if (result != null)
                    {
                        flg = true;
                    }
                }
            }
            catch
            {
            }

            var returnValue = new Dictionary<string, object>();
            returnValue.Add("Flg", flg);
            returnValue.Add("Object", result);
            return returnValue;
        }

        public static Dictionary<string, object> UpdateTradeStatus(string tradeNo, string actualTradeNo, PaymentType type, string typeStatus, TradeStatus status)
        {
            var result = new JObject();
            var flg = false;

            try
            {
                var request = new JObject(
                    new JProperty("Trade",
                    new JObject(
                        new JProperty("TradeNo", tradeNo),
                        new JProperty("ActualTradeNo", actualTradeNo),
                        new JProperty("Type", type),
                        new JProperty("Status", status),
                        new JProperty("TypeStatus", typeStatus))));

                HttpResponseMessage httpResult = HttpHelper.RequestPost<JObject>("Trade/UpdateStatus", request);
                if (httpResult.StatusCode == HttpStatusCode.OK)
                {
                    result = HttpHelper.GetResult<JObject>(httpResult);

                    if (result != null)
                    {
                        flg = true;
                    }
                }
            }
            catch
            {
            }

            var returnValue = new Dictionary<string, object>();
            returnValue.Add("Flg", flg);
            returnValue.Add("Object", result);
            return returnValue;
        }

        // 多更新几次状态 以免支付成功 本地数据库状态更新失败
        public static bool UpdateTradeStatusSeveralTimes(string tradeNo, string actualTradeNo, PaymentType type, string typeStatus, TradeStatus status, out JObject result)
        {
            var count = 3;
            result = new JObject();
            while (count > 0)
            {
                var call = UpdateTradeStatus(tradeNo, actualTradeNo, type, typeStatus, status);
                if ((bool)call["Flg"])
                {
                    result = ((JObject)call["Object"])["result"] as JObject;
                    return true;
                }
                else
                {
                    count--;
                }
            }

            return false;
        }
    }
}