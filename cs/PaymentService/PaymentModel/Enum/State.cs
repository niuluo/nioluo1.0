namespace PaymentModel.Enum
{
    public enum State
    {
        Normal = 0,
        Freeze = 1,
        Delete = 2
    }

    public enum Status
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
        REFUND = 7
    }
}
