using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace FilmDive.Server.ViewModels.Search
{
    public class SearchMulti
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty("poster_path")]
        public string PosterPath { get; set; } = string.Empty;

        [JsonProperty("media_type")]
        public string MediaType { get; set; } = string.Empty;

        [JsonProperty("title")]
        public string Title { get; set; } = string.Empty;

        [JsonProperty("name")]
        public string Name { get; set; } = string.Empty;

        [JsonProperty("release_date")]
        public string ReleaseDate { get; set; } = string.Empty;

        [JsonProperty("first_air_date")]
        public string FirstAirDate { get; set; } = string.Empty;

        [JsonProperty("profile_path")]
        public string ProfilePath { get; set; } = string.Empty;

        // Custom properties to handle variations
        public string DisplayName => !string.IsNullOrEmpty(Title) ? Title : Name;
        public string DisplayDate => !string.IsNullOrEmpty(ReleaseDate) ? ReleaseDate : FirstAirDate;
        public string DisplayPoster => !string.IsNullOrEmpty(PosterPath) ? PosterPath : ProfilePath;
    }
}
