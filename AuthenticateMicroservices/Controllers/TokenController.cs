using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AuthenticateMicroservices.Model;
using AuthenticateMicroservices.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AuthenticateMicroservices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        
        readonly log4net.ILog _log4net;
        public TokenController()
        {
            _log4net = log4net.LogManager.GetLogger(typeof(TokenController));
        }
        [HttpPost]
        [Route("auth")]
        public IActionResult Post([FromBody] User u)
        {
            _log4net.Info("Login method generated");
            UserListRep uL = new UserListRep();
            var userList = uL.getUserList();
            foreach (var v in userList)
            {
                if (u.UserId ==  v.UserId && u.Password == v.Password && u.Roles==v.Roles)
                {
                    string role = "";
                    if (u.Roles == "Employee")
                        role = "Employee";
                    else
                        role = "Customer";
                    var result = new
                    { 
                        token = GenerateJSONWebToken(Int32.Parse(u.UserId), role)
                    };
                    _log4net.Info("Token Generated");
                    return Ok(result);
                }
            }
            _log4net.Info("Token Denied");
            return BadRequest();
        }
        [HttpPost]
        [Route("createUser")]
        public void createUser(User u)
        {
            UserListRep ul = new UserListRep();
            ul.AddUser(u);
        }
        private string GenerateJSONWebToken(int userId, string userRole)
        {
            _log4net.Info("Token Generation Initiated");
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mysuperdupersecret"));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {

                new Claim(ClaimTypes.Role, userRole),

                new Claim("UserId", userId.ToString())

            };

            var token = new JwtSecurityToken(

            issuer: "mySystem",

            audience: "myUsers",

            claims: claims,

            expires: DateTime.Now.AddMinutes(10),

            signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
