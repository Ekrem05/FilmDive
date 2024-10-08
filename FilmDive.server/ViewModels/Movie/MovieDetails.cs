﻿using FilmDive.Server.Infrastructure.Attributes;
using FilmDive.Server.ViewModels.Movie.VideoDtos;
using Newtonsoft.Json;

namespace FilmDive.Server.ViewModels.Movie
{
    public class MovieDetails
    {
        public int Id { get; set; }

        public bool IsSaved { get; set; }

        [JsonProperty("backdrop_path")]
        public string BackdropPath { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public List<Genre> Genres { get; set; } = new List<Genre>();

        public string Homepage { get; set; } = string.Empty;

        public int Runtime { get; set; }
        public long Revenue { get; set; }


        [JsonProperty("imdb_id")]
        public string ImdbId { get; set; } = string.Empty;

        [JsonProperty("poster_path")]
        public string PosterPath { get; set; } = string.Empty;

        [JsonProperty("production_companies")]
        public List<ProductionCompany> ProductionCompanies { get; set; } = new List<ProductionCompany>();

        public string Overview { get; set; } = string.Empty;

        [JsonProperty("release_date")]
        public string ReleaseDate { get; set; } = string.Empty;

        [JsonProperty("vote_average")]
        [JsonConverter(typeof(OneDecimalPlaceConverter))]
        public decimal VoteAverage { get; set; }
        public Credit Credits { get; set; } = new Credit();

        public List<Video> Videos { get; set; } = new List<Video>();

    }
}
