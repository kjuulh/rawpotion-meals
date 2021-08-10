using System.Linq;
using Microsoft.AspNetCore.Http;
using RawPotion.Meals.Application.Interfaces.Authentication;
using RawPotion.Meals.Domain.Entities;

namespace Rawpotion.Meals.Api.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int UserId
            => int.Parse(
                _httpContextAccessor.HttpContext?.User.Claims
                    .SingleOrDefault(c => c.Type.Contains("nameidentifier"))
                    ?.Value);
    }
}