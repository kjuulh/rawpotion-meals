using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RawPotion.Meals.Application.Interfaces;
using RawPotion.Meals.Application.Interfaces.Groups;
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
        {
            return services
                .AddDbContext<ApplicationDbContext>(
                    builder => builder
                        .UseNpgsql(
                            configuration.GetConnectionString("Postgres"),
                            optionsBuilder =>
                                optionsBuilder.MigrationsAssembly(
                                    typeof(ApplicationDbContext)
                                        .Assembly.FullName)))
                .AddScoped<IApplicationDbContext>(
                    provider
                        => provider.GetService<ApplicationDbContext>())
                .AddScoped<IUserRepository, UserRepository>()
                .AddScoped<IGroupRepository, GroupRepository>();
        }

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