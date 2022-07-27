using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthenticateMicroservices.Model
{
    public class User
    {
        public string UserId { get; set; }
        public string Password { get; set; }
        public string Roles { get; set; }
    }
}
