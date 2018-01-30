﻿using eHospital.Payment.Business;
using eHospital.Payment.Enum;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace eHospital.Payment.UnionPay
{
    public class Pay
    {
        public static JObject createForm(string from, string fromNo, string fee, string subject, string returnUrl)
        {
            ////////////////////////////////////////////请求参数////////////////////////////////////////////
            //商户订单号，商户网站订单系统中唯一订单号，必填
            var now = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            var txnTime = DateTime.Now.ToString("yyyyMMddHHmmss");
            var out_trade_no = now + CommonBusiness.CreateRandom();

            //订单名称，必填
            if (string.IsNullOrEmpty(subject))
            {
                subject = "银联付款";
            }

            //付款金额，必填
            var total_fee = fee;

            //商品描述，可空
            var body = string.Empty;
            ////////////////////////////////////////////////////////////////////////////////////////////////

            /**
             * 重要：联调测试时请仔细阅读注释！
             * 
             * 产品：跳转网关支付产品<br>
             * 交易：消费：前台跳转，有前台通知应答和后台通知应答<br>
             * 日期： 2015-09<br>
             * 版本： 1.0.0
             * 版权： 中国银联<br>
             * 说明：以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己需要，按照技术文档编写。该代码仅供参考，不提供编码性能规范性等方面的保障<br>
             * 提示：该接口参考文档位置：open.unionpay.com帮助中心 下载  产品接口规范  《网关支付产品接口规范》，<br>
             *              《平台接入接口规范-第5部分-附录》（内包含应答码接口规范，全渠道平台银行名称-简码对照表)<br>
             *              《全渠道平台接入接口规范 第3部分 文件接口》（对账文件格式说明）<br>
             * 测试过程中的如果遇到疑问或问题您可以：1）优先在open平台中查找答案：
             * 							        调试过程中的问题或其他问题请在 https://open.unionpay.com/ajweb/help/faq/list 帮助中心 FAQ 搜索解决方案
             *                             测试过程中产生的6位应答码问题疑问请在https://open.unionpay.com/ajweb/help/respCode/respCodeList 输入应答码搜索解决方案
             *                          2） 咨询在线人工支持： open.unionpay.com注册一个用户并登陆在右上角点击“在线客服”，咨询人工QQ测试支持。
             * 交易说明:1）以后台通知或交易状态查询交易确定交易成功,前台通知不能作为判断成功的标准.
             *       2）交易状态查询交易（Form_6_5_Query）建议调用机制：前台类交易建议间隔（5分、10分、30分、60分、120分）发起交易查询，如果查询到结果成功，则不用再查询。（失败，处理中，查询不到订单均可能为中间状态）。也可以建议商户使用payTimeout（支付超时时间），过了这个时间点查询，得到的结果为最终结果。
             */

            Dictionary<string, string> param = new Dictionary<string, string>();

            //以下信息非特殊情况不需要改动
            param["version"] = "5.0.0";//版本号
            param["encoding"] = "UTF-8";//编码方式
            param["txnType"] = "01";//交易类型
            param["txnSubType"] = "01";//交易子类
            param["bizType"] = "000201";//业务类型
            param["signMethod"] = "01";//签名方法
            param["channelType"] = "08";//渠道类型
            param["accessType"] = "0";//接入类型
            param["frontUrl"] = SDKConfig.FrontUrl;  //前台通知地址      
            param["backUrl"] = SDKConfig.BackUrl;  //后台通知地址
            param["currencyCode"] = "156";//交易币种

            //TODO 以下信息需要填写
            param["merId"] = "777290058110048";//商户号，请改自己的测试商户号，此处默认取demo演示页面传递的参数
            param["orderId"] = out_trade_no;//商户订单号，8-32位数字字母，不能含“-”或“_”，此处默认取demo演示页面传递的参数，可以自行定制规则
            param["txnTime"] = txnTime;//订单发送时间，格式为YYYYMMDDhhmmss，取北京时间，此处默认取demo演示页面传递的参数，参考取法： DateTime.Now.ToString("yyyyMMddHHmmss")
            param["txnAmt"] = total_fee;//交易金额，单位分，此处默认取demo演示页面传递的参数
            //param["reqReserved"] = "透传信息";//请求方保留域，透传字段，查询、通知、对账文件中均会原样出现，如有需要请启用并修改自己希望透传的数据

            //TODO 其他特殊用法请查看 pages/api_01_gateway/special_use_purchase.htm

            AcpService.Sign(param, System.Text.Encoding.UTF8);

            // 本地数据维护 银联单位为分
            var result = TradeBusiness.AddTrade(out_trade_no, from, fromNo, PaymentType.Alipay, fee, subject, returnUrl, "0");
            if (!(bool)result["Flg"])
            {
                throw new Exception("本地数据维护失败");
            }

            var content = AcpService.CreateAutoFormHtml(SDKConfig.FrontTransUrl, param, System.Text.Encoding.UTF8);// 将SDKUtil产生的Html文档写入页面，从而引导用户浏览器重定向
            return new JObject(
                    new JProperty("Trade", ((JObject)result["Object"])["result"]),
                    new JProperty("Content", content));
        }
    }
}