using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RawPotion.Meals.Application.Features.Groups.Commands.CreateGroup;
using RawPotion.Meals.Application.Features.Groups.Queries.GetGroupById;
using RawPotion.Meals.Application.Features.Groups.Queries.GetGroupsForUser;

namespace Rawpotion.Meals.Api.Controllers.Groups
{
    [Route("api/groups")]
    public class GroupsController : BaseApiController
    {
        [HttpPost(Name = "Create group")]
        public async Task<GroupVm> CreateGroupAsync(
            [FromBody] CreateGroupCommand request)
            => await Mediator.Send(request);

        [HttpGet("{groupId}", Name = "Get group by id")]
        public async Task<GroupVm> GetGroupByIdAsync(int groupId)
            => await Mediator.Send(new GetGroupByIdQuery {GroupId = groupId});
    }
}