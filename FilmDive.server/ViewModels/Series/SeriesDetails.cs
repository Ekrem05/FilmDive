using FilmDive.Server.Infrastructure.Attributes;
using FilmDive.Server.ViewModels.Movie;
using FilmDive.Server.ViewModels.Movie.VideoDtos;
using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Series
{
    public class SeriesDetails
    {
        public int Id { get; set; }


        [JsonProperty("backdrop_path")]
        public string BackdropPath { get; set; } = string.Empty;

        public bool IsSaved { get; set; }

        [JsonProperty("first_air_date")]
        public DateTime FirstAirDate { get; set; }

        [JsonProperty("last_air_date")]
        public DateTime LastAirDate { get; set; } 

        [JsonProperty("name")]
        public string Title { get; set; } = string.Empty;

        public int Budget { get; set; }

        public List<Genre> Genres { get; set; } = new List<Genre>();

        public string Homepage { get; set; } = string.Empty;

        [JsonProperty("imdb_id")]
        public string ImdbId { get; set; } = string.Empty;

        [JsonProperty("origin_country")]
        public List<string> OriginCountry { get; set; } = new List<string>();

        [JsonProperty("original_language")]
        public string OriginalLanguage { get; set; } = string.Empty;

        [JsonProperty("poster_path")]
        public string PosterPath { get; set; } = string.Empty;

        [JsonProperty("production_companies")]
        public List<ProductionCompany> ProductionCompanies { get; set; } = new List<ProductionCompany>();

        public string Overview { get; set; } = string.Empty;

        [JsonProperty("release_date")]
        public string ReleaseDate { get; set; } = string.Empty;

        [JsonProperty("vote_average")]
        [JsonConverter(typeof(OneDecimalPlaceConverter))]
        public decimal VoteAverage { get; set; }

        public string Status { get; set; } = string.Empty;

        public Credit Credits { get; set; } = new Credit();

        public List<Video> Videos { get; set; } = new List<Video>();

    }
}
