using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FromsProject.Questionnaries
{
    [Table("AppQuestion")]
    public class Question : FullAuditedEntity<Guid>
    {
        public const int MaxTitleLength = 480;
        public const int MaxDescriptionLength = 2080;
        public const int MaxIdByFormulaLength = 480;
        public const int MaxFormulaLength = 480;

        [Required]
        [StringLength(MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(MaxDescriptionLength)]
        public string Description { get; set; }

        public Guid SectionId { get; set; }

        public virtual Section Section { get; set; }

        public virtual ICollection<AlternativeQuestionnarie> AlternativeQuestionnaries { get; set; }
    }
}
