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
        public async Task<int> CreateUserAsync(User model)
        {
            var query = @"
        INSERT INTO public.""Users"" 
        (""Email"", ""Username"", ""Password"", ""RefreshToken"", ""RefreshTokenExpiryTime"") 
        VALUES (@Email, @Username, @Password, @RefreshToken, @RefreshTokenExpiryTime)
        RETURNING ""Id"";";

            var parameters = new DynamicParameters();
            parameters.Add("Email", model.Email, DbType.String);
            parameters.Add("Username", model.Username, DbType.String);
            parameters.Add("Password", model.Password, DbType.String);
            parameters.Add("RefreshToken", model.RefreshToken, DbType.String);
            parameters.Add("RefreshTokenExpiryTime", model.RefreshTokenExpiryTime, DbType.DateTime);

            using (var connection = context.CreateConnection())
            {
                return await connection.ExecuteScalarAsync<int>(query, parameters);
            }
        }


        public async Task<User> FindUserAsync(LoginViewModel model)
        {
            using (var connection = context.CreateConnection())
            {
                var user = await connection.QuerySingleAsync<User>("SELECT * FROM public.\"Users\" WHERE \"Username\" = @username AND \"Password\" = @password",
                   new { username = model.Username, password = model.Password });
                return user;
            }
        }
        public async Task<User> FindUserAsync(string username)
        {
            using (var connection = context.CreateConnection())
            {
                var user = await connection.QuerySingleAsync<User>("SELECT * FROM public.\"Users\" WHERE \"Username\" = @username",
                   new { username });
                return user;
            }
        }

        public async Task<User> DoesUserExistAsync(string username,string email)
        {
            using (var connection = context.CreateConnection())
            {
                var user = await connection.QueryFirstOrDefaultAsync<User>("SELECT * FROM public.\"Users\"WHERE \"Username\" = @username OR \"Email\" = @email",
                   new { username,email });
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
