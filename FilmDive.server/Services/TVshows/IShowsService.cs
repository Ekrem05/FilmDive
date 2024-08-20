using FilmDive.Server.ViewModels.Movie;
using FilmDive.Server.ViewModels.Series;

namespace FilmDive.Server.Services.TVshows
{
    public interface ISeriesService
    {
        Task<IEnumerable<SeriesViewModel>> GetPopularSeriesAsync();

        Task<IEnumerable<SeriesViewModel>> GetAiringTodayAsync();
        Task<IEnumerable<SeriesViewModel>> GetRecommendationsAsync(string id);
        Task<MovieApiResponse<SeriesViewModel>> BrowseAsync(BrowseSeries model);
        Task<IEnumerable<SeriesViewModel>> GetOnTheAirAsync();
        Task<IEnumerable<Genre>> GetGenresAsync();

        
        Task<SeriesDetails> GetDetailsAsync(string id, int? userId=null);
    }
}
