using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;

namespace FromsProject.HeaderQuestionnaries.Dto
{
    using Questionnaries;

    [AutoMap(typeof(HeaderQuestionnarie))]
    public class CreateHeaderQuestionnarieDto
    {
        [Required]
        [StringLength(HeaderQuestionnarie.MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(HeaderQuestionnarie.MaxDescriptionLength)]
        public string Description { get; set; }

        [Required]
        public bool isRequired { get; set; }
    }
}
