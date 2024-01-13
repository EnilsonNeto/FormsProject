using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FromsProject.Questionnaries
{
    [Table("AppSection")]
    public class Section : FullAuditedEntity<Guid>
    {
        public const int MaxTitleLength = 480;
        public const int MaxSubTitleLength = 480;
        public const int MaxDescriptionLength = 2080;

        public Guid HeaderQuestionnarieId { get; set; }

        public virtual HeaderQuestionnarie HeaderQuestionnarie { get; set; }

        [Required]
        [StringLength(MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(MaxDescriptionLength)]
        public string Description { get; set; }

        [StringLength(MaxSubTitleLength)]
        public string SubTitle { get; set; }

        public virtual ICollection<Question> Questions { get; set; }
    }
}
