using FilmDive.Server.Data;
using FilmDive.Server.Infrastructure;
using FilmDive.Server.Infrastructure.Middleware;
using FilmDive.Server.Repositories.UserMoviesRepo;
using FilmDive.Server.Repositories.UserRepo;
using FilmDive.Server.Repositories.UserSeriesRepo;
using FilmDive.Server.Services.Movie;
using FilmDive.Server.Services.MovieClient;
using FilmDive.Server.Services.Movies;
using FilmDive.Server.Services.People;
using FilmDive.Server.Services.Search;
using FilmDive.Server.Services.Token;
using FilmDive.Server.Services.TVshows;
using FilmDive.Server.Services.UserServiceFolder;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Configure();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.UseMiddleware<ExceptionMiddleware>();

app.Run();
