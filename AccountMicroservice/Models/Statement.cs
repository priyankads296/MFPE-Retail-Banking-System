namespace AccountMicroservice.Models
{
    public class Statement
    {
        public int AccountId { get; set; }
        public string Date { get; set; }
        public string Narration { get; set; }
        public string Refno { get; set; }
        public string ValueDate { get; set; }
        public double Withdrawal { get; set; }
        public double Deposit { get; set; }
        public double ClosingBalance { get; set; }
    }
}
