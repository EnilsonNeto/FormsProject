using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace FromsProject.Controllers
{
    public abstract class FromsProjectControllerBase: AbpController
    {
        protected FromsProjectControllerBase()
        {
            LocalizationSourceName = FromsProjectConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
