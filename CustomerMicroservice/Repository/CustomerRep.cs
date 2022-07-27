using CustomerMicroservice.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;

namespace CustomerMicroservice.Repository
{
    public static class CustomerRep
    {
        public static List<Customer> customers = new List<Customer>
        {
            new Customer{id=10001, Name="TRS",Address="Kerala",DOB="05-09-1997",PanNo="CGLBP002"},
            new Customer{id=10002, Name="PD",Address="Kolkata",DOB="05-08-1996",PanNo="CGLBH001"},
            new Customer{id=10003, Name="SSR",Address="Bangalore",DOB="10-06-1998",PanNo="DGLM002"},
            new Customer{id=10004, Name="CK",Address="Dumdum",DOB="03-06-1995",PanNo="CGLBP105"},
            new Customer{id=10005, Name="JC",Address="Kolkata",DOB="15-09-1998",PanNo="CPLBP005"},
            new Customer{id=10006, Name="PA",Address="Mumbai",DOB="05-09-1999",PanNo="CPDBP112"}

        };
        static int nextId = 10007;
        static Uri baseAddress = new Uri("http://localhost:54831/api/");
        static HttpClient client;
        static CustomerRep()
        {
            client = new HttpClient();
            client.BaseAddress = baseAddress;
        }
        public static CustomerCreationStatus createCustomer(Customer customer)
        {
            customer.id = nextId++;
            customers.Add(customer);
            string data = JsonConvert.SerializeObject(customer);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "Account/createAccount/", content).Result;
            if (response.IsSuccessStatusCode)
            {
                var ob = new CustomerCreationStatus();
                ob.CustomerId = customer.id;
                ob.Message = "Success Current and Savings account also created";
                ob.CurrentAccountId = customer.id * 100 + 1;
                ob.SavingsAccountId = customer.id * 100 + 2;
                return ob;
            }
            return new CustomerCreationStatus
            {
                CustomerId = customer.id,
                Message = "Please Enter Valid Details",
                CurrentAccountId = customer.id * 100 + 1,
                SavingsAccountId = customer.id * 100 + 2
            };
        }

        public static Customer getCustomerDetails(int CustId)
        {
            return customers.Where(c => c.id == CustId).FirstOrDefault();
        }
    }
}
