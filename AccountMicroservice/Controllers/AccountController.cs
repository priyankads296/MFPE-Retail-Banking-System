using AccountMicroservice.Models;
using AccountMicroservice.Repository;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccountMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        Uri baseAddress = new Uri("https://localhost:44304/api");
        HttpClient client;

        readonly log4net.ILog _log4net;

        public AccountController()
        {
            client = new HttpClient();
            client.BaseAddress = baseAddress;
            _log4net = log4net.LogManager.GetLogger(typeof(AccountController));


        }
        static int acid = 1;

        public static List<customeraccount> customeraccounts = GetListRep.GetCustomeraccountsList();
        public static List<CurrentAccount> currentAccounts = GetListRep.currentAccountsList;
        public static List<SavingsAccount> savingsAccounts = GetListRep.savingsAccountsList;

        [HttpPost]
        [Route("createAccount")]
        public customeraccount createAccount(Customer customer)
        {

            _log4net.Info("Account Created");
            customeraccount a = new customeraccount
            {
                custId = customer.id,
                CAId = (customer.id * 100) + acid,
                SAId = (customer.id * 100) + (acid + 1),
                Message = "Account created"
            };
            customeraccounts.Add(a);
            var cust = customeraccounts.Find(c => c.custId == customer.id);
            CurrentAccount ca = new CurrentAccount
            {
                CAId = (customer.id * 100) + acid,
                CBal = 5000.00,
                MinBalance = 500.00
            };
            currentAccounts.Add(ca);
            SavingsAccount sa = new SavingsAccount
            {
                SAId = (customer.id * 100) + (acid + 1),
                SBal = 2000.00,
                MinBalance = 200.00
            };
            savingsAccounts.Add(sa);
            Uri baseAddress = new Uri("http://localhost:59137/api");   //Auth Port No.
            HttpClient client = new HttpClient();
            client.BaseAddress = baseAddress;
            var user = new User { UserId = customer.id, Password = "12345", Roles = "Customer" };
            string data = JsonConvert.SerializeObject(user);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Token/createUser/", content).Result;
            return cust;
        }


        [HttpGet]
        [Route("getCustomerAccounts/{CustId}")]

        public ActionResult<List<int>> getCustomerAccounts(int CustId)
        {

            List<int> accList = new List<int>();
            _log4net.Info(" Got Customer Account");
            var a = customeraccounts.Find(c => c.custId == CustId);
            if (a == null)
            {
                return BadRequest("CustId cannot be found.");
            }
            var ca = currentAccounts.Find(cac => cac.CAId == a.CAId);
            var sa = savingsAccounts.Find(sac => sac.SAId == a.SAId);
            if (ca == null || sa == null)
            {
                return BadRequest("Accounts not created.");
            }
            accList.Add(ca.CAId);
            accList.Add(int.Parse(ca.CBal.ToString()));
            accList.Add(sa.SAId);
            accList.Add(int.Parse(sa.SBal.ToString()));

            return accList;
        }






        [HttpGet]
        [Route("getAccount/{id}")]
        public ActionResult<ArrayList> getAccount(int id)
        {
            ArrayList accList = new ArrayList();
            _log4net.Info(" Getting Account Info");
            var ca = currentAccounts.Find(a => a.CAId == id);
            if (ca != null)
            {
                accList.Add(new { ca.CAId, ca.CBal, ca.MinBalance });

                return Ok(accList);

            }
            var sa = savingsAccounts.Find(a => a.SAId == id);
            if (sa != null)
            {
                accList.Add(new { sa.SAId, sa.SBal, sa.MinBalance });
                return accList;
            }
            return BadRequest("Account ID not present.");

        }

        [HttpGet]
        [Route("getAccountStatement/{AccountId}/{from_date}/{to_date}")]
        public ActionResult getAccountStatement(int AccountId, string from_date, string to_date)
        {
            var accStat = GetListRep.accountStatements;
            var accId = accStat.Find(a => a.AccountId == AccountId);
            if (accId != null)
            {
                List<Statement> li = new List<Statement>();
                DateTime tempDate = Convert.ToDateTime("1/1/0001 12:00:00 AM");
                DateTime From_Date = DateTime.Parse(from_date);
                DateTime To_Date = DateTime.Parse(to_date);
                if (From_Date == tempDate)
                {


                    DateTime f = DateTime.Now, t = DateTime.Now;
                    int month = f.Month, year = f.Year;
                    string ds = "1/", ms = Convert.ToString(month) + "/", ys = Convert.ToString(year), ts = " 12:00:00 AM", fs = ds + ms + ys + ts;
                    f = Convert.ToDateTime(fs);
                    foreach (var item in GetListRep.accountStatements)
                    {
                        if (item.AccountId == AccountId && DateTime.Parse(item.Date) >= f && DateTime.Parse(item.Date) <= t)
                        {
                            li.Add(item);
                        }
                    }
                }
                else
                {
                    foreach (var item in GetListRep.accountStatements)
                    {
                        if (item.AccountId == AccountId && DateTime.Parse(item.Date) >= From_Date && DateTime.Parse(item.Date) <= To_Date)
                        {
                            li.Add(item);
                        }
                    }

                }
                if (li.Count == 0)
                {

                    return BadRequest("No statement for account id: " + AccountId + " for given timespan.");
                }
                return Ok(li);
            }
            return BadRequest("No statement for account id: " + AccountId);


        }


        [HttpPost]
        [Route("deposit")]
        public ActionResult<TransactionStatus> deposit(int AccountId, int amount)
        {
            if (AccountId % 2 == 0)
            {
                var sa = savingsAccounts.Find(a => a.SAId == AccountId);
                if (sa != null)
                {
                    var obal = sa.SBal;
                    var nbal = obal + amount;
                    sa.SBal = nbal;
                    return new TransactionStatus { sbal = obal, rbal = nbal, transferStatus = "Deposited Successfully" };
                }
                else
                    return new TransactionStatus { sbal = 0, rbal = 0, transferStatus = "Deposit Failed, Enter Correct Account ID" };
            }
            var ca = currentAccounts.Find(a => a.CAId == AccountId);
            if (ca != null)
            {
                var obal2 = ca.CBal;
                var nbal2 = obal2 + amount;
                ca.CBal = nbal2;
                return new TransactionStatus { sbal = obal2, rbal = nbal2, transferStatus = "Deposited Successfully" };

            }
            else
                return new TransactionStatus { sbal = 0, rbal = 0, transferStatus = "Deposit Failed, Enter Correct Account ID" };

        }

        [HttpPost]
        [Route("withdraw")]
        public ActionResult<TransactionStatus> withdraw(int AccountId, int amount)
        {
            if (AccountId % 2 == 0)
            {
                var sa = savingsAccounts.Find(a => a.SAId == AccountId);
                if (sa != null)
                {
                    var obal = sa.SBal;
                    var nbal = obal - amount;

                    if (nbal >= 0)
                    {
                        sa.SBal = nbal;
                        if (sa.SBal >= 1000)
                        {
                            return new TransactionStatus { sbal = obal, rbal = nbal, transferStatus = "Withdraw Successfull" };
                        }
                        else
                        {
                            return new TransactionStatus { sbal = obal, rbal = nbal, transferStatus = "Withdraw Successfull,but service charge will be deducted at the end of month since Balance is less than 1000" };
                        }
                    }
                    else
                    {
                        return new TransactionStatus { sbal = 0, rbal = 0, transferStatus = "Withdraw Failed, Insufficient Balance" };
                    }
                }
                else
                    return new TransactionStatus { sbal = 0, rbal = 0, transferStatus = "Withdraw Failed, Enter Correct Account ID" };
            }
            var ca = currentAccounts.Find(a => a.CAId == AccountId);
            if (ca != null)
            {
                var obal2 = ca.CBal;
                var nbal2 = obal2 - amount;
                if (nbal2 >= 0)
                {
                    ca.CBal = nbal2;
                    if (ca.CBal >= 1000)
                    {
                        return new TransactionStatus { sbal = obal2, rbal = nbal2, transferStatus = "Withdraw Successfull" };
                    }
                    else
                    {
                        return new TransactionStatus { sbal = obal2, rbal = nbal2, transferStatus = "Withdraw Successfull,but service charge will be deducted at the end of month since Balance is less than 1000" };
                    }
                }
                else
                {
                    return new TransactionStatus { sbal = 0, rbal = 0, transferStatus = "Withdraw Failed, Insufficient Balance" };
                }

            }
            else
                return new TransactionStatus { sbal = 0, rbal = 0, transferStatus = "Withdraw Failed, Enter Correct Account ID" };
            // return new TransactionStatus { sbal = 0, rbal = 0, transferStatus = "Withdraw Failed, Enter Correct Account ID" };

        }


    }
}
