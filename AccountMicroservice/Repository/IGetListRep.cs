using AccountMicroservice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccountMicroservice.Repository
{
    interface IGetListRep
    {
        public List<customeraccount> GetCustomeraccountsList();
      /*  public List<CurrentAccount> GetCurrentAccountsList();
        public List<SavingsAccount> GetSavingsAccountsList();*/
        public List<AccountStatement> GetAccountStatementsList();
        //public List<Statement> GetStatementsList();
    }
}
