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
            return Ok(await movieService.GetMostPopularMoviesAsync());
        }

        [HttpGet("trending")]
        public async Task<IActionResult> GetTrendingMovies()
        {
            return Ok(await movieService.GetTrendingMoviesAsync());
        }

        [HttpGet("upcoming")]
        public async Task<IActionResult> GetUpcomingMovies()
        {
            return Ok(await movieService.GetUpcomingMoviesAsync());
        }
    }
}
