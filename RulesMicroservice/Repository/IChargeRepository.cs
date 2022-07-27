using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RulesMicroservice.Repository
{
    public interface IChargeRepository
    {
        TransactionStatus ApplyServiceCharge(int AccountID, int Amount);
    }
}