using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Movie
{
    public class Cast
    {
        public int Id { get; set; }

        [JsonProperty("known_for_department")]
        public string Department { get; set; }

        public string Name { get; set; }
    }
}
