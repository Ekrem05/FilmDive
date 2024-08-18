namespace FilmDive.Server.ViewModels.User
{
    public class WatchlistItem
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public DateOnly? ReleaseDate { get; set; }
        public double VoteAverage { get; set; }
        public string PosterPath { get; set; } = string.Empty;
    }
}
