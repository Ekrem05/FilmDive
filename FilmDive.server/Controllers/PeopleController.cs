using FilmDive.Server.Services.Movie;
using FilmDive.Server.Services.Movies;
using FilmDive.Server.Services.People;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.Movie;
using FilmDive.Server.ViewModels.People;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace FilmDive.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PeopleController(IPeopleService peopleService) : ControllerBase
    {

        [HttpGet]
        public async Task<IActionResult> GetPeopleAsync()
        {
            var data = await peopleService.GetPopularAsync();
            return new ApiResponse<IEnumerable<Individual>>()
            {
                Status = 200,
                Data = data
            };
        }

        [HttpGet("search/{name}")]
        public async Task<IActionResult> SearchAsync(string name)
        {
            var data = await peopleService.SearchAsync(name);
            return new ApiResponse<IEnumerable<Individual>>()
            {
                Status = 200,
                Data = data
            };
        }
    }
}
