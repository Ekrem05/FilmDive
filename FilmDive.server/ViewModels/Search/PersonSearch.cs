using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Search
{
    public class PersonSearch
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;

        [JsonProperty("profile_path")]
        public string ProfilePath { get; set; } = string.Empty;

    }
}
