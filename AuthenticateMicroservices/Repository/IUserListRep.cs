using AuthenticateMicroservices.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthenticateMicroservices.Repository
{
    interface IUserListRep
    {
        public IEnumerable<User> getUserList();
    }
}
