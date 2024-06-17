using FilmDive.Server.Attributes;
using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Movie
{
    public class MovieDetails
    {
        public int Id { get; set; }

        public bool Adult { get; set; }

        [JsonProperty("backdrop_path")]
        public string BackdropPath { get; set; }

        public string Title { get; set; }

        public int Budget { get; set; }

        public List<Genre> Genres { get; set; }

        public string Homepage { get; set; }

        [JsonProperty("imdb_id")]
        public string ImdbId { get; set; }

        [JsonProperty("origin_country")]
        public List<string> OriginCountry { get; set; }

        [JsonProperty("original_language")]
        public string OriginalLanguage { get; set; }

        [JsonProperty("poster_path")]
        public string PosterPath { get; set; }

        [JsonProperty("production_companies")]
        public List<ProductionCompany> ProductionCompanies { get; set; }

        public string Overview { get; set; }

        [JsonProperty("release_date")]
        public string ReleaseDate { get; set; }

        public long Revenue { get; set; }
        public int Runtime { get; set; }
        public string Status { get; set; }

        public Credit Credits { get; set; }

    }
}
