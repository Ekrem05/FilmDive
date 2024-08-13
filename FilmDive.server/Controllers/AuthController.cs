using FilmDive.Server.Services.UserServiceFolder;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.Token;
using FilmDive.Server.ViewModels.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FilmDive.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController(IUserService userService) : ControllerBase
    {
        [HttpPost, Route("signup")]
        public async Task<ApiResponse<AuthenticatedResponse>> Signup([FromBody] SignupViewModel signupViewModel)
        {
            var data = await userService.SignUpAsync(signupViewModel);
            return new ApiResponse<AuthenticatedResponse>()
            {
                Status = 200,
                Data = data
            };
        }

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

        [HttpGet,Route("user/{accessToken}")]
        public async Task<ApiResponse<UserDetails>> UserData([FromRoute] string accessToken)
        {
            var data = await userService.GetAsync(accessToken);
            return new ApiResponse<UserDetails>()
            {
                Status = 200,
                Data = data
            };
        }

    }
}
