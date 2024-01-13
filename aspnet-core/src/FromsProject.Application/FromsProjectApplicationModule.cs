using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using FromsProject.Authorization;

namespace FromsProject
{
    [DependsOn(
        typeof(FromsProjectCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class FromsProjectApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<FromsProjectAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(FromsProjectApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
