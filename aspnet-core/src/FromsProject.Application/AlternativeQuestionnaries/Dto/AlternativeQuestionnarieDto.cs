using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromsProject.AlternativeQuestionnaries.Dto
{
    using Abp.Application.Services.Dto;
    using Abp.AutoMapper;
    using Questionnaries;
    using System.ComponentModel.DataAnnotations;

    [AutoMap(typeof(AlternativeQuestionnarie))]
    public class AlternativeQuestionnarieDto : FullAuditedEntityDto<Guid>
    {
        public Guid QuestionId { get; set; }

        public virtual Question Question { get; set; }

        [Required]
        [StringLength(AlternativeQuestionnarie.MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(AlternativeQuestionnarie.MaxValueLength)]
        public string Value { get; set; }

        public string Type { get; set; }
    }
}
