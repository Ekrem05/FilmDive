using FilmDive.Server.Data;
using FilmDive.Server.ViewModels.User;
using Dapper;
using User = FilmDive.Server.Infrastructure.Data.Models.User;
using Microsoft.EntityFrameworkCore;
using System.Data;
namespace FilmDive.Server.Repositories.UserRepo
{
    public class UserRepository(DapperContext context) : IUserRepository
    {
        public async Task CreateUserAsync(User model)
        {
            var query = "INSERT INTO public.\"Users\" (\"Email\", \"Password\", \"RefreshToken\", \"RefreshTokenExpiryTime\") VALUES (@Email, @Password, @RefreshToken, @RefreshTokenExpiryTime)";
            var parameters = new DynamicParameters();
            parameters.Add("Email", model.Email, DbType.String);
            parameters.Add("Password", model.Password, DbType.String);
            parameters.Add("RefreshToken", model.RefreshToken, DbType.String);
            parameters.Add("RefreshTokenExpiryTime", model.RefreshTokenExpiryTime, DbType.DateTime);

            using (var connection = context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task<User> FindUserAsync(UserViewModel model)
        {
            using (var connection = context.CreateConnection())
            {
                var user = await connection.QuerySingleAsync<User>("SELECT * FROM public.\"Users\" WHERE \"Email\" = @email AND \"Password\" = @password",
                   new { email = model.Email, password = model.Password });
                return user;
            }
        }

        public async Task<User> FindUserAsync(string email)
        {
            using (var connection = context.CreateConnection())
            {
                var user = await connection.QueryFirstOrDefaultAsync<User>("SELECT * FROM public.\"Users\" WHERE \"Email\"=@email",
                   new { email });
                return user;
            }
        }

        public async Task UpdateUserAsync(long id, User model)
        {
            var query = "UPDATE public.\"Users\" SET \"Email\" = @Email, \"Password\" = @Password, \"RefreshToken\" = @RefreshToken, \"RefreshTokenExpiryTime\" = @RefreshTokenExpiryTime WHERE \"Id\" = @id";
            var parameters = new DynamicParameters();
            parameters.Add("Email", model.Email, DbType.String);
            parameters.Add("Password", model.Password, DbType.String);
            parameters.Add("RefreshToken", model.RefreshToken, DbType.String);
            parameters.Add("RefreshTokenExpiryTime", model.RefreshTokenExpiryTime, DbType.DateTime);
            parameters.Add("id", id, DbType.Int32);

            using (var connection = context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }
    }
}
