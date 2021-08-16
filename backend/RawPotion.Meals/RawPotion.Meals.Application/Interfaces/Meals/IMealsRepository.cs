using System.Threading.Tasks;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Interfaces.Meals
{
    public interface IMealsRepository
    {
        Task<Meal> CreateMealAsync(Meal meal);
        Task<Meal> GetMealByIdAsync(int mealId);
    }
}