using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RawPotion.Meals.Application.Interfaces;
using RawPotion.Meals.Application.Interfaces.Groups;
using RawPotion.Meals.Application.Interfaces.Invitations;
using RawPotion.Meals.Application.Interfaces.MealParticipation;
using RawPotion.Meals.Application.Interfaces.Meals;
using RawPotion.Meals.Persistence.Database;
using RawPotion.Meals.Persistence.Features;

namespace RawPotion.Meals.Persistence
{
    public static class PersistenceDependencyInjection
    {
        public static IServiceCollection
            AddPersistence(
                this IServiceCollection services,
                IConfiguration configuration)
            => services
                .AddDbContext<ApplicationDbContext>(
                    builder => builder.UseNpgsql(
                        configuration.GetConnectionString("Postgres"),
                        optionsBuilder => optionsBuilder.MigrationsAssembly(
                                typeof(ApplicationDbContext).Assembly.FullName)
                            .UseQuerySplittingBehavior(
                                QuerySplittingBehavior.SplitQuery)))
                .AddScoped<IApplicationDbContext>(
                    provider => provider.GetService<ApplicationDbContext>())
                .AddScoped<IUserRepository, UserRepository>()
                .AddScoped<IGroupRepository, GroupRepository>()
                .AddScoped<IInvitationsRepository, InvitationsRepository>()
                .AddScoped<IMealParticipationRepository,
                    MealParticipationRepository>()
                .AddScoped<IMealsRepository, MealsRepository>();

        public static IApplicationBuilder UsePersistence(
            this IApplicationBuilder app,
            ApplicationDbContext context,
            bool migrate)
        {
            if (migrate)
            {
                Console.WriteLine("Database is migrating...");
                context.Database.Migrate();
                Console.WriteLine("Database is done migrating...");
            }
            else
            {
                Console.WriteLine(
                    "Checking if database is updated...");
                context.Database.EnsureCreated();
                Console.WriteLine("Database is updated...");
            }

            return app;
        }
    }
}