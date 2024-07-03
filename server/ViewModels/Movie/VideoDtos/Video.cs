using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Movie.VideoDtos
{
    public class Video
    {
        [JsonProperty("key")]
        public string Key { get; set; } = string.Empty;

        [JsonProperty("site")]
        public string Site { get; set; } = string.Empty;

    }
}
