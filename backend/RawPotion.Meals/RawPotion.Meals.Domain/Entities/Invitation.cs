namespace RawPotion.Meals.Domain.Entities
{
    public class Invitation
    {
        public int Id { get; set; }

        public Group Group { get; set; }

        public bool Enabled { get; set; }
    }
}