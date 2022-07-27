using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AccountMicroservice
{
    public class Customer
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public string DOB { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        [StringLength(10)]
        public string PanNo { get; set; }
       
    }
}
