using Abp.Application.Services.Dto;
using Abp.Application.Services;
using System;
using System.Threading.Tasks;

namespace FromsProject.Sections
{
    using Dto;
    public interface ISectionAppService : IAsyncCrudAppService<SectionDto, Guid, PagedResultRequestDto, CreateSectionDto, SectionDto>
    {
        Task<ListResultDto<SectionDto>> GetListByHeaderQuestionnarieId(Guid headerQuestionnarieId);
    }
}
