using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RawPotion.Meals.Application.Common.Mappings;
using RawPotion.Meals.Application.Features.Meals.Queries.GetMealById;
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
        public IEnumerable<MealWithoutGroupVm> Meals { get; set; }
    }
    
    
    public class MealWithoutGroupVm : IMapFrom<Meal>
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public UserVm Host { get; set; }

        [Required]
        public string Recipe { get; set; }

        [Required]
        public string Date { get; set; }
        
        [Required]
        public IEnumerable<UserVm> ParticipatingMembers { get; set; }
    }
}