using System.Threading.Tasks;
using FromsProject.Configuration.Dto;

namespace FromsProject.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
