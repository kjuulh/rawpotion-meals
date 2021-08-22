using System.Reflection;
using Microsoft.EntityFrameworkCore;
using RawPotion.Meals.Application.Interfaces;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Persistence.Database
{
    public class ApplicationDbContext
        : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(
            DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Invitation> Invitations { get; set; }

        protected override void OnModelCreating(
            ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(
                Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }
    }
}