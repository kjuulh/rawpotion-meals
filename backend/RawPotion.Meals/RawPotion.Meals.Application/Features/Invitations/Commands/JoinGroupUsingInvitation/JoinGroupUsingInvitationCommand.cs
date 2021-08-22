using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using RawPotion.Meals.Application.Features.Invitations.Queries.
    GetInvitationsForGroup;
using RawPotion.Meals.Application.Interfaces.Authentication;
using RawPotion.Meals.Application.Interfaces.Invitations;

namespace RawPotion.Meals.Application.Features.Invitations.Commands.
    JoinGroupUsingInvitation
{
    public class JoinGroupUsingInvitationCommand : IRequest<bool>
    {
        [Required]
        public int InvitationId { get; set; }

        [Required]
        public int GroupId { get; set; }

        internal class Handler
            : IRequestHandler<JoinGroupUsingInvitationCommand, bool>
        {
            private readonly IInvitationsService _invitationsService;
            private readonly ICurrentUserService _currentUserService;

            public Handler(
                IInvitationsService invitationsService,
                ICurrentUserService currentUserService)
            {
                _invitationsService = invitationsService;
                _currentUserService = currentUserService;
            }

            public async Task<bool> Handle(
                JoinGroupUsingInvitationCommand request,
                CancellationToken cancellationToken)
            {
                var result =
                    await _invitationsService.LetUserJoinGroupUsingInvitation(
                        _currentUserService.UserId,
                        request.InvitationId,
                        request.GroupId);

                return result;
            }
        }
    }
}