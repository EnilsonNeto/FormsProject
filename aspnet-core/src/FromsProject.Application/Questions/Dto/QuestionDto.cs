using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.AutoMapper;


namespace FromsProject.Questions.Dto
{
    using Questionnaries;
    using AlternativeQuestionnaries.Dto;
    using System.ComponentModel.DataAnnotations;
    using Abp.Application.Services.Dto;

    [AutoMap(typeof(Question))]
    public class QuestionDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        [StringLength(Question.MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(Question.MaxDescriptionLength)]
        public string Description { get; set; }

        [StringLength(Question.MaxIdByFormulaLength)]
        public string IdByFormula { get; set; }

        [StringLength(Question.MaxFormulaLength)]
        public string Formula { get; set; }

        public Guid SectionId { get; set; }

        public virtual Section Section { get; set; }

        public List<AlternativeQuestionnarieDto> AlternativeQuestionnaries { get; set; }
    }
}
