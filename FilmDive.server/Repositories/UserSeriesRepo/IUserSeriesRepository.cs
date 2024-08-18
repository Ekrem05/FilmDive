using FilmDive.Server.Infrastructure.Data.Models;
using FilmDive.Server.ViewModels.User;

namespace FilmDive.Server.Repositories.UserSeriesRepo
{
    public interface IUserSeriesRepository
    {
        Task SaveToWatchlist(WatchlistItem model, int userId);
        Task DeleteFromWatchlist(string seriesId, int userId);
        Task<bool> IsSaved(string seriesId, int? userId);
        Task<IEnumerable<UserSeries>> GetByUser(int userId);

    }
}
