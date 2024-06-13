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

        [HttpGet(Name ="trending")]
        public async Task<IActionResult> GetTrendingMovies()
        {
            return Ok(await movieService.GetTrendingMoviesAsync());
        }
    }
}
