using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RawPotion.Meals.Application.Common.Mappings;
using RawPotion.Meals.Application.Features.Meals.Commands.CreateMealForGroup;
using RawPotion.Meals.Application.Features.Users.Commands.RegisterUser;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Features.Groups.Queries.GetGroupsForUser
{
    public class GroupVm : IMapFrom<Group>
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public UserVm Admin { get; set; }

        [Required]
        public IEnumerable<UserVm> Members { get; set; }

        [Required]
        public IEnumerable<MealBriefVm> Meals { get; set; }
    }
}