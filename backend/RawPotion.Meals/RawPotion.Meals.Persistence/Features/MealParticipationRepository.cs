using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RawPotion.Meals.Application.Interfaces;
using RawPotion.Meals.Application.Interfaces.MealParticipation;

namespace RawPotion.Meals.Persistence.Features
{
    public class MealParticipationRepository : IMealParticipationRepository
    {
        private readonly IApplicationDbContext _context;
        private readonly ILogger<MealParticipationRepository> _logger;

        public MealParticipationRepository(IApplicationDbContext context, ILogger<MealParticipationRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> SetParticipatingStatusForUserAsync(
            int mealId,
            int userId,
            bool participate)
        {
            var meal = await _context.Meals
                .Include(m => m.ParticipatingMembers)
                .AsSplitQuery()
                .SingleOrDefaultAsync(m => m.Id == mealId);

            var user =
                meal.ParticipatingMembers.SingleOrDefault(
                    pm => pm.Id == userId);
            var existingUser =
                await _context.User.SingleOrDefaultAsync(
                    u => u.Id == userId);

            try
            {
                if (user is null && participate)
                {
                    meal.ParticipatingMembers.Add(existingUser);
                    await _context.SaveChangesAsync();
                }
                else if (!participate)
                {
                    meal.ParticipatingMembers.Remove(existingUser);
                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateException e)
            {
                _logger.LogWarning(e.Message);
                return false;
            }

            return true;
        }
    }
}