namespace FilmDive.Server.Infrastructure.Data.Models
{
    public class UserMovie
    {
        public int UserId { get; set; }
        public string MovieId { get; set; } = string.Empty;
        public string MovieName { get; set; } = string.Empty;
        public double MovieRating { get; set; }
        public DateTime MovieDate { get; set; }
        public string PosterPath { get; set; } = string.Empty;


    }
}
