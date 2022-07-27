using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace RulesMicroservice
{
    public class Account
    {
        [Key]
        public int AccountId { get; set; }
        public int Sav_AccountId { get; set; }

        public int Cur_AccountId { get; set; }

        [ForeignKey("Customer")]
        public int CustomerId { get; set; }

        public string accountType { get; set; }

        public double Balance { get; set; }
        public double MinBalance { get; set; }



    }

    public enum AccountType
    {
        SavingAccount = 0,
        CurrentAccount = 1
    };

}
