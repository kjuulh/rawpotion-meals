using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using RawPotion.Meals.Application.Common.Exceptions;
using RawPotion.Meals.Application.Features.Groups.Queries.GetGroupsForUser;
using RawPotion.Meals.Application.Interfaces.Authentication;
using RawPotion.Meals.Application.Interfaces.Groups;

namespace RawPotion.Meals.Application.Features.Groups.Queries.GetGroupById
{
    public class GetGroupByIdQuery : IRequest<GroupVm>
    {
        [Required]
        public int GroupId { get; set; }
    }

    public class GetGroupByIdQueryHandler
        : IRequestHandler<GetGroupByIdQuery, GroupVm>
    {
        private readonly IGroupRepository _groupRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetGroupByIdQueryHandler(
            IGroupRepository groupRepository,
            ICurrentUserService currentUserService,
            IMapper mapper)
        {
            _groupRepository = groupRepository;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<GroupVm> Handle(
            GetGroupByIdQuery request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            var group =
                await _groupRepository.GetGroupByIdAsync(request.GroupId);

            if (group is null)
                throw new NotFoundException("group", request.GroupId);

            if (!group.Members.Any(m => m.Id == userId))
                throw new NotAuthorizedException("group", userId);

            return _mapper.Map<GroupVm>(group);
        }
    }
}