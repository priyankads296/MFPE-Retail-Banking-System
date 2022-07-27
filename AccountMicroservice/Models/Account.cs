﻿using System.ComponentModel.DataAnnotations;

namespace AccountMicroservice.Models
{
    public class Account
    {
        [Key]
        public int AccountId { get; set; }
        public int CustomerId { get; set; }
        public string AccountType { get; set; }
        public int Balance { get; set; }
        public int minBalance { get; set; }
    }
}