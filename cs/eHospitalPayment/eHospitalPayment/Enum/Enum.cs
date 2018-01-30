namespace eHospital.Payment.Enum
{
    public enum PaymentType
    {
        // 支付宝即时到账
        Alipay = 0,
        // 支付宝手机网站
        AlipayWap = 1,
        // 银联
        UnionPay = 2,
        // 微信
        WechatPay = 3,
        // 工行
        ICBC = 88
    }

    public enum TradeStatus
    {
        // 订单创建
        Created = 0,
        // 订单处理支付成功
        RETURNSUCCESS = 1,
        // 订单处理完成
        RETURNFINISHED = 2,
        // 订单处理状态异常
        RETURNISSUE = 3,
        // 订单通知支付成功
        NOTIFYSUCCESS = 4,
        // 订单通知完成
        NOTIFYFINISHED = 5,
        // 订单通知状态异常
        NOTIFYISSUE = 6,
        // 订单退款
        REFUND = 7,
        // 通知状态可疑
        NOTIFYSUSPECT = 8,
        // 通知状态未知
        NOTIFYUNKNOWN = 9
    }
}