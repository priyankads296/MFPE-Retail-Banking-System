using System.Collections.Generic;

namespace AccountMicroservice.Models
{
    public class AccountStatement
    {
        public int AccId { get; set; }
        public List<Statement> Statements { get; set; }
    }
}
