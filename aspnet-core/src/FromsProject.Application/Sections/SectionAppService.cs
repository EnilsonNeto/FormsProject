using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Domain.Repositories;
using AutoMapper;
using Abp.Application.Services.Dto;
using Abp.Application.Services;

namespace FromsProject.Sections
{
    using Dto;
    using Questionnaries;

    public class SectionAppService : AsyncCrudAppService<Section, SectionDto, Guid, PagedResultRequestDto, CreateSectionDto, SectionDto>, ISectionAppService
    {
        private readonly IMapper _mapper;
        private IRepository<Section, Guid> _sectionRepository;

        public SectionAppService(IRepository<Section, Guid> sectionRepository,
                                IMapper mapper) : base(sectionRepository)
        {
            _sectionRepository = sectionRepository;
            _mapper = mapper;
        }

        [AbpAuthorize]
        public async Task<ListResultDto<SectionDto>> GetListByHeaderQuestionnarieId(Guid headerQuestionnarieId)
        {
            var result = await _sectionRepository.GetAllListAsync(prop => prop.HeaderQuestionnarieId.Equals(headerQuestionnarieId));

            return new ListResultDto<SectionDto>(_mapper.Map<List<SectionDto>>(result));
        }
    }
}
