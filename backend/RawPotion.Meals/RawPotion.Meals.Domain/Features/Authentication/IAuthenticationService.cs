using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace RawPotion.Meals.Domain.Features.Authentication
{
    public interface IAuthenticationService
    {
        Task<(string AccessToken, string RefreshToken, int UserId)>
            Authenticate(
                string email,
                string password,
                string ipAddress);

        Task<(AuthenticationResponse authenticateResponse, string
            refreshToken)> RefreshToken(
            string? refreshToken,
            string? ipAddress);
    }

    public class AuthenticationResponse
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string AccessToken { get; set; }
    }
}