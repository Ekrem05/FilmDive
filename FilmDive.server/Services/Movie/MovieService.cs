﻿using FilmDive.Server.Repositories.UserMoviesRepo;
using FilmDive.Server.Services.MovieClient;
using FilmDive.Server.Services.Movies;
using FilmDive.Server.ViewModels.Movie;
using FilmDive.Server.ViewModels.Movie.VideoDtos;
using Newtonsoft.Json;

namespace FilmDive.Server.Services.Movie
{
    public class MovieService(IMovieClientService movieClientService,
        IConfiguration configuration,
        IUserMovieRepository userMovieRepository) : IMovieService
    {

        public async Task<IEnumerable<MovieViewModel>> GetTrendingAsync()
        {
            string body = await movieClientService
                .SendRequestAsync("https://api.themoviedb.org/3/trending/movie/day?language=en-US", GetApiKey());
            var movies = JsonConvert.DeserializeObject<MovieApiResponse<MovieViewModel>>(body);

            return movies.Result;

        }


        public async Task<IEnumerable<MovieViewModel>> GetMostPopularAsync()
        {
            string body = await movieClientService
               .SendRequestAsync("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", GetApiKey());
            var movies = JsonConvert.DeserializeObject<MovieApiResponse<MovieViewModel>>(body);

            return movies.Result;
        }

        public async Task<IEnumerable<MovieViewModel>> GetUpcomingAsync()
        {
            string body = await movieClientService
               .SendRequestAsync("https://api.themoviedb.org/3/movie/upcoming", GetApiKey());
            var movies = JsonConvert.DeserializeObject<MovieApiResponse<MovieViewModel>>(body);

            return movies.Result;
        }
        public async Task<IEnumerable<MovieViewModel>> GetNowPlayingAsync()
        {
            string body = await movieClientService
              .SendRequestAsync("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", GetApiKey());
            var movies = JsonConvert.DeserializeObject<MovieApiResponse<MovieViewModel>>(body);

            return movies.Result;
        }
        public async Task<IEnumerable<Genre>> GetGenresAsync()
        {
            string body = await movieClientService
                .SendRequestAsync("https://api.themoviedb.org/3/genre/movie/list", GetApiKey());
            var genresResponse = JsonConvert.DeserializeObject<GenresResponse>(body);

            return genresResponse.Genres;
        }

        public async Task<MovieDetails> GetDetailsAsync(string id,int? userId = null)
        {
            var movieDetailsReq = await movieClientService.SendRequestAsync($"https://api.themoviedb.org/3/movie/{id}?language=en-US", GetApiKey());
            var movie = JsonConvert.DeserializeObject<MovieDetails>(movieDetailsReq);
            var creditsReq = await movieClientService.SendRequestAsync($"https://api.themoviedb.org/3/movie/{id}/credits?language=en-US", GetApiKey());
            var credits = JsonConvert.DeserializeObject<Credit>(creditsReq);
            movie.ProductionCompanies = movie.ProductionCompanies.Take(7).ToList();
            movie.Credits = new Credit()
            {
                Id = credits.Id,
                Cast = credits.Cast.Where(cast => cast.Department == "Acting").Take(20).ToList(),
                Crew = credits.Crew.Where(crew => crew.Department == "Production" || crew.Department == "Directing").Take(5).ToList()
            };
            var videosReq = await movieClientService.SendRequestAsync($"https://api.themoviedb.org/3/movie/{id}/videos?language=en-US", GetApiKey());
            var videos = JsonConvert.DeserializeObject<VideoRoot>(videosReq);
            movie.Videos = videos.Videos.Where(video => video.Site == "YouTube").ToList();
           if(userId is not null)
            {
                movie.IsSaved = await userMovieRepository.IsSaved(id, userId);
            }

            return movie;
        }
      
        public async Task<MovieApiResponse<MovieViewModel>> BrowseAsync(MovieBrowse model)
        {

            var baseUrl = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US";
            var queryParams = new List<string>();

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
            if(model.WithGenres is not null)
            {
                string genres = string.Join("%2C", model.WithGenres);
                if (!string.IsNullOrEmpty(genres))
                {
                    queryParams.Add($"with_genres={genres}");
                }
            }
            if(model.WithCast is not null)
            {
                string cast = string.Join("%2C", model.WithCast);
                if (!string.IsNullOrEmpty(cast))
                {
                    queryParams.Add($"with_people={cast}");
                }
            }
           
            var queryString = string.Join("&", queryParams);
            var requestUrl = $"{baseUrl}&{queryString}";

            var searchRequest = await movieClientService.SendRequestAsync(requestUrl, GetApiKey());
            var movies = JsonConvert.DeserializeObject<MovieApiResponse<MovieViewModel>>(searchRequest);
            return movies;
        }

        public async Task<IEnumerable<MovieViewModel>> GetRecommendationsAsync(string id)
        {
            string body = await movieClientService
              .SendRequestAsync($"https://api.themoviedb.org/3/movie/{id}/recommendations", GetApiKey());
            var movies = JsonConvert.DeserializeObject<MovieApiResponse<MovieViewModel>>(body);

            return movies.Result;
        }

        private string GetApiKey()
        {
            return configuration.GetValue<string>("FilmDive");
        }

       
    }
}
