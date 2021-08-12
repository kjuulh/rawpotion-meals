using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Persistence.Configurations
{
    public class GroupConfiguration : IEntityTypeConfiguration<Group>
    {
        public void Configure(
            EntityTypeBuilder<Group> builder)
        {
            builder.HasKey(g => g.Id);

            builder
                .HasOne(g => g.Admin)
                .WithMany(u => u.AdminOfGroups);

            builder
                .HasMany(g => g.Members)
                .WithMany(u => u.Groups);

            builder
                .HasMany(g => g.Meals)
                .WithOne(m => m.Group);
        }
    }
}