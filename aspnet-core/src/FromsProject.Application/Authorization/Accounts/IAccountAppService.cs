using System.Threading.Tasks;
using Abp.Application.Services;
using FromsProject.Authorization.Accounts.Dto;

namespace FromsProject.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
