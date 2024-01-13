using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FromsProject.Questionnaries
{
    [Table("AppAlternativeQuestionnarie")]
    public class AlternativeQuestionnarie : FullAuditedEntity<Guid>
    {
        public const int MaxTitleLength = 480;
        public const int MaxValueLength = 480;

        public Guid QuestionId { get; set; }

        public virtual Question Question { get; set; }

        [Required]
        [StringLength(MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(MaxValueLength)]
        public string Value { get; set; }

        public string Type { get; set; }

    }
}
