using Abp.AutoMapper;
using FromsProject.Questionnaries;
using System;
using System.ComponentModel.DataAnnotations;

namespace FromsProject.Questions.Dto
{
    [AutoMap(typeof(Question))]
    public class CreateQuestionDto
    {
        [Required]
        [StringLength(Question.MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(Question.MaxDescriptionLength)]
        public string Description { get; set; }

        public Guid SectionId { get; set; }
    }
}
