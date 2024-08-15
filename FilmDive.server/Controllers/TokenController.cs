using FilmDive.Server.Services.Token;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.Token;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FilmDive.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TokenController(ITokenService tokenService) : ControllerBase
    {

        [HttpPost]
        [Route("refresh")]
        public async Task<ApiResponse<AuthenticatedResponse>> Refresh([FromQuery] TokenApiModel tokenApiModel)
        {
            var data = await tokenService.RefreshAsync(tokenApiModel);
            return new ApiResponse<AuthenticatedResponse>()
            {
                Status = 200,
                Data = data
            };
        }

        [HttpPost, Authorize]
        [Route("revoke")]
        public async Task<ApiResponse<string>> Revoke()
        {
            await tokenService.RevokeAsync(User.Identity.Name);
            return new ApiResponse<string>()
            {
                Status = 200,
            };
        }
    }
}
