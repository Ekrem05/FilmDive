﻿using FilmDive.Server.Data;
using FilmDive.Server.Repositories.UserRepo;
using FilmDive.Server.ViewModels.Api;
using FilmDive.Server.ViewModels.Token;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace FilmDive.Server.Services.Token
{
    public class TokenService(IUserRepository userRepository,
        IConfiguration config) : ITokenService
    {

        public async Task<AuthenticatedResponse> RefreshAsync(TokenApiModel model)
        {
            if (model is null)
                throw new ArgumentException(nameof(model));

            var principal = GetPrincipalFromExpiredToken(model.AccessToken);

            var user = await userRepository.DoesUserExistAsync(principal.Identity.Name,principal.FindFirstValue(ClaimTypes.Email));

            if (user is null || user.RefreshToken != model.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                throw new InvalidOperationException();

            var newAccessToken = GenerateAccessToken(principal.Claims);
            var newRefreshToken = GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await userRepository.UpdateUserAsync(user.Id, user);

            return new AuthenticatedResponse()
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }

        public async Task RevokeAsync(string username)
        {
            var user = await userRepository.FindUserAsync(username);
            if (user == null) throw new InvalidOperationException();

            user.RefreshToken = null;

            await userRepository.UpdateUserAsync(user.Id, user);
        }

        public string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtSettings:Key"]));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokeOptions = new JwtSecurityToken(
                   issuer: config["JwtSettings:Issuer"],
                   audience: config["JwtSettings:Audience"],
                   claims: claims,
                   expires: DateTime.Now.AddMinutes(20),
                   signingCredentials: signinCredentials
             );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtSettings:Key"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }
    }
}
