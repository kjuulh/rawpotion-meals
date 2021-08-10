using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RawPotion.Meals.Application.Interfaces;
using RawPotion.Meals.Application.Interfaces.Groups;
using RawPotion.Meals.Domain.Entities;

namespace Rawpotion.Meals.Api.Controllers.User
{
    [ApiController]
    [Route("/api/user")]
    [AllowAnonymous]
    public class UserController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IUserRepository _userRepository;

        public UserController(
            IUserRepository userRepository,
            IGroupRepository groupRepository)
        {
            _userRepository = userRepository;
            _groupRepository = groupRepository;
        }

        public record RegisterUserRequest
        {
            [Required]
            public string Username { get; init; }

            [Required]
            public string Email { get; init; }

            [Required]
            public string Password { get; init; }
        }

        public record RegisterUserResponse(
            [property: Required] int Id,
            [property: Required] string Username);

        [HttpPost(Name = "Register user account")]
        [ProducesResponseType(
            StatusCodes.Status200OK,
            Type = typeof(RegisterUserResponse))]
        public async Task<ActionResult<RegisterUserResponse>>
            RegisterUserAsync(
                [FromBody] RegisterUserRequest request)
        {
            var user = await _userRepository
                .RegisterAsync(
                    request.Username,
                    request.Email,
                    request.Password);

            return Ok(
                new RegisterUserResponse(
                    user.Id,
                    user.Username));
        }

        public record UserDto
        {
            [Required]
            public int Id { get; set; }
            [Required]
            public string Username { get; set; }
            [Required]
            public string Email { get; set; }
        }

        public record GroupDto
        {
            [Required]
            public int Id { get; set; }
            [Required]
            public string Name { get; set; }
            [Required]
            public UserDto Admin { get; set; }
            [Required]
            public IEnumerable<UserDto> Members { get; set; }
        }

        [HttpGet("{userId}/groups", Name = "Get Groups For User")]
        public async Task<ActionResult<IEnumerable<GroupDto>>>
            GetGroupsForUserAsync(int userId)
        {
            IEnumerable<Group> groups =
                await _groupRepository.GetGroupsForUserAsync(userId);
            return Ok(
                groups.Select(
                    g => new GroupDto()
                    {
                        Id = g.Id,
                        Name = g.Name,
                        Admin = new()
                        {
                            Id = g.Admin.Id,
                            Username = g.Admin.Username,
                            Email = g.Admin.Email,
                        },
                        Members = g.Members.Select(
                            m => new UserDto
                            {
                                Id = m.Id,
                                Username = m.Username,
                                Email = m.Email
                            })
                    }));
        }
    }
}