using FilmDive.Server.Services.MovieClient;
using FilmDive.Server.ViewModels.Movie;
using FilmDive.Server.ViewModels.People;
using Newtonsoft.Json;

namespace FilmDive.Server.Services.People
{
    public class PeopleService(IMovieClientService movieClientService, IConfiguration configuration) : IPeopleService
    {
        public async Task<IEnumerable<Individual>> GetPopularAsync()
        {
            string body = await movieClientService
              .SendRequestAsync("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", GetApiKey());
            var people = JsonConvert.DeserializeObject<ApiRepsone<Individual>>(body);

            return people.Result;
        }
        private string GetApiKey()
        {
            return configuration.GetValue<string>("FilmDive");
        }
    }
}
