using Dapper;
using FilmDive.Server.Data;
using FilmDive.Server.ViewModels.User;
using System.Data;

namespace FilmDive.Server.Repositories.UserSeriesRepo
{
    public class UserSeriesRepository(DapperContext context):IUserSeriesRepository
    {
        public async Task<bool> IsSaved(string seriesId, int? userId)
        {
            var query = @"SELECT COUNT(1) FROM public. ""User_Series"" WHERE ""User_Id"" = @User_Id AND ""Series_Id"" = @Series_Id;";

            var parameters = new DynamicParameters();
            parameters.Add("User_Id", userId);
            parameters.Add("Series_Id", seriesId);

            using (var connection = context.CreateConnection())
            {
                int numberOfRows = await connection.ExecuteScalarAsync<int>(query, parameters);
                return numberOfRows > 0;
            }
        }
        public async Task DeleteFromWatchlist(string seriesId, int userId)
        {
            var query = @"DELETE FROM public. ""User_Series"" WHERE ""User_Id"" = @User_Id AND ""Series_Id"" = @Series_Id;";

            var parameters = new DynamicParameters();
            parameters.Add("User_Id", userId);
            parameters.Add("Series_Id", seriesId);

            using (var connection = context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task SaveToWatchlist(Watchlist model, int userId)
        {
            var query = @"
            INSERT INTO public.""User_Series"" 
            (""User_Id"", ""Series_Id"", ""SeriesName"", ""SeriesDate"", ""SeriesRating"") 
            VALUES (@User_Id, @Series_Id, @SeriesName, @SeriesDate, @SeriesRating);";

            var parameters = new DynamicParameters();
            parameters.Add("User_Id", userId, DbType.Int32);
            parameters.Add("Series_Id", model.Id, DbType.String);
            parameters.Add("SeriesName", model.Name, DbType.String);
            parameters.Add("SeriesDate", model.Date, DbType.Date);
            parameters.Add("SeriesRating", model.Rating, DbType.Decimal);

            using (var connection = context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }
    }
}
