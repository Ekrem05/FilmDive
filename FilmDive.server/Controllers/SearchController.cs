using FilmDive.Server.Services.Search;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.Search;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FilmDive.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SearchController(ISearchService searchService) : ControllerBase
    {
        [HttpGet]
        public async Task<ApiResponse<IEnumerable<ResultItem>>> Search([FromQuery] SearchParams searchParams) 
        { 
           var data = await searchService.SearchAsync(searchParams);

            return new ApiResponse<IEnumerable<ResultItem>>()
            {
                Status = 200,
                Data = data
            };
        }
    }
}
