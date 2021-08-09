using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RawPotion.Meals.Application.Interfaces;

namespace Rawpotion.Meals.Api.Controllers.User
{
    [ApiController]
    [Route("/api/user")]
    [AllowAnonymous]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public record RegisterUserRequest
        {
            [Required] public string Username { get; init; }
            [Required] public string Email { get; init; }
            [Required] public string Password { get; init; }
        };

        public record RegisterUserResponse(
            [property: Required] int Id,
            [property: Required] string Username);

        [HttpPost(Name = "Register user account")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RegisterUserResponse))]
        public async Task<ActionResult<RegisterUserResponse>> RegisterUserAsync([FromBody] RegisterUserRequest request)
        {
            var user = await _userRepository
                .RegisterAsync(
                    request.Username,
                    request.Email,
                    request.Password);

            return Ok(new RegisterUserResponse(user.Id, user.Username));
        }

    }
}