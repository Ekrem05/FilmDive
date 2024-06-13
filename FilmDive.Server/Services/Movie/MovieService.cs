using FilmDive.Server.Services.Movies;
using FilmDive.Server.ViewModels.Movie;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace FilmDive.Server.Services.Movie
{
    public class MovieService : IMovieService
    {
        private readonly HttpClient client;
        private readonly IConfiguration configuration;

        public MovieService(HttpClient _httpClient,IConfiguration _configuration)
        {
            client = _httpClient;
            configuration= _configuration;
        }

        public async Task<IEnumerable<TrendingMovie>> GetTrendingMoviesAsync()
        {
            string? key=configuration.GetValue<string>("FilmDive");

            HttpRequestMessage request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"),
                Headers =
               {
                    { "accept", "application/json" },
                    { "Authorization", $"Bearer {key}" },
               }

            };
            var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
            var movies=JsonConvert.DeserializeObject<ApiMoviesRepsone<TrendingMovie>>(body);
            return movies.Result;
            
        }
    }
}
