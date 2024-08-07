﻿using FilmDive.Server.ViewModels.Movie;

namespace FilmDive.Server.Services.Movies
{
    public interface IMovieService
    {
        Task<IEnumerable<TrendingMovie>> GetNowPlayingAsync();

        Task<IEnumerable<TrendingMovie>> GetTrendingAsync();
        Task<IEnumerable<TrendingMovie>> GetMostPopularAsync();
        Task<IEnumerable<Genre>> GetGenresAsync();

        Task<IEnumerable<TrendingMovie>> GetUpcomingAsync();
        Task<MovieDetails> GetDetailsAsync(string id);
        Task<IEnumerable<TrendingMovie>> GetRecommendationsAsync(string id);
        Task<ApiRepsone<TrendingMovie>> BrowseAsync(MovieBrowse model);
    }
}
