namespace FilmDive.Server.ViewModels.Series
{
    public class BrowseShows
    {
        public string SortBy { get; set; } = string.Empty;
        public int Year { get; set; }
        public int FromYear { get; set; }
        public int ToYear { get; set; }
        public double FromRating { get; set; }
        public double ToRating { get; set; }
        public int[]? WithGenres { get; set; }
        public int[]? WithCast { get; set; }

        public int Page { get; set; }
    }
}
