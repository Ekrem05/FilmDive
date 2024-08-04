using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.People
{
    public class Individual
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        [JsonProperty("known_for_department")]
        public string Field { get; set; } = string.Empty;

        [JsonProperty("profile_path")]
        public string ProfilePicture { get; set; }

    }
}
