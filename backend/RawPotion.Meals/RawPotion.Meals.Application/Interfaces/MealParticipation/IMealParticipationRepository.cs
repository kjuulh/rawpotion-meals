using System.Threading.Tasks;

namespace RawPotion.Meals.Application.Interfaces.MealParticipation
{
    public interface IMealParticipationRepository
    {
        Task<bool> SetParticipatingStatusForUserAsync(
            int mealId,
            int userId,
            bool participate);
    }
}