using Dapper;
using FilmDive.Server.Data;
using FilmDive.Server.ViewModels.User;
using System.Data;

namespace FilmDive.Server.Repositories.UserMoviesRepo
{
    public class UserMovieRepository(DapperContext context) : IUserMovieRepository
    {
        public async Task SaveToWatchlist(Watchlist model,int userId)
        {
            var query = @"
            INSERT INTO public.""User_Movie"" 
            (""User_Id"", ""Movie_Id"", ""MovieName"", ""MovieDate"", ""MovieRating"") 
            VALUES (@User_Id, @Movie_Id, @MovieName, @MovieDate, @MovieRating);";

            var parameters = new DynamicParameters();
            parameters.Add("User_Id", userId, DbType.Int32);
            parameters.Add("Movie_Id", model.Id, DbType.String);
            parameters.Add("MovieName", model.Name, DbType.String);
            parameters.Add("MovieDate", model.Date,DbType.Date);
            parameters.Add("MovieRating", model.Rating, DbType.Decimal);

            using (var connection = context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }
    }
}
