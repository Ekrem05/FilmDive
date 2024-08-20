using FilmDive.Server.Services.Movies;
using FilmDive.Server.Services.UserServiceFolder;
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
            var data = await movieService.GetMostPopularAsync();
            return new ApiResponse<IEnumerable<TrendingMovie>>()
            {
                Status = 200,
                Data = data
            };
        }

        [HttpGet("trending")]
        public async Task<IActionResult> GetTrendingMovies()
        {
            var data = await movieService.GetTrendingAsync();
            return new ApiResponse<IEnumerable<TrendingMovie>>()
            {
                Status = 200,
                Data = data
            };
        }

        [HttpGet("now-playing")]
        public async Task<IActionResult> GetNowPlayingAsync()
        {
            var data = await movieService.GetNowPlayingAsync();
            return new ApiResponse<IEnumerable<TrendingMovie>>()
            {
                Status = 200,
                Data = data
            };
        }

        [HttpGet("upcoming")]
        public async Task<IActionResult> GetUpcomingMovies()
        {
            var data = await movieService.GetUpcomingAsync();
            return new ApiResponse<IEnumerable<TrendingMovie>>()
            {
                Status = 200,
                Data = data
            };
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
            var data = await movieService.GetRecommendationsAsync(id);
            return new ApiResponse<IEnumerable<TrendingMovie>>()
            {
                Status = 200,
                Data = data
            };
        }
        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            var data = await movieService.GetGenresAsync();
            return new ApiResponse<IEnumerable<Genre>>()
            {
                Status = 200,
                Data = data
            };
        }
        [HttpGet("browse")]
        public async Task<IActionResult> BrowseMovies([FromQuery] MovieBrowse request)
        {
            var data = await movieService.BrowseAsync(request);
            return new ApiResponse<MovieApiResponse<TrendingMovie>>()
            {
                Status = 200,
                Data = data
            };
        }
    }
}
