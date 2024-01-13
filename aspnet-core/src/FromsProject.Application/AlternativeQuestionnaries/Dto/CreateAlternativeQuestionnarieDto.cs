using Abp.AutoMapper;
using FromsProject.Questionnaries;
using System;
using System.ComponentModel.DataAnnotations;

namespace FromsProject.AlternativeQuestionnaries.Dto
{
    [AutoMap(typeof(AlternativeQuestionnarie))]
    public class CreateAlternativeQuestionnarieDto
    {
        [Required]
        [StringLength(AlternativeQuestionnarie.MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(AlternativeQuestionnarie.MaxValueLength)]
        public string Value { get; set; }

        public string Type { get; set; }

        public Guid QuestionId { get; set; }
    }
}
