using System.ComponentModel.DataAnnotations.Schema;

namespace AccountMicroservice.Models
{
    public class AccountCreationStatus
    {
        public int Message { get; set; }

        [ForeignKey("AccountId")]
        public int AccountId { get; set; }
    }

}
