using Abp.Application.Services.Dto;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FromsProject.AlternativeQuestionnaries
{
    using Questionnaries;
    using Dto;
    public class AlternativeQuestionnarieAppService : AsyncCrudAppService<AlternativeQuestionnarie, AlternativeQuestionnarieDto, Guid, PagedResultRequestDto, CreateAlternativeQuestionnarieDto, AlternativeQuestionnarieDto>, IAlternativeQuestionnarieAppService
    {
        private readonly IMapper _mapper;
        private IRepository<AlternativeQuestionnarie, Guid> _alternativeQuestionnarieRepository;

        public AlternativeQuestionnarieAppService(IRepository<AlternativeQuestionnarie, Guid> alternativeQuestionnarieRepository,
                                                  IMapper mapper) : base(alternativeQuestionnarieRepository)
        {
            _alternativeQuestionnarieRepository = alternativeQuestionnarieRepository;
            _mapper = mapper;
        }

        public async Task<ListResultDto<AlternativeQuestionnarieDto>> GetListByQuestionId(Guid questionId)
        {
            var result = await _alternativeQuestionnarieRepository.GetAllListAsync(prop => prop.QuestionId.Equals(questionId));

            return new ListResultDto<AlternativeQuestionnarieDto>(_mapper.Map<List<AlternativeQuestionnarieDto>>(result));
        }
    }
}