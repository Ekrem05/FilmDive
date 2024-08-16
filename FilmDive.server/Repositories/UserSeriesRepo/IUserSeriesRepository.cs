using FilmDive.Server.ViewModels.User;

namespace FilmDive.Server.Repositories.UserSeriesRepo
{
    public interface IUserSeriesRepository
    {
        Task SaveToWatchlist(Watchlist model, int userId);
        Task DeleteFromWatchlist(string seriesId, int userId);
        Task<bool> IsSaved(string seriesId, int? userId);
    }
}
