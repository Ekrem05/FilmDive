﻿using FilmDive.Server.ViewModels.Movie;
using System.Collections;

namespace FilmDive.Server.Services.Movies
{
    public interface IMovieService
    {
        Task<IEnumerable<TrendingMovie>> GetTrendingAsync();
        Task<IEnumerable<TrendingMovie>> GetMostPopularAsync();
        Task<IEnumerable<TrendingMovie>> GetUpcomingAsync();
        Task<MovieDetails> GetDetailsAsync(string id);

    }
}
