
using AuthenticateMicroservices.Controllers;
using AuthenticateMicroservices.Model;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;

namespace AuthenticateUnit
{
    public class AuthUnit
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void IsTokenNotNull_When_ValidUserCredentialsAreUsed()
        {
            Mock<IConfiguration> config = new Mock<IConfiguration>();
            TokenController TokenObj = new TokenController();
            var Result = TokenObj.CreatedAtAction("auth", new User() { UserId = "10001", Password = "1234", Roles = "Employee" });
            Assert.IsNotNull(Result);
        }

        [Test]
        public void IsTokenNull_When_InvalidUserCredentialsAreUsed()
        {
            Mock<IConfiguration> config = new Mock<IConfiguration>();
            var TokenObj = new TokenController();
            var Result = TokenObj.CreatedAtAction("auth", new User() { UserId = "0", Password = "wronginput", Roles = "wronginput" });
            Assert.IsEmpty(Result.ContentTypes);
        }

    }
}