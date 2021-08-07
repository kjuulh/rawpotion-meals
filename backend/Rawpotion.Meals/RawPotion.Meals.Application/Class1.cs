using System;
using Microsoft.Extensions.DependencyInjection;

namespace Rawpotion.Meals.Application
{
    public static class ApplicationDependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services) => services;
    }
}