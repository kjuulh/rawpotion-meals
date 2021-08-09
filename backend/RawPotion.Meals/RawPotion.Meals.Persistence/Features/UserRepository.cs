using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RawPotion.Meals.Application.Interfaces;
using RawPotion.Meals.Common;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Persistence.Features
{
    public class UserRepository : IUserRepository
    {
        private readonly IApplicationDbContext _context;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(IApplicationDbContext context, ILogger<UserRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<User> RegisterAsync(string username, string userEmail, string password)
        {
            var user = _context.User.Add(new User()
            {
                Email = userEmail,
                Password = PasswordHashing.Hash(password),
                Username = username
            });

            await _context.SaveChangesAsync();

            return user.Entity;
        }

        public async Task<bool> UpdateAsync(User user)
        {
            var userToBeUpdated = await _context.User.FindAsync(user.Id);

            if (userToBeUpdated is null)
                throw new InvalidOperationException("User was not found");

            userToBeUpdated.Email = user.Email;
            userToBeUpdated.Password = user.Password;
            userToBeUpdated.Username = user.Username;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                _logger.LogError(e.Message);
                return false;
            }

            return true;
        }

        public async Task<bool> DeleteById(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user is null)
                throw new InvalidOperationException("User was not found");

            _context.User.Remove(user);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                _logger.LogError(e.Message);
                return false;
            }

            return true;
        }

        public async Task<User?> GetUserByEmailAsync(string email) =>
            await _context.User.SingleOrDefaultAsync(u => u.Email == email);

        public async Task<User?> GetUserByRefreshToken(string token) =>
            await _context.User.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

        public Task RemoveInactiveRefreshTokens(User user)
        {
            return Task.CompletedTask;
        }
    }
}