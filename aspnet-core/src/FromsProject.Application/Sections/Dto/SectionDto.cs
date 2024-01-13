using Abp.Application.Services.Dto;
using FromsProject.Questionnaries;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Abp.AutoMapper;


namespace FromsProject.Sections.Dto
{
    using Questions.Dto;

    [AutoMap(typeof(Section))]
    public class SectionDto : FullAuditedEntityDto<Guid>
    {
        public Guid HeaderQuestionnarieId { get; set; }

        public virtual HeaderQuestionnarie HeaderQuestionnarie { get; set; }

        [Required]
        [StringLength(Section.MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(Section.MaxDescriptionLength)]
        public string Description { get; set; }

        [StringLength(Section.MaxSubTitleLength)]
        public string SubTitle { get; set; }

        public List<QuestionDto> Questions { get; set; }
    }
}
