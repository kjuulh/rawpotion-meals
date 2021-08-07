using System.Threading.Tasks;
using RawPotion.Meals.Domain.Entities;

namespace Rawpotion.Meals.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<User> RegisterAsync(string username, string userEmail, string password);
        Task<bool> Update(User user);
        Task<bool> DeleteById(int id);
    }
}