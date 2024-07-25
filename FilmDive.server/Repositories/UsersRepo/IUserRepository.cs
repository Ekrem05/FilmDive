using FilmDive.Server.Infrastructure.Data.Models;
using FilmDive.Server.ViewModels.User;

namespace FilmDive.Server.Repositories.UserRepo
{
    public interface IUserRepository
    {
       Task<User> FindUserAsync(UserViewModel model);
       Task<User> FindUserAsync(string username);
       Task CreateUserAsync(User model);
       Task UpdateUserAsync(long id, User model);
    }
}
