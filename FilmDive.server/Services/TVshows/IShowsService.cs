﻿using FilmDive.Server.ViewModels.Movie;
using FilmDive.Server.ViewModels.Series;

namespace FilmDive.Server.Services.TVshows
{
    public interface ISeriesService
    {
        Task<IEnumerable<PopularSeries>> GetPopularSeriesAsync();

        Task<IEnumerable<PopularSeries>> GetAiringTodayAsync();
        Task<IEnumerable<PopularSeries>> GetRecommendationsAsync(string id);
        Task<MovieApiResponse<PopularSeries>> BrowseAsync(BrowseSeries model);
        Task<IEnumerable<PopularSeries>> GetOnTheAirAsync();
        Task<IEnumerable<Genre>> GetGenresAsync();

        
        Task<SeriesDetails> GetDetailsAsync(string id, int? userId=null);
    }
}
