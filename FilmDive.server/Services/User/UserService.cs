using BCrypt.Net;
using FilmDive.Server.Data;
using FilmDive.Server.Infrastructure.Data.Models;
using FilmDive.Server.Repositories.UserMoviesRepo;
using FilmDive.Server.Repositories.UserRepo;
using FilmDive.Server.Repositories.UserSeriesRepo;
using FilmDive.Server.Services.Token;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.User;
using System.Security.Claims;
using User = FilmDive.Server.Infrastructure.Data.Models.User;
namespace FilmDive.Server.Services.UserServiceFolder
{
    public class UserService(IUserRepository userRepository,
        IUserMovieRepository userMovieRepository,
        IUserSeriesRepository userSeriesRepository,
        ITokenService tokenService) : IUserService
    {
        public async Task<UserDetails> GetAsync(string accessToken)
        {
            var principal = tokenService.GetPrincipalFromExpiredToken(accessToken);

            var user = await userRepository.FindUserAsync(principal.Identity.Name);

            return new UserDetails()
            {
                Username = principal.Identity.Name,
                Email = principal.FindFirstValue("Email"),
            };
        }

        public async Task<AuthenticatedResponse> LogInAsync(LoginViewModel model)
        {
            if (model is null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            var user = await userRepository.FindUserAsync(model.Username);

            if (user is null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                throw new InvalidOperationException("Wrong username or password");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, model.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
            var accessToken = tokenService.GenerateAccessToken(claims);
            var refreshToken = tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await userRepository.UpdateUserAsync(user.Id, user);

            return new AuthenticatedResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<AuthenticatedResponse> SignUpAsync(SignupViewModel model)
        {
            if (model is null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var user = await userRepository.DoesUserExistAsync(model.Username,model.Email);

            if (user is not null)
                throw new InvalidOperationException("A user with this username already exists.");

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);
            string refreshToken = tokenService.GenerateRefreshToken();
            User newUser = new User()
            {
                Username = model.Username,
                Email = model.Email,
                Password = hashedPassword,
                RefreshToken = refreshToken,
                RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
            };
            long id = await userRepository.CreateUserAsync(newUser);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, model.Username),
                new Claim(ClaimTypes.Email, model.Email),
                new Claim(ClaimTypes.NameIdentifier, id.ToString())
            };
            var accessToken = tokenService.GenerateAccessToken(claims);

            return new AuthenticatedResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task SaveToWatchlist(Watchlist model,int userId,string genre)
        {
            if (genre == "movie")
            {
                await userMovieRepository.SaveToWatchlist(model, userId);
            }
            else if (genre == "series")
            {
                await userSeriesRepository.SaveToWatchlist(model, userId);
            }
        }

        public async Task DeleteFromWatchlist(string movieId, int userId)
        {
            await userMovieRepository.DeleteFromWatchlist(movieId, userId);
        }
    }
}
