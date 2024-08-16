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
            return Ok(await seriesService.GetPopularSeriesAsync());
        }

        [HttpGet("airing")]
        public async Task<IActionResult> GetAiringTvSeries()
        {
            return Ok(await seriesService.GetOnTheAirAsync());
        }
        [HttpGet("recommend")]
        public async Task<IActionResult> GetRecomendations(string id)
        {
            return Ok(await seriesService.GetRecommendationsAsync(id));
        }
        [HttpGet("airing-today")]
        public async Task<IActionResult> GetAiringTodayTvSeries()
        {
            return Ok(await seriesService.GetAiringTodayAsync());
        }
        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            return Ok(await seriesService.GetGenresAsync());
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
            return Ok(await seriesService.BrowseAsync(model));
        }
    }
}
