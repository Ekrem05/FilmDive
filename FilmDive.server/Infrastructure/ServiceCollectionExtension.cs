using FilmDive.Server.Data;
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
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FilmDive.Server.Infrastructure
{
    public static class ServiceCollectionExtension
    {

        public static WebApplicationBuilder Configure(this WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
                        ValidAudience = builder.Configuration["JwtSettings:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"])),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            builder.AddServices();
            builder.AddRepositories();

            return builder;

        }
        public static WebApplicationBuilder AddServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddSingleton<DapperContext>();
            builder.Services.AddScoped<HttpClient>();
            builder.Services.AddScoped<IMovieService, MovieService>();
            builder.Services.AddScoped<IMovieClientService, MovieClient>();
            builder.Services.AddScoped<ITokenService, TokenService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IPeopleService, PeopleService>();
            builder.Services.AddScoped<ISeriesService, SeriesService>();
            builder.Services.AddScoped<ISearchService, SearchService>();
            return builder;

        }
        public static WebApplicationBuilder AddRepositories(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IUserMovieRepository, UserMovieRepository>();
            builder.Services.AddScoped<IUserSeriesRepository, UserSeriesRepository>();
            return builder;

        }
    }
}
