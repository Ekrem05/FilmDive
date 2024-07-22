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
        public async Task<IEnumerable<Genre>> GetGenresAsync()
        {
           string body = await movieClientService
               .SendRequestAsync("https://api.themoviedb.org/3/genre/movie/list", GetApiKey());
            var genresResponse = JsonConvert.DeserializeObject<GenresResponse>(body);

            return genresResponse.Genres;
        }

        public async Task<MovieDetails> GetDetailsAsync(string id)
        {
            var movieDetailsReq = await movieClientService.SendRequestAsync($"https://api.themoviedb.org/3/movie/{id}?language=en-US", GetApiKey());
            var movie = JsonConvert.DeserializeObject<MovieDetails>(movieDetailsReq);
            var creditsReq = await movieClientService.SendRequestAsync($"https://api.themoviedb.org/3/movie/{id}/credits?language=en-US", GetApiKey());
            var credits = JsonConvert.DeserializeObject<Credit>(creditsReq);
            movie.ProductionCompanies=movie.ProductionCompanies.Take(7).ToList();
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

        public async Task<ApiMoviesRepsone<TrendingMovie>> BrowseAsync(MovieBrowse model){
          
            var baseUrl = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US";
            var queryParams = new List<string>();

            // Add parameters conditionally based on model values
            if (model.Page > 0)
            {
                queryParams.Add($"page={model.Page}");
            }

            if (model.FromYear > 0)
            {
                queryParams.Add($"primary_release_date.gte={model.FromYear}-01-01");
            }

            if (model.ToYear > 0)
            {
                queryParams.Add($"primary_release_date.lte={model.ToYear}-01-01");
            }

            if (!string.IsNullOrEmpty(model.SortBy))
            {
                queryParams.Add($"sort_by={model.SortBy}");
            }

            if (model.FromRating > 0)
            {
                queryParams.Add($"vote_average.gte={model.FromRating}");
            }

            if (model.ToRating > 0)
            {
                queryParams.Add($"vote_average.lte={model.ToRating}");
            }
             string genres= string.Join("%2C",model.WithGenres);
            if (!string.IsNullOrEmpty(genres))
            {
                queryParams.Add($"with_genres={genres}");
            }

            // Combine base URL with query parameters
            var queryString = string.Join("&", queryParams);
            var requestUrl = $"{baseUrl}&{queryString}";

            // Send the request
            var searchRequest = await movieClientService.SendRequestAsync(requestUrl, GetApiKey());
            var movies = JsonConvert.DeserializeObject<ApiMoviesRepsone<TrendingMovie>>(searchRequest);
            return movies;
        }

        public async Task<IEnumerable<TrendingMovie>> GetRecomendationsAsync(string id)
        {
             string body = await movieClientService
               .SendRequestAsync($"https://api.themoviedb.org/3/movie/{id}/recommendations", GetApiKey());
            var movies = JsonConvert.DeserializeObject<ApiMoviesRepsone<TrendingMovie>>(body);

            return movies.Result;
        }

        private string GetApiKey()
        {
            return configuration.GetValue<string>("FilmDive");
        }

        
    }
}
