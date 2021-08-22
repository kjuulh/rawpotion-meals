using System.ComponentModel.DataAnnotations;
using RawPotion.Meals.Application.Common.Mappings;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Features.Users.Commands.RegisterUser
{
    public class UserVm : IMapFrom<User>
    {
        [Required]
        public int Id { get; init; }

        [Required]
        public string Username { get; init; }
        
        [Required]
        public string Email { get; init; }
    }
}