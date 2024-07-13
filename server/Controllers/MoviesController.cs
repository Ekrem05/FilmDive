using FilmDive.Server.Services.Movies;
using Microsoft.AspNetCore.Mvc;

namespace FilmDive.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService movieService;

        public MoviesController(IMovieService _movieService)
        {
            movieService = _movieService;
        }
        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularMovies()
        {
            return Ok(await movieService.GetMostPopularAsync());
        }

        [HttpGet("trending")]
        public async Task<IActionResult> GetTrendingMovies()
        {
            return Ok(await movieService.GetTrendingAsync());
        }

        [HttpGet("upcoming")]
        public async Task<IActionResult> GetUpcomingMovies()
        {
            return Ok(await movieService.GetUpcomingAsync());
        }
        [HttpGet("details")]
        public async Task<IActionResult> GetMovieDetails(string id)
        {
            return Ok(await movieService.GetDetailsAsync(id));
        }
        [HttpGet("recommend")]
        public async Task<IActionResult> GetRecomendations(string id)
        {
            return Ok(await movieService.GetRecomendationsAsync(id));
        }
    }
}
