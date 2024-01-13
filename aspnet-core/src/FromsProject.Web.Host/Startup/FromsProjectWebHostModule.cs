using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using FromsProject.Configuration;

namespace FromsProject.Web.Host.Startup
{
    [DependsOn(
       typeof(FromsProjectWebCoreModule))]
    public class FromsProjectWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public FromsProjectWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(FromsProjectWebHostModule).GetAssembly());
        }
    }
}
