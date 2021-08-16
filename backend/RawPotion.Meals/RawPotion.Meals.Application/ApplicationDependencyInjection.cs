using System.Reflection;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RawPotion.Meals.Application.Common.Behaviors;
using RawPotion.Meals.Application.Features.Authentication;
using RawPotion.Meals.Application.Features.Meals;
using RawPotion.Meals.Application.Interfaces.Invitations;
using RawPotion.Meals.Application.Interfaces.Meals;
using RawPotion.Meals.Domain.Features.Authentication;

namespace RawPotion.Meals.Application
{
    public static class ApplicationDependencyInjection
    {
        public static IServiceCollection AddApplication(
            this IServiceCollection services,
            IConfiguration configuration)
            => services
                .AddScoped<IAuthenticationService, AuthenticationService>()
                .AddScoped<IInvitationsService, InvitationsService>()
                .AddScoped<IMealsService, MealsService>()
                .AddSingleton<IJwtUtils, JwtUtils>()
                .AddApplicationInfrastructure()
                .AddApplicationOptions(configuration);

        private static IServiceCollection AddApplicationInfrastructure(
            this IServiceCollection services)
            => services
                .AddAutoMapper(Assembly.GetExecutingAssembly())
                .AddValidatorsFromAssembly(Assembly.GetExecutingAssembly())
                .AddMediatR(Assembly.GetExecutingAssembly())
                .AddPipelines();

        private static IServiceCollection AddPipelines(
            this IServiceCollection services)
            => services
                .AddTransient(
                    typeof(IPipelineBehavior<,>),
                    typeof(PerformanceBehaviour<,>))
                .AddTransient(
                    typeof(IPipelineBehavior<,>),
                    typeof(ValidationBehavior<,>));

        private static IServiceCollection AddApplicationOptions(
            this IServiceCollection services,
            IConfiguration configuration)
            => services.AddOptions<JwtOptions>()
                .Bind(configuration.GetSection(JwtOptions.Jwt))
                .ValidateDataAnnotations()
                .Services;
    }
}