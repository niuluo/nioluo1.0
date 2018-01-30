using System;
using System.Runtime.Serialization;

namespace eHospital.PaymentDTO
{
    [DataContract]
    [Serializable]
    public class RetDTO
    {
        [DataMember]
        public object Header { get; set; }
        [DataMember]
        public object Body { get; set; }
    }
}
