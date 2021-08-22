using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Persistence.Configurations
{
    public class MealConfiguration : IEntityTypeConfiguration<Meal>
    {
        public void Configure(EntityTypeBuilder<Meal> builder)
        {
            builder.HasKey(m => m.Id);

            builder
                .Property(m => m.Date)
                .IsRequired();

            builder
                .Property(m => m.Recipe)
                .IsRequired();

            builder
                .HasMany(m => m.ParticipatingMembers)
                .WithMany(u => u.ParticipatingMeals);
        }
    }
}