using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RawPotion.Meals.Application.Features.Authentication;
using RawPotion.Meals.Application.Features.Meals;
using RawPotion.Meals.Application.Interfaces.Meals;
using RawPotion.Meals.Domain.Features.Authentication;

namespace RawPotion.Meals.Application
{
    public static class ApplicationDependencyInjection
    {
        public static IServiceCollection AddApplication(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            return services
                .AddScoped<IAuthenticationService, AuthenticationService>()
                .AddScoped<IMealsService, MealsService>()
                .AddSingleton<IJwtUtils, JwtUtils>()
                .AddApplicationOptions(configuration);
        }

        private static IServiceCollection AddApplicationOptions(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            return services.AddOptions<JwtOptions>()
                .Bind(configuration.GetSection(JwtOptions.Jwt))
                .ValidateDataAnnotations()
                .Services;
        }
    }
}