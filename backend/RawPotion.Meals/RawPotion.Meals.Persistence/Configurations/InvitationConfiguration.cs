using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Persistence.Configurations
{
    public class InvitationConfiguration : IEntityTypeConfiguration<Invitation>
    {
        public void Configure(EntityTypeBuilder<Invitation> builder)
        {
            builder.HasKey(i => i.Id);

            builder
                .Property(i => i.Enabled)
                .HasDefaultValue(true);
        }
    }
}