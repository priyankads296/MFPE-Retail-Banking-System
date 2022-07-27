using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TransactionMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        Uri baseAddress = new Uri("https://localhost:44356/api");   //Port No.
        HttpClient client;

        public TransactionController()
        {
            client = new HttpClient();
            client.BaseAddress = baseAddress;

        }

        [HttpPost]
        [Route("deposit")]
        public string deposit([FromBody] dwacc value)
        {
            return DepositWithAccountService(value.AccountId, value.Balance);
        }

        private string DepositWithAccountService(int accountId, int balance)
		{
            baseAddress = new Uri("http://localhost:54831/api");
            client = new HttpClient();
            client.BaseAddress = baseAddress;
            HttpResponseMessage response;
            response = client.PostAsync(client.BaseAddress + $"/Account/deposit?AccountId={accountId}&amount={balance}", null).Result;
            return Convert.ToString(response.Content.ReadAsStringAsync().Result);
        }

        [HttpPost]
        [Route("withdraw")]
        public string Withdraw([FromBody] dwacc value)
        {
            string data = JsonConvert.SerializeObject(value);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response;
            if (value.AccountId % 2 == 0)
            {
                response = client.GetAsync(client.BaseAddress + $"/Rules/evaluateMinBal/{value.AccountId}/{value.Balance}").Result;
            }
            else
            {
                response = client.GetAsync(client.BaseAddress + $"/Rules/evaluateMinBal/{value.AccountId}/{value.Balance}").Result;
            }

            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                dynamic ruleStatus = JsonConvert.DeserializeObject(data1);
                if (ruleStatus.status == 210)
                    return WithdrawWithAccountService(value.AccountId, value.Balance);
                return "Withdraw Declined";
                
            }
            return "Link Failure";
        }

        private string WithdrawWithAccountService(int accountId, int balance)
		{
            baseAddress = new Uri("http://localhost:54831/api");
            client = new HttpClient();
            client.BaseAddress = baseAddress;
            HttpResponseMessage response;
            response = client.PostAsync(client.BaseAddress + $"/Account/withdraw?AccountId={accountId}&amount={balance}", null).Result;
            return Convert.ToString(response.Content.ReadAsStringAsync().Result);
        }

        [HttpPost]
        [Route("transfer")]
        public string Transfer([FromBody] transfers value)
        {
            dwacc sa = new dwacc
            {
                AccountId = value.source_accid,
                Balance = value.amount
            };
            string data = JsonConvert.SerializeObject(sa);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");

            HttpResponseMessage response;
            if (sa.AccountId % 2 == 0)
            {
                response = client.GetAsync(client.BaseAddress + $"/Rules/evaluateMinBal/{value.source_accid}/{value.amount}").Result;
            }
            else
            {
                response = client.GetAsync(client.BaseAddress + $"/Rules/evaluateMinBal/{value.source_accid}/{value.amount}").Result;
            }
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                dynamic ruleStatus = JsonConvert.DeserializeObject(data1);
                if (ruleStatus.status == 210)
                {
                    WithdrawWithAccountService(value.source_accid, value.amount);
                    DepositWithAccountService(value.destination_accid, value.amount);
                    return "Transfer Successful";
                }
                return "Transfer Declined";

            }
            return "Link Failure";
        }
    }
}