using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Search
{
    public class SearchMovie
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty; 

        [JsonProperty("release_date")]
        public DateTime? ReleaseDate { get; set; }

        [JsonProperty("poster_path")]
        public string PosterPath { get; set; } = string.Empty;
    }
}
