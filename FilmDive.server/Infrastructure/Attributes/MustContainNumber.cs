using System.ComponentModel.DataAnnotations;

namespace FilmDive.Server.Infrastructure.Attributes
{
    public class MustContainNumber : ValidationAttribute
    {

        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            var password = value as string;
            if (string.IsNullOrEmpty(password) || !password.Any(char.IsDigit))
            {
                return new ValidationResult("The password must contain at least one number.");
            }
            return ValidationResult.Success;
        }
    }
}
