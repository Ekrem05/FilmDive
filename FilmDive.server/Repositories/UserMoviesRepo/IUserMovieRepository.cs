using FilmDive.Server.ViewModels.User;

namespace FilmDive.Server.Repositories.UserMoviesRepo
{
    public interface IUserMovieRepository
    {
        Task SaveToWatchlist(Watchlist model,int userId);
        Task DeleteFromWatchlist(string movieId, int userId);
        Task<bool> IsSaved(string movieId, int? userId);

    }
}
