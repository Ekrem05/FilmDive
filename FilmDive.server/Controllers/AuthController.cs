using FilmDive.Server.Data;
using FilmDive.Server.Services.Token;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FilmDive.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserContext _userContext;
        private readonly ITokenService _tokenService;

        public AuthController(UserContext userContext, ITokenService tokenService)
        {
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
            _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] LoginViewModel loginModel)
        {
            if (loginModel is null)
            {
                return BadRequest("Invalid client request");
            }

            var user = _userContext.Logins.FirstOrDefault(u =>
                (u.UserName == loginModel.UserName) && (u.Password == loginModel.Password));
            if (user is null)
                return Unauthorized();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, loginModel.UserName)
            };
            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            _userContext.SaveChanges();

            return Ok(new AuthenticatedResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken
            });
        }
    }
}
