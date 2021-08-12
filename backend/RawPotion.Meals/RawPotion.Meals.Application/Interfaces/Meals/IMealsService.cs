using System.Threading.Tasks;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Interfaces.Meals
{
    public interface IMealsService
    {
        Task<Meal> CreateMealAsync(
            int userId,
            int groupId,
            string recipe,
            string date);
    }
}