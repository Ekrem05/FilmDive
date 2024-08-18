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
        public async Task<ApiResponse<AuthenticatedResponse>> AddToWatchlist([FromBody] WatchlistItem model,string genre)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier);
            await userService.SaveToWatchlist(model, int.Parse(id.Value),genre);
            return new ApiResponse<AuthenticatedResponse>()
            {
                Status = 200
            };
        }
        [HttpDelete, Route("watchlist/{genre}")]
        public async Task<ApiResponse<AuthenticatedResponse>> DeleteFromWatchlist([FromBody] string Id, string genre)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier);
            await userService.DeleteFromWatchlist(Id, int.Parse(id.Value),genre);
            return new ApiResponse<AuthenticatedResponse>()
            {
                Status = 200
            };
        }

        [HttpGet, Route("watchlist")]
        public async Task<ApiResponse<UserWatchlist>> GetWatchlist()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier);
            var data = await userService.GetWatchlist(int.Parse(id.Value));
            return new ApiResponse<UserWatchlist>()
            {
                Status = 200,
                Data = data
            };
        }
    }
}
