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
    public class UserController : ControllerBase
    {
        [HttpPost, Route("watchlist")]
        public async Task<ApiResponse<AuthenticatedResponse>> Watchlist()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier);
            return new ApiResponse<AuthenticatedResponse>()
            {
                Status = 200
            };
        }
    }
}
