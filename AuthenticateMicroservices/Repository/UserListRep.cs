using AuthenticateMicroservices.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace AuthenticateMicroservices.Repository
{
    public class UserListRep : IUserListRep
    {
        public static List<User> userList = new List<User>
            {
                new User{UserId="50001",Password="1234",Roles="Employee"},
                new User{UserId="50002",Password="1235",Roles="Employee"},
                new User{UserId="50003",Password="1236",Roles="Employee"},
                new User{UserId="50004",Password="1237",Roles="Employee"},
                new User{UserId="50005",Password="1238",Roles="Employee"},
             
                new User{UserId="10001",Password="12345",Roles="Customer"},
                new User{UserId="10002",Password="12346",Roles="Customer"},
                new User{UserId="10003",Password="12347",Roles="Customer"},
                new User{UserId="10004",Password="12348",Roles="Customer"},
                new User{UserId="10005",Password="12349",Roles="Customer"},
                new User{UserId="10006",Password="12340",Roles="Customer"},
                new User{UserId="10007",Password="12341",Roles="Customer"},
                new User{UserId="10008",Password="12342",Roles="Customer"},
                new User{UserId="10009",Password="12343",Roles="Customer"}
            };

        public IEnumerable<User> getUserList()
        {
            
            return userList;
        }

        public void AddUser(User u)
        {
            userList.Add(u);
        }
    }
}
