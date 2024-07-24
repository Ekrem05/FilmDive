using FilmDive.Server.Infrastructure.Attributes;
using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Movie
{
    public class TrendingMovie
    {
        [JsonProperty("id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty("backdrop_path")]
        public string BackdropPath { get; set; } = string.Empty;

        [JsonProperty("title")]
        public string Title { get; set; } = string.Empty;

        [JsonProperty("overview")]
        public string Overview { get; set; } = string.Empty;

        [JsonProperty("poster_path")]
        public string PosterPath { get; set; } = string.Empty;

        [JsonProperty("release_date")]
        [JsonConverter(typeof(YearOnlyDateConverter))]
        public int ReleaseYear { get; set; }

        [JsonProperty("vote_average")]
        [JsonConverter(typeof(OneDecimalPlaceConverter))]
        public decimal VoteAverage { get; set; }
    }
}
