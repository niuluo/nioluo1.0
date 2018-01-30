using eHospitalUtility.CommonEnum;
using Newtonsoft.Json.Linq;
using System;

namespace eHospital.Payment.Business
{
    public class CommonBusiness
    {
        /// <summary>
        /// 设置返回Header
        /// </summary>
        /// <param name="requestHeader"></param>
        /// <param name="customizeStatus"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static JObject SetHeader(JObject requestHeader, CustomizeStatus customizeStatus, string message)
        {
            JObject responseHeader = requestHeader;
            responseHeader["StatusCode"] = (int)customizeStatus;
            responseHeader["Message"] = message;
            return responseHeader;
        }

        // 生成随机数
        public static object CreateRandom()
        {
            return new Random(Guid.NewGuid().GetHashCode()).Next(100000, 999999);
        }
    }
}