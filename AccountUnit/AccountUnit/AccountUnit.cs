using AccountMicroservice.Controllers;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;

namespace AccountUnit
{
    class AccountUnit
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void IsValidAccount_When_AccountExists()
        {
            Mock<IConfiguration> config = new Mock<IConfiguration>();
            AccountController account = new AccountController();
            var Result = account.CreatedAtAction("getCustomerAccounts/{id}", 1);
            Assert.IsNotNull(Result);
        }


        [Test]
        public void IsNotValidAccount_When_AccountNotExists()
        {
            Mock<IConfiguration> config = new Mock<IConfiguration>();
            AccountController account = new AccountController();
            var Result = account.CreatedAtAction("getCustomerAccounts/{id}", -1);
            Assert.IsEmpty(Result.ContentTypes);
        }

    }
}
