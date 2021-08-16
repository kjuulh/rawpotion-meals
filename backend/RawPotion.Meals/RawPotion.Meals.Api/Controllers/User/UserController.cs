using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RawPotion.Meals.Application.Features.Groups.Queries.GetGroupsForUser;
using RawPotion.Meals.Application.Features.Users.Commands.RegisterUser;
using RawPotion.Meals.Application.Features.Users.Queries.GetUserById;
using RawPotion.Meals.Application.Interfaces;
using RawPotion.Meals.Application.Interfaces.Groups;

namespace Rawpotion.Meals.Api.Controllers.User
{
    [Route("/api/user")]
    [AllowAnonymous]
    public class UserController : BaseApiController
    {
        [HttpPost(Name = "Register user account")]
        public async Task<UserVm> RegisterUserAsync(
            [FromBody] RegisterUserCommand request)
            => await Mediator.Send(request);


        [HttpGet("{userId}/groups", Name = "Get Groups For User")]
        public async Task<ActionResult<GroupsVm>>
            GetGroupsForUserAsync(int userId)
            => await Mediator.Send(
                new GetGroupsForUserQuery() {UserId = userId});

        [HttpGet("{userId}", Name = "Get user by id")]
        public async Task<UserVm> GetUserByIdAsync(
            [FromRoute] int userId)
            => await Mediator.Send(new GetUserByIdQuery {UserId = userId});
    }
}