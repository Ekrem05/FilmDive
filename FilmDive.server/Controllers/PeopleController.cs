using FilmDive.Server.Services.Movie;
using FilmDive.Server.Services.People;
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
            return Ok(await peopleService.GetPopularAsync());
        }
    }
}
