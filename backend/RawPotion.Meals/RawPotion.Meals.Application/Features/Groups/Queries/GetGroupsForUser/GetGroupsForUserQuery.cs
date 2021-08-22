using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using RawPotion.Meals.Application.Common.Mappings;
using RawPotion.Meals.Application.Interfaces.Groups;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Features.Groups.Queries.GetGroupsForUser
{
    public class GetGroupsForUserQuery : IRequest<GroupsVm>
    {
        [Required]
        public int UserId { get; set; }
    }

    public class GetGroupsForUserQueryHandler
        : IRequestHandler<GetGroupsForUserQuery, GroupsVm>
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IMapper _mapper;

        public GetGroupsForUserQueryHandler(
            IGroupRepository groupRepository,
            IMapper mapper)
        {
            _groupRepository = groupRepository;
            _mapper = mapper;
        }

        public async Task<GroupsVm> Handle(
            GetGroupsForUserQuery request,
            CancellationToken cancellationToken)
        {
            var groups =
                await _groupRepository.GetGroupsForUserAsync(request.UserId);

            return new GroupsVm()
            {
                Groups =
                    groups.ProjectToIEnumerableOf<Group, GroupVm>(_mapper)
            };
        }
    }
}