using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(u => u.Email).IsRequired();
            builder.Property(u => u.Username).IsRequired();
            builder.Property(u => u.Password).IsRequired();

            builder.HasIndex(u => u.Email).IsUnique();
            builder.HasIndex(u => u.Password).IsUnique();

            builder
                .OwnsMany(u => u.RefreshTokens, navigationBuilder =>
                {
                    navigationBuilder.Property(r => r.IsActive).HasDefaultValue(true);
                    navigationBuilder.WithOwner(r => r.User);
                });
        }
    }
}