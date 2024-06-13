using FilmDive.Server.ViewModels.Movie;

namespace FilmDive.Server.Services.Movies
{
    public interface IMovieService
    {
        Task<IEnumerable<TrendingMovie>>GetTrendingMoviesAsync();
    }
}
