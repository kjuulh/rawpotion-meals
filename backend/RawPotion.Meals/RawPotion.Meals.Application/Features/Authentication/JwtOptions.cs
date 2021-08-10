using System.ComponentModel.DataAnnotations;

namespace RawPotion.Meals.Application.Features.Authentication
{
    public class JwtOptions
    {
        public const string Jwt = "Jwt";

        [Required]
        public string Secret { get; init; } = default!;
    }
}