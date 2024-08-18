using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Search
{
    public class SeriesSearch
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        [JsonProperty("first_air_date")]
        public DateTime? FirstAirDate { get; set; }

        [JsonProperty("poster_path")]
        public string PosterPath { get; set; } = string.Empty;
    }
}
