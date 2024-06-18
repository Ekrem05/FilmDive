using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Movie.VideoDtos
{
    public class VideoRoot
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("results")]
        public List<Video> Videos { get; set; }=new List<Video>();
    }
}
