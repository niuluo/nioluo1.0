using eHospital.Log;
using eHospitalNHibernateHelper;
using PaymentModel.Entities;
using PaymentModel.Enum;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PaymentDao
{
    public class TradeDao : DaoBase<Trade, int>
    {
        eHospitalLogger logger = eHospitalLogger.GetInstance();

        /// <summary>
        /// 获取订单列表
        /// </summary>
        /// <returns></returns>
        public List<Trade> GetTradeList(DateTime startTime, DateTime endTime)
        {
            try
            {
                // todo test
                var search = this.Session.CreateQuery("from Trade c where c.UpdatedTime>=:fn and c.UpdatedTime<=:fn2").SetDateTime("fn", startTime).SetDateTime("fn2", endTime).List<Trade>();
                logger.Info(string.Format("获取订单列表,startTime：{0},endTime：{1}", startTime, endTime));
                return search.ToList();
            }
            catch (Exception ex)
            {
                logger.Error(string.Format("获取一个订单出错，startTime：{0},endTime：{1}，出错信息：{2}", startTime, endTime, ex.Message));
                return null;
            }
        }

        /// <summary>
        /// 获取订单
        /// </summary>
        /// <param name="trade"></param>
        /// <returns></returns>
        public Trade Get(Trade entity)
        {
            try
            {
                // todo test
                var search = this.Session.CreateQuery("from Trade c where c.TradeNo=:fn and c.TradeFrom=:fn2").SetString("fn", entity.TradeNo).SetString("fn2", entity.TradeFrom).List<Trade>().LastOrDefault();
                logger.Info(string.Format("获取一个订单成功,TradeNo：{0}", search != null ? search.TradeNo : string.Empty));
                return search;
            }
            catch (Exception ex)
            {
                logger.Error(string.Format("获取一个订单出错，TradeNo：{0}，出错信息：{1}", entity.TradeNo, ex.Message));
                return null;
            }
        }

        /// <summary>
        /// 获取订单
        /// </summary>
        /// <param name="trade"></param>
        /// <returns></returns>
        public Trade GetByActualTradeNo(Trade entity)
        {
            try
            {
                // todo test
                var search = this.Session.CreateQuery("from Trade c where c.ActualTradeNo=:fn and c.TradeFrom=:fn2").SetString("fn", entity.ActualTradeNo).SetString("fn2", entity.TradeFrom).List<Trade>().LastOrDefault();
                logger.Info(string.Format("获取一个订单成功,ActualTradeNo：{0}", search != null ? search.ActualTradeNo : string.Empty));
                return search;
            }
            catch (Exception ex)
            {
                logger.Error(string.Format("获取一个订单出错，ActualTradeNo：{0}，出错信息：{1}", entity.ActualTradeNo, ex.Message));
                return null;
            }
        }

        /// <summary>
        /// 获取订单
        /// </summary>
        /// <param name="trade"></param>
        /// <returns></returns>
        public Trade GetByTradeFromNo(Trade entity)
        {
            try
            {
                // todo test
                var search = this.Session.CreateQuery("from Trade c where c.TradeFromNo=:fn and c.TradeFrom=:fn2").SetString("fn", entity.TradeFromNo).SetString("fn2", entity.TradeFrom).List<Trade>().LastOrDefault();
                logger.Info(string.Format("获取一个订单成功,TradeFromNo：{0}", search != null ? search.TradeFromNo : string.Empty));
                return search;
            }
            catch (Exception ex)
            {
                logger.Error(string.Format("获取一个订单出错，TradeFromNo：{0}，出错信息：{1}", entity.TradeFromNo, ex.Message));
                return null;
            }
        }

        /// <summary>
        /// 新增订单
        /// </summary>
        /// <param name="trade"></param>
        /// <returns></returns>
        public Trade Add(Trade trade)
        {
            try
            {
                trade.UpdatedTime = DateTime.Now;
                trade.Status = Status.Created;
                trade.State = State.Normal;
                var newEntity = this.Save(trade);
                logger.Info(string.Format("新增一个订单成功,TradeNo：{0}", newEntity.TradeNo));
                return newEntity;
            }
            catch (Exception ex)
            {
                logger.Error(string.Format("新增一个订单出错，TradeNo：{0}，出错信息：{1}", trade.TradeNo, ex.Message));
                return null;
            }
        }

        /// <summary>
        /// 修改一个订单状态
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public Trade UpdateStatus(Trade entity)
        {
            try
            {
                // todo test
                var search = this.Session.CreateQuery("from Trade c where c.TradeNo=:fn and c.Type=:fn2").SetString("fn", entity.TradeNo).SetInt32("fn2", entity.Type).List<Trade>().FirstOrDefault();
                // 以免通知在返回之前
                if (!((search.Status == Status.NOTIFYFINISHED || search.Status == Status.NOTIFYISSUE || search.Status == Status.NOTIFYSUCCESS)
                    && (entity.Status == Status.RETURNFINISHED || entity.Status == Status.RETURNISSUE || entity.Status == Status.RETURNSUCCESS)))
                {
                    search.Status = entity.Status;
                    search.TypeStatus = entity.TypeStatus;
                } else
                {
                    logger.Info(string.Format("订单试图返回状态更新通知状态,TradeNo：{0}", entity.TradeNo));
                }

                search.ActualTradeNo = entity.ActualTradeNo;
                search.UpdatedTime = DateTime.Now;
                var entityTemp = this.Session.Merge(search);
                this.Update(entityTemp);
                this.Flush();
                logger.Info(string.Format("修改一个订单成功,TradeNo：{0}", entityTemp.TradeNo));
                return entityTemp;
            }
            catch (Exception ex)
            {
                logger.Error(string.Format("修改一个订单出错，TradeNo：{0}，出错信息：{1}", entity.TradeNo, ex.Message));
                return null;
            }
        }
    }
}
