using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RawPotion.Meals.Application.Common.Mappings;
using RawPotion.Meals.Application.Features.Groups.Queries.GetGroupsForUser;
using RawPotion.Meals.Application.Features.Users.Commands.RegisterUser;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Features.Meals.Queries.GetMealById
{
    public class MealVm : IMapFrom<Meal>
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public UserVm Host { get; set; }

        [Required]
        public GroupVm Group { get; set; }

        [Required]
        public string Recipe { get; set; }

        public string? Description { get; set; }

        [Required]
        public string Date { get; set; }
        
        [Required]
        public IEnumerable<UserVm> ParticipatingMembers { get; set; }
    }
}