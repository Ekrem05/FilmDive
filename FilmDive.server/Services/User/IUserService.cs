using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.User;

namespace FilmDive.Server.Services.UserServiceFolder
{
    public interface IUserService
    {   
        Task<AuthenticatedResponse> SignUpAsync(SignupViewModel model);
        Task<AuthenticatedResponse> LogInAsync(LoginViewModel model);
        Task<UserDetails> GetAsync(string accessToken);

    }
}
