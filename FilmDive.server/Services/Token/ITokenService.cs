using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.Token;
using System.Security.Claims;

namespace FilmDive.Server.Services.Token
{
    public interface ITokenService
    {
        string GenerateAccessToken(IEnumerable<Claim> claims);
        string GenerateRefreshToken();
        Task<AuthenticatedResponse> RefreshAsync(TokenApiModel model);
        Task RevokeAsync(string username);
    }
}
