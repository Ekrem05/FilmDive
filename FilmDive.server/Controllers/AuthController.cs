using FilmDive.Server.Services.UserServiceFolder;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.User;
using Microsoft.AspNetCore.Mvc;

namespace FilmDive.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController(IUserService userService) : ControllerBase
    {
        [HttpPost, Route("signup")]
        public async Task<ApiResponse<AuthenticatedResponse>> Signup([FromBody] UserViewModel loginModel)
        {
            var data = await userService.SignInAsync(loginModel);
            return new ApiResponse<AuthenticatedResponse>()
            {
                Status = 200,
                Data = data
            };
        }
        [HttpPost, Route("login")]
        public async Task<ApiResponse<AuthenticatedResponse>> Login([FromBody] UserViewModel loginModel)
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
