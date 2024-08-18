namespace FilmDive.Server.ViewModels.Search
{
    public class SearchParams
    {
        public string Keyword { get; set; } = string.Empty;
        public bool OnlyMovies { get; set; } = false;
        public bool OnlySeries { get; set; } = false;
        public bool OnlyPeople { get; set; } = false;

    }
}
