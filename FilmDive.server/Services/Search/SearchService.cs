using FilmDive.Server.Infrastructure.Enums;
using FilmDive.Server.Services.MovieClient;
using FilmDive.Server.ViewModels.Movie;
using FilmDive.Server.ViewModels.Search;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Text.Json;

namespace FilmDive.Server.Services.Search
{
    public class SearchService(IMovieClientService movieClientService
        ,IConfiguration configuration) : ISearchService
    {
        public async Task<IEnumerable<ResultItem>> SearchAsync(SearchParams searchParams)
        {
            if (searchParams.OnlyPeople)
            {
                string body = await movieClientService
                .SendRequestAsync($"https://api.themoviedb.org/3/search/person?query={searchParams.Keyword}&include_adult=false&language=en-US&page=1", GetApiKey());
                var response = JsonConvert.DeserializeObject<MovieApiResponse<PersonSearch>>(body);

                var items = response.Result.Select(item => new ResultItem()
                {
                    Id = item.Id,
                    Name = item.Name,
                    ImagePath = item.ProfilePath,
                    ItemType = ItemType.Person.ToString()
                });
                return items;
            }
            else if (searchParams.OnlySeries)
            {
                string body = await movieClientService
                .SendRequestAsync($"https://api.themoviedb.org/3/search/tv?query={searchParams.Keyword}&include_adult=false&language=en-US&page=1", GetApiKey());
                var response = JsonConvert.DeserializeObject<MovieApiResponse<SeriesSearch>>(body);

                var items = response.Result.Select(item => new ResultItem()
                {
                    Id = item.Id,
                    Name = item.Name,
                    ImagePath = item.PosterPath,
                    Year = item.FirstAirDate?.Year.ToString() ?? string.Empty,
                    ItemType = ItemType.Series.ToString()
                });
                return items;
            }
            else if (searchParams.OnlyMovies)
            {
                string body = await movieClientService
                .SendRequestAsync($"https://api.themoviedb.org/3/search/movie?query={searchParams.Keyword}&include_adult=false&language=en-US&page=1", GetApiKey());
                var response = JsonConvert.DeserializeObject<MovieApiResponse<SearchMovie>>(body);
                var items = response.Result.Select(item => new ResultItem()
                {
                    Id = item.Id,
                    Name = item.Title,
                    ImagePath = item.PosterPath,
                    Year = item.ReleaseDate?.Year.ToString() ?? string.Empty,
                    ItemType = ItemType.Movie   .ToString()
                });
                return items;
            }
            else
            {
                string body = await movieClientService
               .SendRequestAsync($"https://api.themoviedb.org/3/search/multi?query=${searchParams.Keyword}&include_adult=false&language=en-US&page=1", GetApiKey());
                var options = new JsonSerializerSettings
                {
                    DateFormatString = "yyyy-MM-dd",
                    Converters = new List<JsonConverter> { new StringEnumConverter() }
                };


                var response = JsonConvert.DeserializeObject<MovieApiResponse<SearchMulti>>(body, options);
                var items = response.Result.Select(item => new ResultItem()
                {
                    Id = item.Id,
                    Name = item.DisplayName,
                    ImagePath = item.DisplayPoster,
                    Year = item.DisplayDate.Split("-")[0],
                    ItemType = item.MediaType switch
                    {
                        "movie" => ItemType.Movie.ToString(),
                        "tv" => ItemType.Series.ToString(),
                        "person" => ItemType.Person.ToString(),
                        _ => ItemType.Movie.ToString()
                    }
                });
                return items;
            }
        }
        private string GetApiKey()
        {
            return configuration.GetValue<string>("FilmDive");
        }
    }
}
