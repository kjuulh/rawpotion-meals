using System.Collections.Generic;

namespace RawPotion.Meals.Domain.Entities
{
    public class Group
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int AdminId { get; set; }
        public User Admin { get; set; }

        public ICollection<User> Members { get; set; } =
            new List<User>();
    }
}