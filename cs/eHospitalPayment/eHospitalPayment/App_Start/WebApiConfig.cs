using eHospital.Log;
using System.Web.Http;

namespace eHospital.Payment
{
    public static class WebApiConfig
    {
        public static eHospitalLogger log = eHospitalLogger.GetInstance();

        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            System.Threading.Thread t = new System.Threading.Thread(ICBC.CBCPayOnline.CheckOrder);
            t.Start();
        }
    }
}
