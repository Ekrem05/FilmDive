using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.User;

namespace FilmDive.Server.Services.User
{
    public interface IUserService
    {
        Task<AuthenticatedResponse> LogInAsync(LoginViewModel model);
    }
}
