namespace FilmDive.Server.ViewModels.Movie
{
    public class MovieBrowse
    {
        public string SortBy { get; set; } = string.Empty;
        public int Year { get; set; }
        public int FromYear { get; set; }
        public int ToYear { get; set; }
        public int FromRating { get; set; }
        public int ToRating { get; set; }
        public int[]? WithGenres { get; set; }
        public int[]? WithCast { get; set; }

        public int Page { get; set; }

    }
}
