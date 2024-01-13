using Abp.Application.Services.Dto;
using Abp.Application.Services;
using System;

namespace FromsProject.HeaderQuestionnaries
{
    using Dto;
    public interface IHeaderQuestionnarieAppService : IAsyncCrudAppService<HeaderQuestionnarieDto, Guid, PagedResultRequestDto, CreateHeaderQuestionnarieDto, HeaderQuestionnarieDto>
    {
    }
}
