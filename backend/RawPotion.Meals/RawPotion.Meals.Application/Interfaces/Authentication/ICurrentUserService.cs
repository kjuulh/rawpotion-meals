using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Interfaces.Authentication
{
    public interface ICurrentUserService
    {
        int UserId { get; }
    }
}