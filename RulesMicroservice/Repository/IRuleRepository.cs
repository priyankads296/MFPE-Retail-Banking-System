using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RulesMicroservice.Repository
{
    public interface IRuleRepository
    {
        Task<double> GetMinBalance(int AccountID);
        List<Account> GetAccounts();
    }
}
