using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using RawPotion.Meals.Application.Features.Groups.Queries.GetGroupsForUser;
using RawPotion.Meals.Application.Interfaces.Authentication;
using RawPotion.Meals.Application.Interfaces.Groups;

namespace RawPotion.Meals.Application.Features.Groups.Commands.CreateGroup
{
    public class CreateGroupCommand : IRequest<GroupVm>
    {
        [Required]
        public string Name { get; set; }
    }

    public class CreateGroupCommandHandler
        : IRequestHandler<CreateGroupCommand, GroupVm>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IGroupRepository _groupRepository;
        private readonly IMapper _mapper;

        public CreateGroupCommandHandler(
            ICurrentUserService currentUserService,
            IGroupRepository groupRepository,
            IMapper mapper)
        {
            _currentUserService = currentUserService;
            _groupRepository = groupRepository;
            _mapper = mapper;
        }

        public async Task<GroupVm> Handle(
            CreateGroupCommand request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            var group =
                await _groupRepository.CreateGroupForUserAsync(
                    userId,
                    request.Name);

            return _mapper.Map<GroupVm>(group);
        }
    }
}