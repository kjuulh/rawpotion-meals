using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Rawpotion.Meals.Api
{
    public class Program
    {
        public static void Main(
            string[] args)
        {
            CreateHostBuilder(args)
                .Build()
                .Run();
        }

        public static IHostBuilder CreateHostBuilder(
            string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(((context, builder) =>
                {
                    builder.AddEnvironmentVariables();
                }))
                .ConfigureWebHostDefaults(
                    webBuilder => { webBuilder.UseStartup<Startup>(); });
        }
    }
}