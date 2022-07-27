using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace RulesMicroservice.Repository
{
    public class ChargeRepository : IChargeRepository
    {
        static readonly log4net.ILog _log4net = log4net.LogManager.GetLogger(typeof(ChargeRepository));
        public TransactionStatus ApplyServiceCharge(int AccountID, int Amount)
        {
            try
            {
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:44304");
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                var postData = new { AccountId = AccountID, amount = Amount };
                var jsonString = JsonConvert.SerializeObject(postData);
                var obj = new StringContent(jsonString, System.Text.Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("api/Transaction/withdraw", obj).Result;
                var result = response.Content.ReadAsStringAsync().Result;
                TransactionStatus transactionStatus = JsonConvert.DeserializeObject<TransactionStatus>(result);
                return transactionStatus;
            }
            catch (Exception e)
            {
                _log4net.Error("Error occured while applying Charge from transaction API" + e.Message);
                throw;
            }
        }


    }
}
