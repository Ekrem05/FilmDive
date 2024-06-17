using FilmDive.Server.Services.MovieClient;
using FilmDive.Server.Services.Movies;
using FilmDive.Server.ViewModels.Movie;
using Newtonsoft.Json;

namespace FilmDive.Server.Services.Movie
{
    public class MovieService : IMovieService
    {
        private readonly IMovieClientService movieClientService;
        private readonly IConfiguration configuration;

        public MovieService(IMovieClientService _movieClientService, IConfiguration _configuration)
        {
            movieClientService = _movieClientService;
            configuration= _configuration;
        }

        public async Task<IEnumerable<TrendingMovie>> GetTrendingMoviesAsync()
        {
            string body = await movieClientService
                .SendRequestAsync("https://api.themoviedb.org/3/trending/movie/day?language=en-US", GetApiKey());
            var movies=JsonConvert.DeserializeObject<ApiMoviesRepsone<TrendingMovie>>(body);

            return movies.Result;
            
        }


        public async Task<IEnumerable<TrendingMovie>> GetMostPopularMoviesAsync()
        {
            string body = await movieClientService
               .SendRequestAsync("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", GetApiKey());
            var movies = JsonConvert.DeserializeObject<ApiMoviesRepsone<TrendingMovie>>(body);

            return movies.Result;
        }

        public async Task<IEnumerable<TrendingMovie>> GetUpcomingMoviesAsync()
        {
            string body = await movieClientService
               .SendRequestAsync("https://api.themoviedb.org/3/movie/upcoming", GetApiKey());
            var movies = JsonConvert.DeserializeObject<ApiMoviesRepsone<TrendingMovie>>(body);

            return movies.Result;
        }

        private string GetApiKey()
        {
            return configuration.GetValue<string>("FilmDive");
        }

       
    }
}
