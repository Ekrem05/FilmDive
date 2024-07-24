namespace FilmDive.Server.Services.MovieClient
{
    public class MovieClientService : IMovieClientService
    {
        private readonly HttpClient client;

        public MovieClientService(HttpClient _httpClient)
        {
            client = _httpClient;
        }
        public async Task<string> SendRequestAsync(string uri, string apiKey)
        {

            HttpRequestMessage request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri(uri),
                Headers =
               {
                    { "accept", "application/json" },
                    { "Authorization", $"Bearer {apiKey}" },
               }

            };
            var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
            return body;
        }
    }
}
