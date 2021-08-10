using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rawpotion.Meals.Api.Controllers.User;
using RawPotion.Meals.Application.Interfaces.Authentication;
using RawPotion.Meals.Application.Interfaces.Groups;
using RawPotion.Meals.Domain.Entities;

namespace Rawpotion.Meals.Api.Controllers.Groups
{
    [Route("api/groups")]
    public class GroupsController : BaseApiController
    {
        private readonly IGroupRepository _groupRepository;
        private readonly ICurrentUserService _currentUserService;

        public GroupsController(
            IGroupRepository groupRepository,
            ICurrentUserService currentUserService)
        {
            _groupRepository = groupRepository;
            _currentUserService = currentUserService;
        }

        public record CreateGroupRequest
        {
            [Required]
            public string Name { get; set; }
        }

        [HttpPost(Name = "Create group")]
        public async Task<ActionResult<UserController.GroupDto>>
            CreateGroupAsync([FromBody] CreateGroupRequest createGroupRequest)
        {
            var userId = _currentUserService.UserId;
            Group group = await _groupRepository.CreateGroupForUserAsync(
                userId,
                createGroupRequest.Name);

            return Ok(
                new UserController.GroupDto()
                {
                    Id = group.Id, Name = group.Name
                });
        }
    }
}