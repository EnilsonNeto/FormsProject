using System.ComponentModel.DataAnnotations;

namespace FromsProject.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}