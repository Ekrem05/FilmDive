using FilmDive.Server.Infrastructure.Attributes;
using static FilmDive.Server.Infrastructure.Common.ValidationMessages;
using System.ComponentModel.DataAnnotations;

namespace FilmDive.Server.ViewModels.User
{
    public class SignupViewModel
    {
        [Required]
        [StringLength(10, MinimumLength = 3, ErrorMessage = Cretentials.InvalidUsernameLength)]
        public string Username { get; set; } = string.Empty;

        [Required, EmailAddress]
        [MinLength(3, ErrorMessage = Cretentials.InvalidEmailLength)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(20, MinimumLength = 5, ErrorMessage = Cretentials.InvalidPasswordLength)]
        [MustContainNumber]
        public string Password { get; set; } = string.Empty;
    }
}
