using FilmDive.Server.ViewModels.Movie;

namespace FilmDive.Server.Services.Movies
{
    public interface IMovieService
    {
        Task<IEnumerable<MovieViewModel>> GetNowPlayingAsync();

        Task<IEnumerable<MovieViewModel>> GetTrendingAsync();
        Task<IEnumerable<MovieViewModel>> GetMostPopularAsync();
        Task<IEnumerable<Genre>> GetGenresAsync();

        Task<IEnumerable<MovieViewModel>> GetUpcomingAsync();
        Task<MovieDetails> GetDetailsAsync(string id, int? userId=null);
        Task<IEnumerable<MovieViewModel>> GetRecommendationsAsync(string id);
        Task<MovieApiResponse<MovieViewModel>> BrowseAsync(MovieBrowse model);
    }
}
