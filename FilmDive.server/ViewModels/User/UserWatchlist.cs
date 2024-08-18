

namespace FilmDive.Server.ViewModels.User
{
    public class UserWatchlist
    {
        public IEnumerable<WatchlistItem> Movies { get; set; }
        public IEnumerable<WatchlistItem> Series { get; set; }
    }
}
