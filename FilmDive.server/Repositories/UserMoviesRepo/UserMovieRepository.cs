using Dapper;
using FilmDive.Server.Data;
using FilmDive.Server.Infrastructure.Data.Models;
using FilmDive.Server.ViewModels.User;
using System.Data;

namespace FilmDive.Server.Repositories.UserMoviesRepo
{
    public class UserMovieRepository(DapperContext context) : IUserMovieRepository
    {
        public async Task<bool> IsSaved(string movieId, int? userId)
        {
            var query = @"SELECT COUNT(1) FROM public. ""User_Movie"" WHERE ""User_Id"" = @User_Id AND ""Movie_Id"" = @Movie_Id;";

            var parameters = new DynamicParameters();
            parameters.Add("User_Id", userId);
            parameters.Add("Movie_Id", movieId);

            using (var connection = context.CreateConnection())
            {
                int numberOfRows = await connection.ExecuteScalarAsync<int>(query, parameters);
                return numberOfRows > 0;
            }
        }
        public async Task DeleteFromWatchlist(string movieId, int userId)
        {
            var query = @"DELETE FROM public. ""User_Movie"" WHERE ""User_Id"" = @User_Id AND ""Movie_Id"" = @Movie_Id;";

            var parameters = new DynamicParameters();
            parameters.Add("User_Id", userId);
            parameters.Add("Movie_Id", movieId);

            using (var connection = context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task SaveToWatchlist(WatchlistItem model, int userId)
        {
            var query = @"
            INSERT INTO public.""User_Movie"" 
            (""User_Id"", ""Movie_Id"", ""MovieName"", ""MovieDate"", ""MovieRating"", ""PosterPath"") 
            VALUES (@User_Id, @Movie_Id, @MovieName, @MovieDate, @MovieRating, @PosterPath);";

            var parameters = new DynamicParameters();
            parameters.Add("User_Id", userId, DbType.Int32);
            parameters.Add("Movie_Id", model.Id, DbType.String);
            parameters.Add("MovieName", model.Title, DbType.String);
            parameters.Add("MovieDate", model.ReleaseDate, DbType.Date);
            parameters.Add("MovieRating", model.VoteAverage, DbType.Decimal);
            parameters.Add("PosterPath", model.PosterPath, DbType.String);


            using (var connection = context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task<IEnumerable<UserMovie>> GetByUser(int userId)
        {
            var query = @"
            SELECT ""User_Id"" as ""UserId"", 
                ""Movie_Id"" as ""MovieId"", 
                ""MovieName"", 
                ""MovieRating"", 
                ""MovieDate"",
                ""PosterPath""
                FROM public.""User_Movie"" 
            WHERE ""User_Id"" = @User_Id";

            var parameters = new DynamicParameters();
            parameters.Add("User_Id", userId, DbType.Int32);
            using (var connection = context.CreateConnection())
            {
                var result = await connection.QueryAsync<UserMovie>(query, parameters);
                return result;
            }
        }
    }
}
