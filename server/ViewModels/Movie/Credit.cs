using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Movie
{
    public class Credit
    {
        public int Id { get; set; }
        public List<Cast> Cast { get; set; } = new List<Cast>();
        public List<Crew> Crew { get; set; } = new List<Crew>();
    }
}
