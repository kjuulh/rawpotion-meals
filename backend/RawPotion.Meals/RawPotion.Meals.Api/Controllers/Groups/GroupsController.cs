using System.ComponentModel.DataAnnotations;
using System.Linq;
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

        [HttpGet("{groupId}", Name = "Get group by id")]
        public async Task<ActionResult<UserController.GroupDto>>
            GetGroupByIdAsync(
                int groupId)
        {
            var group = await _groupRepository.GetGroupByIdAsync(groupId);
            if (group is null)
                return NotFound(groupId);

            return Ok(
                new UserController.GroupDto()
                {
                    Id = group.Id,
                    Admin = new UserController.UserDto()
                    {
                        Email = group.Admin.Email,
                        Id = group.Admin.Id,
                        Username = group.Admin.Username
                    },
                    Members = group.Members.Select(
                        m => new UserController.UserDto()
                        {
                            Id = m.Id,
                            Email = m.Email,
                            Username = m.Username
                        }),
                    Name = group.Name
                });
        }
    }
}