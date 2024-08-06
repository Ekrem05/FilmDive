using FilmDive.Server.ViewModels.Movie;
using FilmDive.Server.ViewModels.Series;

namespace FilmDive.Server.Services.TVshows
{
    public interface IShowsService
    {
        Task<IEnumerable<PopularShows>> GetPopularSeriesAsync();

        Task<IEnumerable<PopularShows>> GetAiringTodayAsync();
        Task<IEnumerable<PopularShows>> GetRecommendationsAsync(string id);
        Task<ApiRepsone<PopularShows>> BrowseAsync(BrowseShows model);
        Task<IEnumerable<PopularShows>> GetOnTheAirAsync();

        Task<MovieDetails> GetDetailsAsync(string id);
    }
}
