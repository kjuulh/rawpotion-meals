using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Features.Authentication
{
    public interface IJwtUtils
    {
        Task<string> GenerateTokenFor(
            User user);

        Task<int?> Validate(
            string? token);

        Task<RefreshToken> GenerateRefreshTokenFor(
            string ipAddress);
    }

    public class JwtUtils : IJwtUtils
    {
        private readonly IOptions<JwtOptions> _options;

        public JwtUtils(
            IOptions<JwtOptions> options)
        {
            _options = options;
        }

        public Task<string> GenerateTokenFor(
            User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_options.Value.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new[]
                    {
                        new Claim(
                            "sub",
                            user.Id.ToString())
                    }),
                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha384Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Task.FromResult(tokenHandler.WriteToken(token));
        }

        public Task<int?> Validate(
            string? token)
        {
            if (token is null)
                return Task.FromResult<int?>(null);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_options.Value.Secret);
            try
            {
                tokenHandler.ValidateToken(
                    token,
                    new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey =
                            new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ClockSkew = TimeSpan.Zero
                    },
                    out SecurityToken validatedToken);

                var jwtToken = validatedToken as JwtSecurityToken;
                if (jwtToken is null)
                    return Task.FromResult<int?>(null);
                var userId = int.Parse(
                    jwtToken.Claims.First(x => x.Type == "id")
                        .Value);

                return Task.FromResult<int?>(userId);
            }
            catch
            {
                return Task.FromResult<int?>(null);
            }
        }

        public Task<RefreshToken> GenerateRefreshTokenFor(
            string ipAddress)
        {
            using var rngCryptoServiceProvider =
                new RNGCryptoServiceProvider();
            var randomBytes = new byte[64];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(randomBytes),
                Expires = DateTime.UtcNow.AddMonths(3),
                Created = DateTime.UtcNow,
                CreatedByIp = ipAddress
            };

            return Task.FromResult(refreshToken);
        }
    }
}