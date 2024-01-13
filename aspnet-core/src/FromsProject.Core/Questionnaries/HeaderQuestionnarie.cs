using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FromsProject.Questionnaries
{
    [Table("AppHeaderQuestionnarie")]
    public class HeaderQuestionnarie : FullAuditedEntity<Guid>
    {
        public const int MaxTitleLength = 560;
        public const int MaxDescriptionLength = 2080;

        [Required]
        [StringLength(MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(MaxDescriptionLength)]
        public string Description { get; set; }

        public virtual ICollection<Section> Sections { get; set; }

        public virtual ICollection<Question> Questions { get; set; }

        public virtual ICollection<AlternativeQuestionnarie> AlternativeQuestionnaries { get; set; }

        [Required]
        public bool isRequired { get; set; }
    }
}
