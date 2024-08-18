using Dapper;
using FilmDive.Server.Data;
using FilmDive.Server.Infrastructure.Data.Models;
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

        public async Task SaveToWatchlist(WatchlistItem model, int userId)
        {
            var query = @"
            INSERT INTO public.""User_Series"" 
            (""User_Id"", ""Series_Id"", ""SeriesName"", ""SeriesDate"", ""SeriesRating"", ""PosterPath"") 
            VALUES (@User_Id, @Series_Id, @SeriesName, @SeriesDate, @SeriesRating, @PosterPath);";

            var parameters = new DynamicParameters();
            parameters.Add("User_Id", userId, DbType.Int32);
            parameters.Add("Series_Id", model.Id, DbType.String);
            parameters.Add("SeriesName", model.Title, DbType.String);
            parameters.Add("SeriesDate", model.ReleaseDate, DbType.Date);
            parameters.Add("SeriesRating", model.VoteAverage, DbType.Decimal);
            parameters.Add("PosterPath", model.PosterPath,DbType.String);

            using (var connection = context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task<IEnumerable<UserSeries>> GetByUser(int userId)
        {
            var query = @"
            SELECT ""User_Id"" as ""UserId"", 
                ""Series_Id"" as ""SeriesId"", 
                ""SeriesName"", 
                ""SeriesRating"", 
                ""SeriesDate"" ,
                ""PosterPath""
                FROM public.""User_Series"" 
            WHERE ""User_Id"" = @User_Id";

            var parameters = new DynamicParameters();
            parameters.Add("User_Id", userId, DbType.Int32);
            using (var connection = context.CreateConnection())
            {
                var result = await connection.QueryAsync<UserSeries>(query, parameters);
                return result;
            }
        }
    }
}
