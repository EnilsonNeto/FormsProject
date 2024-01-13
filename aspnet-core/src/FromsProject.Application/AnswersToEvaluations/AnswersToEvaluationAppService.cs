using Abp.Application.Services.Dto;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using AutoMapper;
using System;

namespace FromsProject.AnswersToEvaluations
{
    using Dto;
    public class AnswersToEvaluationAppService : AsyncCrudAppService<AnswersToEvaluation, AnswersToEvaluationDto, Guid, PagedResultRequestDto, CreateAnswersToEvaluationDto, AnswersToEvaluationDto>, IAnswersToEvaluationAppService
    {
        private readonly IMapper _mapper;
        private IRepository<AnswersToEvaluation, Guid> _answersToEvaluationRepository;
        public AnswersToEvaluationAppService(IRepository<AnswersToEvaluation, Guid> answersToEvaluationRepository,
                                    IMapper mapper) : base(answersToEvaluationRepository)
        {
            _answersToEvaluationRepository = answersToEvaluationRepository;
            _mapper = mapper;
        }
    }
}
