using Abp.AutoMapper;
using System;
using System.ComponentModel.DataAnnotations;

namespace FromsProject.AnswersToEvaluations.Dto
{
    [AutoMap(typeof(AnswersToEvaluation))]
    public class CreateAnswersToEvaluationDto
    {
        [Required]
        public Guid? HeaderQuestionnarieId { get; set; }

        public Guid? SectionId { get; set; }

        public Guid? QuestionId { get; set; }

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
