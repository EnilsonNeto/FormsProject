using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using FromsProject.EntityFrameworkCore;
using FromsProject.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace FromsProject.Web.Tests
{
    [DependsOn(
        typeof(FromsProjectWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class FromsProjectWebTestModule : AbpModule
    {
        public FromsProjectWebTestModule(FromsProjectEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(FromsProjectWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(FromsProjectWebMvcModule).Assembly);
        }
    }
}