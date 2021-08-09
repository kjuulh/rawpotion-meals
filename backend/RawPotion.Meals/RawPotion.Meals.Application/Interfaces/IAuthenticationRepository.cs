using System.Threading.Tasks;

namespace RawPotion.Meals.Application.Interfaces
{
    public interface IAuthenticationRepository
    {
        Task Authenticate(string userUsername, string userPassword);
    }
}