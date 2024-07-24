using FilmDive.Server.Data;
using FilmDive.Server.ViewModels.User;
using Dapper;
using User = FilmDive.Server.Infrastructure.Data.Models.User;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Data;
namespace FilmDive.Server.Repositories.UserRepo
{
    public class UserRepository(DapperContext context) : IUserRepository
    {
        public async Task<User> FindUserAsync(UserViewModel model)
        {
            using (var connection = context.CreateConnection())
            {
                var user = await connection.QuerySingleAsync<User>("SELECT * FROM public.\"Users\" WHERE username = @username AND password = @password",
                   new { username = model.UserName, password = model.Password });
                return user;
            }
        }

        public async Task<User> FindUserAsync(string username)
        {
            using (var connection = context.CreateConnection())
            {
                var user = await connection.QuerySingleAsync<User>("SELECT * FROM public.\"Users\" WHERE username=@username",
                   new { username });
                return user;
            }
        }

        public async Task UpdateUserAsync(long id, User model)
        {
            var query = "UPDATE Users SET UserName = @UserName, Password = @Password, RefreshToken = @RefreshToken, RefreshTokenExpiryTime = @RefreshTokenExpiryTime WHERE id = @id";
            var parameters = new DynamicParameters();
            parameters.Add("UserName", model.UserName, DbType.String);
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
