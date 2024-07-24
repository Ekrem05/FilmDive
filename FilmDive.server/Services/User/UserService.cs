using FilmDive.Server.Data;
using FilmDive.Server.Services.Token;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.User;
using System.Security.Claims;

namespace FilmDive.Server.Services.User
{
    public class UserService(UserContext userContext,
        ITokenService tokenService) : IUserService
    {
        public async Task<AuthenticatedResponse> LogInAsync(LoginViewModel model)
        {
            if (model is null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var user = userContext.Logins.FirstOrDefault(u =>
                (u.UserName == model.UserName) && (u.Password == model.Password));

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

            await userContext.SaveChangesAsync();

            return new AuthenticatedResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken
            };
        }
    }
}
