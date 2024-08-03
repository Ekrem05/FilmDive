using FilmDive.Server.Services.Movie;
using FilmDive.Server.Services.Movies;
using FilmDive.Server.Services.TVshows;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FilmDive.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ShowsController(IShowsService showsService) : ControllerBase
    {
        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularTvShows()
        {
            return Ok(await showsService.GetPopularSeriesAsync());
        }

        [HttpGet("airing")]
        public async Task<IActionResult> GetAiringTvShows()
        {
            return Ok(await showsService.GetOnTheAirAsync());
        }
        [HttpGet("recommend")]
        public async Task<IActionResult> GetRecomendations(string id)
        {
            return Ok(await showsService.GetRecommendationsAsync(id));
        }
        [HttpGet("airing-today")]
        public async Task<IActionResult> GetAiringTodayTvShows()
        {
            return Ok(await showsService.GetAiringTodayAsync());
        }

        [HttpGet("details")]
        public async Task<IActionResult> GetShowDetails(string id)
        {
            return Ok(await showsService.GetDetailsAsync(id));
        }
    }
}
