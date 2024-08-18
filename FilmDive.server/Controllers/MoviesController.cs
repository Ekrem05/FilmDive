using FilmDive.Server.Services.Movies;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.Movie;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
namespace FilmDive.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MoviesController(IMovieService movieService) : ControllerBase
    {

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

        [HttpGet("now-playing")]
        public async Task<IActionResult> GetNowPlayingAsync()
        {
            return Ok(await movieService.GetNowPlayingAsync());
        }

        [HttpGet("upcoming")]
        public async Task<IActionResult> GetUpcomingMovies()
        {
            return Ok(await movieService.GetUpcomingAsync());
        }
        [HttpGet("details")]
        public async Task<IActionResult> GetMovieDetails(string id)
        {

            bool isAuth = User.Identity.IsAuthenticated;
            var data = await movieService.GetDetailsAsync(id, isAuth ? int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) : null);

            return new ApiResponse<MovieDetails>()
            {
                Status = 200,
                Data = data
            };
        }

        [HttpGet("recommend")]
        public async Task<IActionResult> GetRecommendationsAsync(string id)
        {
            return Ok(await movieService.GetRecommendationsAsync(id));
        }
        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            return Ok(await movieService.GetGenresAsync());
        }
        [HttpGet("browse")]
        public async Task<IActionResult> BrowseMovies([FromQuery] MovieBrowse request)
        {
            return Ok(await movieService.BrowseAsync(request));
        }
    }
}
