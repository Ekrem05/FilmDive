using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Movie
{
    public class Credit
    {
        public int Id { get; set; }
        public Cast[] Cast { get; set; }
        public Crew[] Crew { get; set; }
    }
}
