using FilmDive.Server.Data;
using FilmDive.Server.Repositories.UserRepo;
using FilmDive.Server.Services.Token;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.User;
using System.Security.Claims;

namespace FilmDive.Server.Services.User
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

            var user = await userRepository.FindUserAsync(model);

            if (user is null)
                throw new UnauthorizedAccessException();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, model.UserName)
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
    }
}
