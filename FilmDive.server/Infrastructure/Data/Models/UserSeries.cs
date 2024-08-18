namespace FilmDive.Server.Infrastructure.Data.Models
{
    public class UserSeries
    {
        public int UserId { get; set; }
        public string SeriesId { get; set; } = string.Empty;
        public string SeriesName { get; set; } = string.Empty;
        public double SeriesRating { get; set; }
        public DateTime SeriesDate { get; set; }
        public string PosterPath { get; set; } = string.Empty;


    }
}
