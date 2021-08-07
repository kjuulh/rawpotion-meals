using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rawpotion.Meals.Application.Interfaces;
using RawPotion.Meals.Domain.Entities;

namespace Rawpotion.Meals.Api.Controllers
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

        public record RegisterUserRequest(
            [property: Required] string Username,
            [property: Required] string Email,
            [property: Required] string Password);

        public record RegisterUserResponse(
            [property: Required] int Id,
            [property: Required] string Username);

        /// <summary>
        /// Registers A User
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST /api/user
        ///     {
        ///         "username": "kjuulh",
        ///         "email": "kjuulh@example.com",
        ///         "password": "somethingsecret123!"
        ///     }
        /// </remarks>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost(Name = "Create user")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RegisterUserResponse))]
        public async Task<ActionResult<RegisterUserResponse>> RegisterUserAsync([FromBody] RegisterUserRequest request)
        {
            var user = await _userRepository
                .RegisterAsync(
                    request.Username,
                    request.Email,
                    request.Password);

            if (user is null)
                return BadRequest("Could not create user");

            return Ok(new RegisterUserResponse(user.Id, user.Username));
        }
    }
}