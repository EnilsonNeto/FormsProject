using Abp.Application.Services.Dto;
using Abp.Application.Services;
using FromsProject.AnswersToEvaluations.Dto;
using System;

namespace FromsProject.AnswersToEvaluations
{
    public interface IAnswersToEvaluationAppService : IAsyncCrudAppService<AnswersToEvaluationDto, Guid, PagedResultRequestDto, CreateAnswersToEvaluationDto, AnswersToEvaluationDto>
    {
    }
}
