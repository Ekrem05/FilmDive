namespace FilmDive.Server.ViewModels.User
{
    public class Watchlist
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public DateOnly? Date { get; set; }
        public double Rating { get; set; }
    }
}
