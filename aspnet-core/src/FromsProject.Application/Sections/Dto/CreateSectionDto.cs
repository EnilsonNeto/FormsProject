using Abp.AutoMapper;
using System;

namespace FromsProject.Sections.Dto
{
    using Questionnaries;
    using System.ComponentModel.DataAnnotations;

    [AutoMap(typeof(Section))]
    public class CreateSectionDto
    {
        [Required]
        [StringLength(Section.MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(Section.MaxDescriptionLength)]
        public string Description { get; set; }

        [StringLength(Section.MaxSubTitleLength)]
        public string SubTitle { get; set; }

        public Guid HeaderQuestionnarieId { get; set; }
    }
}
