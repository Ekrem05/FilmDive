using FilmDive.Server.Infrastructure.Data.Models;
using FilmDive.Server.ViewModels.User;

namespace FilmDive.Server.Repositories.UserRepo
{
    public interface IUserRepository
    {
       Task<User> FindUserAsync(LoginViewModel model);
        Task<User> FindUserAsync(string username);
        Task<User> DoesUserExistAsync(string username,string email);
       Task<int> CreateUserAsync(User model);
       Task UpdateUserAsync(long id, User model);
    }
}
