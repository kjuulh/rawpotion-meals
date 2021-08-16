using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RawPotion.Meals.Application.Interfaces;
using RawPotion.Meals.Application.Interfaces.Groups;
using RawPotion.Meals.Application.Interfaces.Meals;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Features.Meals
{
    public class MealsService : IMealsService
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IMealsRepository _mealsRepository;
        private readonly IUserRepository _userRepository;

        public MealsService(
            IGroupRepository groupRepository,
            IMealsRepository mealsRepository,
            IUserRepository userRepository)
        {
            _groupRepository = groupRepository;
            _mealsRepository = mealsRepository;
            _userRepository = userRepository;
        }

        public async Task<Meal> CreateMealAsync(
            int userId,
            int groupId,
            string recipe,
            string date)
        {
            var group = await _groupRepository.GetGroupByIdAsync(groupId);
            if (group is null)
                throw new ApplicationException("No group was found");

            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user is null)
                throw new ApplicationException("No user was found");

            if (group.Members.Any(m => m.Id != userId))
                throw new ApplicationException("User is not part of group");

            var meal = await _mealsRepository.CreateMealAsync(
                new Meal()
                {
                    Host = user,
                    Date = date,
                    Group = group,
                    Recipe = recipe,
                    ParticipatingMembers = new List<User> {user}
                });

            return meal;
        }
    }
}