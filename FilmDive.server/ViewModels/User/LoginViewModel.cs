using static FilmDive.Server.Common.ValidationMessages;
using System.ComponentModel.DataAnnotations;
using FilmDive.Server.Infrastructure.Attributes;

namespace FilmDive.Server.ViewModels.User
{
    public class LoginViewModel
    {
        [Required]
        [StringLength(10, MinimumLength = 3, ErrorMessage = Cretentials.InvalidUsernameLength)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [StringLength(20, MinimumLength = 5, ErrorMessage = Cretentials.InvalidPasswordLength)]
        [MustContainNumber]
        public string Password { get; set; } = string.Empty;
    }
}
