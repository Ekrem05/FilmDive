using FilmDive.Server.Infrastructure.Data.Models;
using FilmDive.Server.ViewModels.User;

namespace FilmDive.Server.Repositories.UserMoviesRepo
{
    public interface IUserMovieRepository
    {
        Task SaveToWatchlist(WatchlistItem model,int userId);
        Task DeleteFromWatchlist(string movieId, int userId);
        Task<bool> IsSaved(string movieId, int? userId);
        Task<IEnumerable<UserMovie>> GetByUser(int userId);

    }
}
