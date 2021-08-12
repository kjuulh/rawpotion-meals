using System.Threading.Tasks;
using RawPotion.Meals.Application.Interfaces;
using RawPotion.Meals.Application.Interfaces.Meals;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Persistence.Features
{
    public class MealsRepository : IMealsRepository
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public MealsRepository(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Meal> CreateMealAsync(Meal meal)
        {
            var mealEntity = _applicationDbContext.Meals.Add(meal);

            await _applicationDbContext.SaveChangesAsync();

            return mealEntity.Entity;
        }
    }
}