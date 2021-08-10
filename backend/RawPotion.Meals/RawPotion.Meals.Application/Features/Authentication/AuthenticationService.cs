using System;
using System.Linq;
using System.Threading.Tasks;
using RawPotion.Meals.Application.Interfaces;
using RawPotion.Meals.Common;
using RawPotion.Meals.Domain.Entities;
using RawPotion.Meals.Domain.Features.Authentication;

namespace RawPotion.Meals.Application.Features.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IJwtUtils _jwtUtils;
        private readonly IUserRepository _userRepository;

        public AuthenticationService(
            IUserRepository userRepository,
            IJwtUtils jwtUtils)
        {
            _userRepository = userRepository;
            _jwtUtils = jwtUtils;
        }

        public async
            Task<(string AccessToken, string RefreshToken, int UserId
                )> Authenticate(
                string email,
                string password,
                string ipAddress)
        {
            var user =
                await _userRepository.GetUserByEmailAsync(email);
            if (user is null)
                throw new InvalidOperationException(
                    "User was not found");

            if (!PasswordHashing.Verify(
                user.Password,
                password))
                throw new ArgumentException(
                    "Password was invalid",
                    nameof(password));

            var token = await _jwtUtils.GenerateTokenFor(user);
            var refreshToken =
                await _jwtUtils.GenerateRefreshTokenFor(ipAddress);
            user.RefreshTokens.Add(refreshToken);

            await _userRepository.UpdateAsync(user);

            return (token, refreshToken.Token, user.Id);
        }

        public async Task<(
            AuthenticationResponse authenticateResponse, string
            refreshToken)> RefreshToken(
            string? token,
            string? ipAddress)
        {
            var user = await GetUserByRefreshTokenAsync(token!);
            var refreshToken =
                user.RefreshTokens.Single(x => x.Token == token);

            if (refreshToken is null)
                throw new ApplicationException(
                    "Token does not exist");

            if (!refreshToken.IsActive)
                throw new ApplicationException("Token is not active");

            var newRefreshToken = await RotateRefreshToken(
                refreshToken,
                ipAddress);
            user.RefreshTokens.Add(newRefreshToken);

            RemoveOldRefreshToken(user);

            await _userRepository.UpdateAsync(user);

            var jwtToken = await _jwtUtils.GenerateTokenFor(user);

            return (
                new AuthenticationResponse
                {
                    Id = user.Id,
                    Email = user.Email,
                    Username = user.Username,
                    AccessToken = jwtToken
                }, newRefreshToken.Token);
        }

        private void RemoveOldRefreshToken(
            User user)
        {
            _userRepository.RemoveInactiveRefreshTokens(user);
        }

        private async Task<RefreshToken> RotateRefreshToken(
            RefreshToken refreshToken,
            string? ipAddress)
        {
            var newRefreshToken =
                await _jwtUtils.GenerateRefreshTokenFor(ipAddress!);
            RevokeRefreshToken(
                refreshToken,
                ipAddress,
                "Replaced by new token",
                newRefreshToken.Token);
            return newRefreshToken;
        }

        private void RevokeRefreshToken(
            RefreshToken token,
            string ipAddress,
            string reason,
            string? replacedByToken = null)
        {
            token.Revoked = DateTime.UtcNow;
            token.RevokedByIp = ipAddress;
            token.ReasonRevoked = reason;
            token.ReplacedByToken = replacedByToken;
        }

        private async Task<User> GetUserByRefreshTokenAsync(
            string token)
        {
            var user =
                await _userRepository.GetUserByRefreshToken(token);
            if (user is null)
                throw new ApplicationException("Invalid token");

            return user;
        }
    }
}