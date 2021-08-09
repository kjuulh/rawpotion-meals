using System.Threading.Tasks;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<User> RegisterAsync(string username, string userEmail, string password);
        Task<bool> UpdateAsync(User user);
        Task<bool> DeleteById(int id);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User?> GetUserByRefreshToken(string token);
        Task RemoveInactiveRefreshTokens(User user);
    }
}