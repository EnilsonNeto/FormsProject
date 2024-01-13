using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using FromsProject.Configuration.Dto;

namespace FromsProject.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : FromsProjectAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
