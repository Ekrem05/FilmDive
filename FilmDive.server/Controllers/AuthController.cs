using FilmDive.Server.Services.User;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.User;
using Microsoft.AspNetCore.Mvc;

namespace FilmDive.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IUserService userService) : ControllerBase
    {

        [HttpPost, Route("login")]
        public async Task<ApiResponse<AuthenticatedResponse>> Login([FromBody] LoginViewModel loginModel)
        {
            var data = await userService.LogInAsync(loginModel);
            return new ApiResponse<AuthenticatedResponse>()
            {
                Status = 200,
                Data = data
            };
        }
    }
}
