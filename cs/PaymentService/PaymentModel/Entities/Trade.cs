using PaymentModel.Enum;
using System;
using System.Runtime.Serialization;

namespace PaymentModel.Entities
{
    /// <summary>
    /// 审批实体类
    /// </summary>
    [DataContract, Serializable]
    public class Trade
    {
        /// <summary>
        /// ID
        /// </summary>
        [DataMember]
        public virtual int ID { get; set; }

        /// <summary>
        /// 订单系统号
        /// </summary>
        [DataMember]
        public virtual string TradeNo { get; set; }

        /// <summary>
        /// 订单实际生成交易号
        /// </summary>
        [DataMember]
        public virtual string ActualTradeNo { get; set; }

        /// <summary>
        /// 订单来源
        /// </summary>
        [DataMember]
        public virtual string TradeFrom { get; set; }

        /// <summary>
        /// 订单来源的订单号
        /// </summary>
        [DataMember]
        public virtual string TradeFromNo { get; set; }

        /// <summary>
        /// 订单实际类型
        /// </summary>
        [DataMember]
        public virtual int Type { get; set; }

        /// <summary>
        /// 订单金额 单位 分
        /// </summary>
        [DataMember]
        public virtual int Fee { get; set; }

        /// <summary>
        /// 订单内容
        /// </summary>
        [DataMember]
        public virtual string Subject { get; set; }

        /// <summary>
        /// 订单处理完成迁移页面
        /// </summary>
        [DataMember]
        public virtual string ReturnUrl { get; set; }

        /// <summary>
        /// 订单实际处理状态
        /// </summary>
        [DataMember]
        public virtual string TypeStatus { get; set; }

        /// <summary>
        /// 订单本地处理状态
        /// </summary>
        [DataMember]
        public virtual Status Status { get; set; }

        /// <summary>
        /// 订单数据库状态
        /// </summary>
        [DataMember]
        public virtual State State { get; set; }

        /// <summary>
        /// 订单更新时间
        /// </summary>
        [DataMember]
        public virtual DateTime UpdatedTime { get; set; }
    }
}
