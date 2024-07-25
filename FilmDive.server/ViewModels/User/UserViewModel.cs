using static FilmDive.Server.Common.ValidationMessages;
using System.ComponentModel.DataAnnotations;
using FilmDive.Server.Infrastructure.Attributes;

namespace FilmDive.Server.ViewModels.User
{
    public class UserViewModel
    {
        [Required,EmailAddress]
        [MinLength(2, ErrorMessage = Cretentials.InvalidEmailLength)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(20, MinimumLength = 5, ErrorMessage = Cretentials.InvalidPasswordLength)]
        [MustContainNumber]
        public string Password { get; set; } = string.Empty;
    }
}
