using System;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Application.Services;

namespace FromsProject.AlternativeQuestionnaries
{
    using Dto;
    public interface IAlternativeQuestionnarieAppService : IAsyncCrudAppService<AlternativeQuestionnarieDto, Guid, PagedResultRequestDto, CreateAlternativeQuestionnarieDto, AlternativeQuestionnarieDto>
    {
        Task<ListResultDto<AlternativeQuestionnarieDto>> GetListByQuestionId(Guid questionId);
    }
}
