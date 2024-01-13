using System;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Application.Services;

namespace FromsProject.Questions
{

    using Dto;

    public interface IQuestionAppService : IAsyncCrudAppService<QuestionDto, Guid, PagedResultRequestDto, CreateQuestionDto, QuestionDto>
    {
        Task<ListResultDto<QuestionDto>> GetListBySectionId(Guid sectionId);
    }
}
