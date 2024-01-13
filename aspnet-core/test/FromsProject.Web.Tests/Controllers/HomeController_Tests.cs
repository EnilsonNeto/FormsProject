using System.Threading.Tasks;
using FromsProject.Models.TokenAuth;
using FromsProject.Web.Controllers;
using Shouldly;
using Xunit;

namespace FromsProject.Web.Tests.Controllers
{
    public class HomeController_Tests: FromsProjectWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}