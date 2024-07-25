using BCrypt.Net;
using FilmDive.Server.Data;
using FilmDive.Server.Infrastructure.Data.Models;
using FilmDive.Server.Repositories.UserRepo;
using FilmDive.Server.Services.Token;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.User;
using System.Security.Claims;
using User = FilmDive.Server.Infrastructure.Data.Models.User;
namespace FilmDive.Server.Services.UserServiceFolder
{
    public class UserService(IUserRepository userRepository,
        ITokenService tokenService) : IUserService
    {
        public async Task<AuthenticatedResponse> LogInAsync(UserViewModel model)
        {
            if (model is null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            var user = await userRepository.FindUserAsync(model.Username);

            if (user is null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                throw new InvalidOperationException("Wrong username or password");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, model.Username)
            };
            var accessToken = tokenService.GenerateAccessToken(claims);
            var refreshToken = tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await userRepository.UpdateUserAsync(user.Id, user);

            return new AuthenticatedResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<AuthenticatedResponse> SignInAsync(UserViewModel model)
        {
            if (model is null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var user = await userRepository.FindUserAsync(model.Username);

            if (user is not null)
                throw new InvalidOperationException("A user with this username already exists.");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, model.Username)
            };
            var accessToken = tokenService.GenerateAccessToken(claims);
            var refreshToken = tokenService.GenerateRefreshToken();

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

            User newUser = new User()
            {
                Username = model.Username,
                Password = hashedPassword,
                RefreshToken = refreshToken,
                RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
            };

            await userRepository.CreateUserAsync(newUser);
            return new AuthenticatedResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken
            };
        }
    }
}
