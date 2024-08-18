using FilmDive.Server.ViewModels.Search;

namespace FilmDive.Server.Services.Search
{
    public interface ISearchService
    {
        public Task<IEnumerable<ResultItem>> SearchAsync(SearchParams searchParams);
    }
}
