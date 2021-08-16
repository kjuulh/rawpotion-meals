using System.ComponentModel.DataAnnotations;
using RawPotion.Meals.Application.Common.Mappings;
using RawPotion.Meals.Application.Features.Groups.Queries.GetGroupsForUser;
using RawPotion.Meals.Application.Features.Users.Commands.RegisterUser;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Features.Meals.Commands.CreateMealForGroup
{
    public class MealBriefVm : IMapFrom<Meal>
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public UserVm Host { get; set; }

        [Required]
        public int GroupId { get; set; }

        [Required]
        public string Recipe { get; set; }

        [Required]
        public string Date { get; set; }
    }
}