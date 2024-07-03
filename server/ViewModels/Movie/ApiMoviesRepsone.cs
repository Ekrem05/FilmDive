using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Movie
{
    public class ApiMoviesRepsone<T>
    {
        [JsonProperty("page")]
        public int Page { get; set; }

        [JsonProperty("results")]
        public List<T> Result { get; set; } = new List<T>();

        [JsonProperty("total_pages")]
        public int TotalPages { get; set; }

        [JsonProperty("total_results")]
        public int TotalResults { get; set; }


    }
}
