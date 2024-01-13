using System.Threading.Tasks;
using Abp.Application.Services;
using FromsProject.Sessions.Dto;

namespace FromsProject.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
