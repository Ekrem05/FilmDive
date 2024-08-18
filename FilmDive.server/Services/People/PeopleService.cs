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
              .SendRequestAsync("https://api.themoviedb.org/3/person/popular?language=en-US&page=1", GetApiKey());
            var people = JsonConvert.DeserializeObject<MovieApiResponse<Individual>>(body);

            return people.Result;
        }

        public async Task<IEnumerable<Individual>> SearchAsync(string name)
        {
            string body = await movieClientService
              .SendRequestAsync($"https://api.themoviedb.org/3/search/person?query={name}&include_adult=false&language=en-US&page=1", GetApiKey());
            var people = JsonConvert.DeserializeObject<MovieApiResponse<Individual>>(body);
            var filteredPeople = people.Result.Where(individual => !string.IsNullOrEmpty(individual.ProfilePicture));
            return filteredPeople;
        }

        private string GetApiKey()
        {
            return configuration.GetValue<string>("FilmDive");
        }
    }
}
