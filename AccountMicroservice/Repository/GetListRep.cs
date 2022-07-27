using AccountMicroservice.Models;
using System.Collections.Generic;

namespace AccountMicroservice.Repository
{
    public static class GetListRep
    {

        public static List<Statement> accountStatements = new List<Statement>()
            {


            new Statement(){ AccountId=1000101,Date="2022-06-01",Narration="Deposit from Bank",Refno="Ref75",ValueDate="2022-06-15",Withdrawal=0,Deposit=200,ClosingBalance=1200},
            new Statement(){ AccountId=1000201,Date="2020-07-01",Narration="Deposit from Bank",Refno="Ref76",ValueDate="2020-07-20",Withdrawal=100,Deposit=0,ClosingBalance=1100},
            new Statement(){ AccountId=1000102,Date="2020-07-05",Narration="Deposit from Bank",Refno="Ref77",ValueDate="2020-07-15",Withdrawal=0,Deposit=600,ClosingBalance=10600},
            new Statement(){ AccountId=1000202,Date="2020-06-20",Narration="Deposit from Bank",Refno="Ref78",ValueDate="2020-06-30",Withdrawal=200,Deposit=0,ClosingBalance=1400},
            new Statement(){ AccountId=1000101,Date="2022-07-10",Narration="Deposit from Bank",Refno="Ref75",ValueDate="2022-07-26",Withdrawal=300,Deposit=0,ClosingBalance=900},
            new Statement(){ AccountId=1000201,Date="2020-06-01",Narration="Deposit from Bank",Refno="Ref76",ValueDate="2020-06-20",Withdrawal=0,Deposit=2000,ClosingBalance=1000},
         };
        public static List<CurrentAccount> currentAccountsList = new List<CurrentAccount>()
        {
            new CurrentAccount{CAId=1000101,CBal=5000,MinBalance=500},
            new CurrentAccount{CAId=1000201,CBal=7000,MinBalance=500},
            new CurrentAccount{CAId=1000301,CBal=10000,MinBalance=500},
            new CurrentAccount{CAId=1000401,CBal=20000,MinBalance=500},
            new CurrentAccount{CAId=1000501,CBal=40000,MinBalance=500},
            new CurrentAccount{CAId=1000601,CBal=10000,MinBalance=500}
        };
        public static List<SavingsAccount> savingsAccountsList = new List<SavingsAccount>()
        {
            new SavingsAccount{SAId=1000102,SBal=2000,MinBalance=200},
            new SavingsAccount{SAId=1000202,SBal=3000,MinBalance=200},
            new SavingsAccount{SAId=1000302,SBal=5000,MinBalance=200},
            new SavingsAccount{SAId=1000402,SBal=10000,MinBalance=200},
            new SavingsAccount{SAId=1000502,SBal=1000,MinBalance=200},
            new SavingsAccount{SAId=1000602,SBal=9000,MinBalance=200}
        };

        public static List<Statement> GetAccountStatementsList()
        {

            return accountStatements;
        }



        public static List<customeraccount> GetCustomeraccountsList()
        {
            List<customeraccount> customeraccounts = new List<customeraccount>()
            {
                new customeraccount{custId=10001,CAId=1000101,SAId=1000102},
                new customeraccount{custId=10002,CAId=1000201,SAId=1000202},
                new customeraccount{custId=10003,CAId=1000301,SAId=1000302},
                new customeraccount{custId=10004,CAId=1000401,SAId=1000402},
                new customeraccount{custId=10005,CAId=1000501,SAId=1000502},
                new customeraccount{custId=10006,CAId=1000601,SAId=1000602}
            };
            return customeraccounts;
        }



    }
}
