using System;
using Abp.Application.Services.Dto;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using AutoMapper;

namespace FromsProject.HeaderQuestionnaries
{
    using Dto;
    using Questionnaries;

    public class HeaderQuestionnarieAppService : AsyncCrudAppService<HeaderQuestionnarie, HeaderQuestionnarieDto, Guid, PagedResultRequestDto, CreateHeaderQuestionnarieDto, HeaderQuestionnarieDto>, IHeaderQuestionnarieAppService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<HeaderQuestionnarie, Guid> _headerQuestionnarieRepository;
        public HeaderQuestionnarieAppService(IRepository<HeaderQuestionnarie, Guid> headerQuestionnarieRepository,
        IMapper mapper) : base(headerQuestionnarieRepository)
        {
            _headerQuestionnarieRepository = headerQuestionnarieRepository;
            _mapper = mapper;
        }
    }
}
