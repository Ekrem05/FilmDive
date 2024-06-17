namespace FilmDive.Server.Services.MovieClient
{
    public interface IMovieClientService
    {
        Task<string> SendRequestAsync(string uri, string apiKey);
    }
}
