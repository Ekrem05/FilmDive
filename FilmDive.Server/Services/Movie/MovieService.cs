using FilmDive.Server.Services.MovieClient;
using FilmDive.Server.Services.Movies;
using FilmDive.Server.ViewModels.Movie;
using FilmDive.Server.ViewModels.Movie.VideoDtos;
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

        public async Task<IEnumerable<TrendingMovie>> GetTrendingAsync()
        {
            string body = await movieClientService
                .SendRequestAsync("https://api.themoviedb.org/3/trending/movie/day?language=en-US", GetApiKey());
            var movies=JsonConvert.DeserializeObject<ApiMoviesRepsone<TrendingMovie>>(body);

            return movies.Result;
            
        }


        public async Task<IEnumerable<TrendingMovie>> GetMostPopularAsync()
        {
            string body = await movieClientService
               .SendRequestAsync("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", GetApiKey());
            var movies = JsonConvert.DeserializeObject<ApiMoviesRepsone<TrendingMovie>>(body);

            return movies.Result;
        }

        public async Task<IEnumerable<TrendingMovie>> GetUpcomingAsync()
        {
            string body = await movieClientService
               .SendRequestAsync("https://api.themoviedb.org/3/movie/upcoming", GetApiKey());
            var movies = JsonConvert.DeserializeObject<ApiMoviesRepsone<TrendingMovie>>(body);

            return movies.Result;
        }


        public async Task<MovieDetails> GetDetailsAsync(string id)
        {
            var movieDetailsReq = await movieClientService.SendRequestAsync($"https://api.themoviedb.org/3/movie/{id}?language=en-US", GetApiKey());
            var movie = JsonConvert.DeserializeObject<MovieDetails>(movieDetailsReq);
            var creditsReq = await movieClientService.SendRequestAsync($"https://api.themoviedb.org/3/movie/{id}/credits?language=en-US", GetApiKey());
            var credits = JsonConvert.DeserializeObject<Credit>(creditsReq);
            movie.Credits = new Credit()
            {
                Id = credits.Id,
                Cast = credits.Cast.Where(cast => cast.Department == "Acting").Take(20).ToList(),
                Crew = credits.Crew.Where(crew => crew.Department == "Production" || crew.Department == "Directing").Take(5).ToList()
            };
            var videosReq = await movieClientService.SendRequestAsync($"https://api.themoviedb.org/3/movie/{id}/videos?language=en-US", GetApiKey());
            var videos = JsonConvert.DeserializeObject<VideoRoot>(videosReq);
            movie.Videos = videos.Videos.Where(video=>video.Site== "YouTube").ToList();
            return movie;
        }

        private string GetApiKey()
        {
            return configuration.GetValue<string>("FilmDive");
        }

    }
}
