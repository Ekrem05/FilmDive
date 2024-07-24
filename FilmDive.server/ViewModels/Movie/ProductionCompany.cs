using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Movie
{
    public class ProductionCompany
    {
        public int Id { get; set; }

        [JsonProperty("logo_path")]
        public string LogoPath { get; set; }
        public string Name { get; set; }
    }
}
