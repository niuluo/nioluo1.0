using Newtonsoft.Json.Linq;
using System;
using System.Configuration;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace eHospital.Payment.Helper
{
    public class HttpHelper
    {
        private static readonly string configStr = ConfigurationManager.AppSettings["ServiceUrl"];

        public static HttpResponseMessage RequestPost<T>(string reqAction, T obj)
        {
            using (HttpClient client = new HttpClient())
            {
                string url = configStr + reqAction;
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                return client.PostAsJsonAsync(url, obj).Result;
            }
        }

        public static HttpResponseMessage RequestPatientPost<T>(string reqAction, T obj)
        {
            using (HttpClient client = new HttpClient())
            {
                string url = ConfigurationManager.AppSettings["PatientApiUrl"] + reqAction;
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                return client.PostAsJsonAsync(url, obj).Result;
            }
        }

        public static HttpResponseMessage RequestGet(string reqAction)
        {
            using (HttpClient client = new HttpClient())
            {
                string url = configStr + reqAction;
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                return client.GetAsync(url).Result;
            }
        }

        /// <summary>
        /// 从客户端的流里读取内容
        /// </summary>
        /// <param name="httpContext"></param>
        /// <returns></returns>
        public static JObject GetRequestJObjectFromStream(HttpContext httpContext)
        {
            var obj = new JObject();
            string param = string.Empty;
            try
            {
                using (var sr = new StreamReader(httpContext.Request.InputStream))
                {
                    param = sr.ReadToEnd();
                }

                obj = JObject.Parse(param);
                return obj;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static T GetResult<T>(HttpResponseMessage response)
        {
            if (response.IsSuccessStatusCode)
            {
                return response.Content.ReadAsAsync<T>().Result;
            }
            else
            {
                return default(T);
            }
        }

        /// <summary>
        /// 获取service的出错信息
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        public static string GetWarnResult(HttpResponseMessage response)
        {
            return "(服务器消息)" + response.Content.ReadAsAsync<string>().Result;
        }
    }
}