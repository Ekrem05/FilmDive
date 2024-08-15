using FilmDive.Server.Services.UserServiceFolder;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FilmDive.Server.Controllers
{
    
    [Route("[controller]")]
    [ApiController,Authorize]
    public class UserController(IUserService userService) : ControllerBase
    {
        [HttpPost, Route("watchlist/{genre}")]
        public async Task<ApiResponse<AuthenticatedResponse>> Watchlist([FromBody] Watchlist model,string genre)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier);
            await userService.SaveToWatchlist(model, int.Parse(id.Value));
            return new ApiResponse<AuthenticatedResponse>()
            {
                Status = 200
            };
        }
    }
}
