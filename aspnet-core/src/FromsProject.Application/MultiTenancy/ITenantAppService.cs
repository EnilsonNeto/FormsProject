using Abp.Application.Services;
using FromsProject.MultiTenancy.Dto;

namespace FromsProject.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

