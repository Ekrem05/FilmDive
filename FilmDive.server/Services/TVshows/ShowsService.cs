using FilmDive.Server.Services.MovieClient;
using FilmDive.Server.ViewModels.Movie;
using FilmDive.Server.ViewModels.Movie.VideoDtos;
using FilmDive.Server.ViewModels.Series;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace FilmDive.Server.Services.TVshows
{
    public class SeriesService(IMovieClientService movieClientService, IConfiguration configuration) : ISeriesService
    {
        public async Task<ApiRepsone<PopularSeries>> BrowseAsync(BrowseSeries model)
        {
            var baseUrl = "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1";
            var queryParams = new List<string>();

            if (model.Page > 0)
            {
                queryParams.Add($"page={model.Page}");
            }

            if (model.FromYear > 0)
            {
                queryParams.Add($"first_air_date.gte=={model.FromYear}-01-01");
            }

            if (model.ToYear > 0)
            {
                queryParams.Add($"first_air_date.lte={model.ToYear}-01-01");
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
            if (model.WithGenres is not null)
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
            var shows = JsonConvert.DeserializeObject<ApiRepsone<PopularSeries>>(searchRequest);
            return shows;
        }

        public async Task<IEnumerable<PopularSeries>> GetAiringTodayAsync()
        {
            string body = await movieClientService
               .SendRequestAsync("https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1", GetApiKey());
            var series = JsonConvert.DeserializeObject<ApiRepsone<PopularSeries>>(body);

            return series.Result;
        }

        public async Task<MovieDetails> GetDetailsAsync(string id)
        {
            var showDetailsReq = await movieClientService.SendRequestAsync($"https://api.themoviedb.org/3/tv/{id}?language=en-US", GetApiKey());
            var show = JsonConvert.DeserializeObject<MovieDetails>(showDetailsReq);
            var creditsReq = await movieClientService.SendRequestAsync($"https://api.themoviedb.org/3/tv/{id}/credits?language=en-US", GetApiKey());
            var credits = JsonConvert.DeserializeObject<Credit>(creditsReq);
            show.ProductionCompanies = show.ProductionCompanies.Take(7).ToList();
            show.Credits = new Credit()
            {
                Id = credits.Id,
                Cast = credits.Cast.Where(cast => cast.Department == "Acting").Take(20).ToList(),
                Crew = credits.Crew.Where(crew => crew.Department == "Production" || crew.Department == "Directing").Take(5).ToList()
            };
            var videosReq = await movieClientService.SendRequestAsync($"https://api.themoviedb.org/3/tv/{id}/videos?language=en-US", GetApiKey());
            var videos = JsonConvert.DeserializeObject<VideoRoot>(videosReq);
            show.Videos = videos.Videos.Where(video => video.Site == "YouTube").ToList();
            return show;
        }

        public async Task<IEnumerable<Genre>> GetGenresAsync()
        {
            string body = await movieClientService
               .SendRequestAsync("https://api.themoviedb.org/3/genre/tv/list?language=en", GetApiKey());
            var genresResponse = JsonConvert.DeserializeObject<GenresResponse>(body);

            return genresResponse.Genres;
        }

        public async Task<IEnumerable<PopularSeries>> GetOnTheAirAsync()
        {
            string body = await movieClientService
              .SendRequestAsync("https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1", GetApiKey());
            var series = JsonConvert.DeserializeObject<ApiRepsone<PopularSeries>>(body);

            return series.Result;
        }

        public async Task<IEnumerable<PopularSeries>> GetPopularSeriesAsync()
        {
            string body = await movieClientService
               .SendRequestAsync("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1", GetApiKey());
            var series = JsonConvert.DeserializeObject<ApiRepsone<PopularSeries>>(body);

            return series.Result;
        }

        public async Task<IEnumerable<PopularSeries>> GetRecommendationsAsync(string id)
        {
            
            string body = await movieClientService
                .SendRequestAsync($"https://api.themoviedb.org/3/tv/{id}/recommendations", GetApiKey());
            var series = JsonConvert.DeserializeObject<ApiRepsone<PopularSeries>>(body);

            return series.Result;
            
        }

        private string GetApiKey()
        {
            return configuration.GetValue<string>("FilmDive");
        }
    }
}
