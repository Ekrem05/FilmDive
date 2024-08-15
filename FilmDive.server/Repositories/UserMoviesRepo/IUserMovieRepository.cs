using FilmDive.Server.ViewModels.User;

namespace FilmDive.Server.Repositories.UserMoviesRepo
{
    public interface IUserMovieRepository
    {
        Task SaveToWatchlist(Watchlist model,int userId);
    }
}
