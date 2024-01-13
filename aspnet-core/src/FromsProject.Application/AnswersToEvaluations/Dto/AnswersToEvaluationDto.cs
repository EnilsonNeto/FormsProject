using System;
using System.ComponentModel.DataAnnotations;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace FromsProject.AnswersToEvaluations.Dto
{
    using Questionnaries;

    [AutoMap(typeof(AnswersToEvaluation))]
    public class AnswersToEvaluationDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        public Guid? HeaderQuestionnarieId { get; set; }

        public virtual HeaderQuestionnarie HeaderQuestionnarie { get; set; }

        public Guid? SectionId { get; set; }

        public virtual Section Section { get; set; }

        public Guid? QuestionId { get; set; }

        public virtual Question Question { get; set; }


        [StringLength(AnswersToEvaluation.MaxTextOfAlternativesLength)]
        public string TextOfAlternatives { get; set; }


        [StringLength(AnswersToEvaluation.MaxValueOfAlternativesLength)]
        public string ValueOfAlternatives { get; set; }


        [StringLength(AnswersToEvaluation.MaxValueOfHeaderLength)]
        public string ValueOfHeader { get; set; }


        [StringLength(AnswersToEvaluation.MaxValueOfSectionsLength)]
        public string ValueOfSections { get; set; }
    }
}
