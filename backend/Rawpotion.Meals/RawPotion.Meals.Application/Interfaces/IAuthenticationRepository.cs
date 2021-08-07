using System.Threading.Tasks;
using RawPotion.Meals.Domain.Entities;

namespace Rawpotion.Meals.Application.Interfaces
{
    public interface IAuthenticationRepository
    {
        Task Authenticate(string userUsername, string userPassword);
    }
}