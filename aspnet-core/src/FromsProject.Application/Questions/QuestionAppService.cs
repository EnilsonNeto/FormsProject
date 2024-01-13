using Abp.Application.Services.Dto;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FromsProject.Questions
{
    using Questionnaries;
    using Dto;
    public class QuestionAppService : AsyncCrudAppService<Question, QuestionDto, Guid, PagedResultRequestDto, CreateQuestionDto, QuestionDto>, IQuestionAppService
    {
        private readonly IMapper _mapper;
        private IRepository<Question, Guid> _questionRepository;
        public QuestionAppService(IRepository<Question, Guid> questionRepository,
                                IMapper mapper) : base(questionRepository)
        {
            _questionRepository = questionRepository;
            _mapper = mapper;
        }

        [AbpAuthorize]
        public async Task<ListResultDto<QuestionDto>> GetListBySectionId(Guid sectionId)
        {
            var result = await _questionRepository.GetAllListAsync(prop => prop.SectionId.Equals(sectionId));

            return new ListResultDto<QuestionDto>(_mapper.Map<List<QuestionDto>>(result));
        }
    }
}
