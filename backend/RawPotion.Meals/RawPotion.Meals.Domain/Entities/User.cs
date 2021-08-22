using System.Collections.Generic;

namespace RawPotion.Meals.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public ICollection<RefreshToken> RefreshTokens { get; set; } =
            new List<RefreshToken>();

        public ICollection<Group> AdminOfGroups { get; set; } =
            new List<Group>();

        public ICollection<Group> Groups { get; set; } =
            new List<Group>();

        public ICollection<Meal> Meals { get; set; } = new List<Meal>();

        public ICollection<Meal> ParticipatingMeals { get; set; } =
            new List<Meal>();
    }
}