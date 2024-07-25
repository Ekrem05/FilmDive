using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.User;

namespace FilmDive.Server.Services.UserServiceFolder
{
    public interface IUserService
    {   
        Task<AuthenticatedResponse> SignInAsync(UserViewModel model);
        Task<AuthenticatedResponse> LogInAsync(UserViewModel model);
        Task<UserDetails> GetAsync(string accessToken);

    }
}
