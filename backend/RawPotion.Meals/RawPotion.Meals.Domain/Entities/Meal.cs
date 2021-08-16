using System.Collections.Generic;

namespace RawPotion.Meals.Domain.Entities
{
    public record Meal
    {
        public int Id { get; set; }
        public User Host { get; set; }
        public Group Group { get; set; }
        public string Recipe { get; set; }
        public string Date { get; set; }

        public ICollection<User> ParticipatingMembers { get; set; } =
            new List<User>();
    }
}