using System;
using System.IO;
using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Rawpotion.Meals.Api.Services;
using RawPotion.Meals.Application;
using RawPotion.Meals.Application.Interfaces.Authentication;
using RawPotion.Meals.Domain;
using RawPotion.Meals.Persistence;
using RawPotion.Meals.Persistence.Database;

namespace Rawpotion.Meals.Api
{
    public class Startup
    {
        public Startup(
            IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(
            IServiceCollection services)
        {
            var frontendBaseUrl =
                Configuration.GetValue<string>("FRONTEND_BASE_URL");

            services.AddControllers();

            services.AddCors(
                options =>
                {
                    options.AddDefaultPolicy(
                        builder => builder
                            .WithOrigins(
                                "http://localhost:3000",
                                frontendBaseUrl)
                            .AllowCredentials()
                            .AllowAnyHeader()
                            .AllowAnyMethod());
                });

            services
                .AddPersistence(Configuration)
                .AddApplication(Configuration)
                .AddDomain();

            services
                .AddAuthentication(
                    JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(
                    JwtBearerDefaults.AuthenticationScheme,
                    options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.IncludeErrorDetails = true;

                        var key = Encoding.ASCII.GetBytes(
                            Configuration.GetValue<string>(
                                "Jwt:Secret"));
                        options.TokenValidationParameters =
                            new TokenValidationParameters
                            {
                                ValidateIssuerSigningKey = true,
                                IssuerSigningKey =
                                    new SymmetricSecurityKey(key),
                                ValidateIssuer = false,
                                ValidateAudience = false,
                                ClockSkew = TimeSpan.Zero,
                                NameClaimType = "sub"
                            };
                    });

            services.AddAuthorization(options => { });

            services.AddHttpContextAccessor();

            services.AddScoped<ICurrentUserService, CurrentUserService>();

            services.AddSwaggerGen(
                c =>
                {
                    c.SwaggerDoc(
                        "v1",
                        new OpenApiInfo
                        {
                            Title = "Rawpotion.Meals.Api", Version = "v1"
                        });

                    var xmlFile =
                        $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    var xmlPath = Path.Combine(
                        AppContext.BaseDirectory,
                        xmlFile);
                    c.IncludeXmlComments(xmlPath);
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app,
            IWebHostEnvironment env,
            IServiceProvider serviceProvider)
        {
            app.UsePersistence(
                serviceProvider
                    .GetRequiredService<ApplicationDbContext>(),
                true);

            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.UseSwagger();
            app.UseSwaggerUI(
                c => c.SwaggerEndpoint(
                    "/swagger/v1/swagger.json",
                    "Rawpotion.Meals.Api v1"));

            app.UseCors();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(
                endpoints => { endpoints.MapControllers(); });
        }
    }
}