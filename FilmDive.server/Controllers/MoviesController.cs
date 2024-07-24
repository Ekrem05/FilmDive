using FilmDive.Server.Services.Movies;
using FilmDive.Server.ViewModels.Movie;
using Microsoft.AspNetCore.Authorization;
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
        [HttpGet("popular"), Authorize]
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
        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            return Ok(await movieService.GetGenresAsync());
        }
        [HttpPost("browse")]
        public async Task<IActionResult> BrowseMovies([FromBody] MovieBrowse request)
        {
            return Ok(await movieService.BrowseAsync(request));
        }
    }
}
