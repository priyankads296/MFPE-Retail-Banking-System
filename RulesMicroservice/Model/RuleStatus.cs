using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RulesMicroservice.Model
{
    public enum Status
    {
        Denied = 403,
        Allowed = 210,
        NA = 404
    }
    public class RuleStatus
    {

        public Status status { get; set; }
    }
}
