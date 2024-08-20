using FilmDive.Server.Services.Movie;
using FilmDive.Server.Services.Movies;
using FilmDive.Server.Services.TVshows;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.Movie;
using FilmDive.Server.ViewModels.Series;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FilmDive.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SeriesController(ISeriesService seriesService) : ControllerBase
    {
        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularTvSeries()
        {
            var data = await seriesService.GetPopularSeriesAsync();
            return new ApiResponse<IEnumerable<SeriesViewModel>>()
            {
                Status = 200,
                Data = data
            };
        }

        [HttpGet("airing")]
        public async Task<IActionResult> GetAiringTvSeries()
        {
            var data = await seriesService.GetOnTheAirAsync();
            return new ApiResponse<IEnumerable<SeriesViewModel>>()
            {
                Status = 200,
                Data = data
            };
        }
        [HttpGet("recommend")]
        public async Task<IActionResult> GetRecomendations(string id)
        {
            var data = await seriesService.GetRecommendationsAsync(id);
            return new ApiResponse<IEnumerable<SeriesViewModel>>()
            {
                Status = 200,
                Data = data
            };
        }
        [HttpGet("airing-today")]
        public async Task<IActionResult> GetAiringTodayTvSeries()
        {
            var data = await seriesService.GetAiringTodayAsync();
            return new ApiResponse<IEnumerable<SeriesViewModel>>()
            {
                Status = 200,
                Data = data
            };
        }
        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            var data = await seriesService.GetGenresAsync();
            return new ApiResponse<IEnumerable<Genre>>()
            {
                Status = 200,
                Data = data
            };
        }
        [HttpGet("details")]
        public async Task<IActionResult> GetShowDetails(string id)
        {
            bool isAuth = User.Identity.IsAuthenticated;
            var data = await seriesService.GetDetailsAsync(id, isAuth ? int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) : null);
            return new ApiResponse<SeriesDetails>()
            {
                Status = 200,
                Data = data
            };
        }

        [HttpGet("browse")]
        public async Task<IActionResult> BrowseTvSeries([FromQuery] BrowseSeries model)
        {
            var data = await seriesService.BrowseAsync(model);
            return new ApiResponse<MovieApiResponse<SeriesViewModel>>()
            {
                Status = 200,
                Data = data
            };
        }
    }
}
