using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace eHospital.Payment.ICBC
{
    /// <summary>
    /// Summary description for test
    /// </summary>
    public class test : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var result = string.Empty;
            var tradeNo = context.Request.QueryString["tradeNo"] ?? "201710110909";
            var outMess = string.Empty;
            try
            {
                var mess = CBCPayOnline.CheckOrder(tradeNo, tradeNo.Substring(0, 8), ConfigurationManager.AppSettings["icbc.merID"], ConfigurationManager.AppSettings["icbc.merAcct"], out outMess);
                result += mess + "<br/>";
                if (mess.Length > 5)//缴费成功，未返回错误编码,返回xml数据
                {
                    DataSet myds = new DataSet();
                    StringReader strReader = new StringReader(mess);
                    myds.ReadXml(strReader);
                    string stat = myds.Tables["out"].Rows[0]["tranStat"].ToString();
                    if (stat == "1" || stat == "0")
                    {
                        result += "工行查询支付成功";
                    }
                    else//支付失败
                    {
                        result += "工行查询支付失败";
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

                    result += tradeNo + ":工行查询支付发生错误, 错误编码:" + mess + "-" + pays;
                }
            }
            catch (Exception e)
            {
                result += tradeNo + ":工行查询支付发生错误:" + e.ToString();
            }


            context.Response.Write(result);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}