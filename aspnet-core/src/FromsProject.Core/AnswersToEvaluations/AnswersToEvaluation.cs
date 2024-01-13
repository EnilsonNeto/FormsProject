using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;


namespace FromsProject.AnswersToEvaluations
{
    using Questionnaries;

    [Table("AppAnswersToEvaluation")]
    public class AnswersToEvaluation : FullAuditedEntity<Guid>
    {
        public const int MaxTextOfAlternativesLength = 1080;
        public const int MaxValueOfAlternativesLength = 1080;
        public const int MaxValueOfHeaderLength = 1080;
        public const int MaxValueOfSectionsLength = 1080;

        [Required]
        public Guid? HeaderQuestionnarieId { get; set; }

        public virtual HeaderQuestionnarie HeaderQuestionnarie { get; set; }

        public Guid? SectionId { get; set; }

        public virtual Section Section { get; set; }

        public Guid? QuestionId { get; set; }

        public virtual Question Question { get; set; }


        [StringLength(MaxTextOfAlternativesLength)]
        public string TextOfAlternatives { get; set; }


        [StringLength(MaxValueOfAlternativesLength)]
        public string ValueOfAlternatives { get; set; }


        [StringLength(MaxValueOfHeaderLength)]
        public string ValueOfHeader { get; set; }


        [StringLength(MaxValueOfSectionsLength)]
        public string ValueOfSections { get; set; }
    }
}
