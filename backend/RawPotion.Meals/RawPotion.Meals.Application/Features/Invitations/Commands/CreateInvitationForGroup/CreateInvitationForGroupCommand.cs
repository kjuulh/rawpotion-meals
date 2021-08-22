using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using RawPotion.Meals.Application.Common.Exceptions;
using RawPotion.Meals.Application.Features.Invitations.Queries.
    GetInvitationsForGroup;
using RawPotion.Meals.Application.Interfaces.Authentication;
using RawPotion.Meals.Application.Interfaces.Groups;
using RawPotion.Meals.Application.Interfaces.Invitations;

namespace RawPotion.Meals.Application.Features.Invitations.Commands.
    CreateInvitationForGroup
{
    public class CreateInvitationForGroupCommand : IRequest<InvitationVm>
    {
        [Required]
        public int GroupId { get; set; }

        internal class Handler
            : IRequestHandler<CreateInvitationForGroupCommand, InvitationVm>
        {
            private readonly IInvitationsRepository _invitationsRepository;
            private readonly IGroupRepository _groupRepository;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUserService;

            public Handler(
                IInvitationsRepository invitationsRepository,
                IGroupRepository groupRepository,
                IMapper mapper,
                ICurrentUserService currentUserService)
            {
                _invitationsRepository = invitationsRepository;
                _groupRepository = groupRepository;
                _mapper = mapper;
                _currentUserService = currentUserService;
            }

            public async Task<InvitationVm> Handle(
                CreateInvitationForGroupCommand request,
                CancellationToken cancellationToken)
            {
                var userId = _currentUserService.UserId;
                var group =
                    await _groupRepository.GetGroupByIdAsync(request.GroupId);

                if (group is null)
                    throw new NotFoundException("group", request.GroupId);

                if (group.Admin.Id != userId)
                    throw new NotAuthorizedException();

                var invitation = await _invitationsRepository.CreateInvitation(
                    request.GroupId);

                return _mapper.Map<InvitationVm>(invitation);
            }
        }
    }
}