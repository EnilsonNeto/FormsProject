using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using FromsProject.Questionnaries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromsProject.HeaderQuestionnaries.Dto
{
    using Questionnaries;
    using Sections.Dto;
    using Questions.Dto;
    using AlternativeQuestionnaries.Dto;
    using System.ComponentModel.DataAnnotations;

    [AutoMap(typeof(HeaderQuestionnarie))]
    public class HeaderQuestionnarieDto : FullAuditedEntityDto<Guid>
    {

        [Required]
        [StringLength(HeaderQuestionnarie.MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(HeaderQuestionnarie.MaxDescriptionLength)]
        public string Description { get; set; }

        public List<SectionDto> Sections { get; set; }

        public List<QuestionDto> Questions { get; set; }

        public List<AlternativeQuestionnarieDto> AlternativeQuestionnaries { get; set; }

        [Required]
        public bool isRequired { get; set; }
    }
}
