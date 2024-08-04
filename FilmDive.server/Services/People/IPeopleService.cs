using FilmDive.Server.ViewModels.People;

namespace FilmDive.Server.Services.People
{
    public interface IPeopleService
    {
        Task<IEnumerable<Individual>> GetPopularAsync();
        Task<IEnumerable<Individual>> SearchAsync(string name);
    }
}
