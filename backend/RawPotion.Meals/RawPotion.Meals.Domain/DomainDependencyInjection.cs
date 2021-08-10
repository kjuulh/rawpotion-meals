using Microsoft.Extensions.DependencyInjection;

namespace RawPotion.Meals.Domain
{
    public static class DomainDependencyInjection
    {
        public static IServiceCollection AddDomain(
            this IServiceCollection services)
        {
            return services;
        }
    }
}