using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using RawPotion.Meals.Application.Common.Exceptions;
using RawPotion.Meals.Application.Features.Invitations.Queries.
    GetInvitationsForGroup;
using RawPotion.Meals.Application.Interfaces.Invitations;

namespace RawPotion.Meals.Application.Features.Invitations.Queries.
    GetInvitationForGroup
{
    public class GetInvitationForGroupQuery : IRequest<InvitationVm>
    {
        [Required]
        public int GroupId { get; set; }

        [Required]
        public int InvitationId { get; set; }

        internal class Handler
            : IRequestHandler<GetInvitationForGroupQuery, InvitationVm>
        {
            private readonly IInvitationsRepository _invitationsRepository;
            private readonly IMapper _mapper;

            public Handler(
                IInvitationsRepository invitationsRepository,
                IMapper mapper)
            {
                _invitationsRepository = invitationsRepository;
                _mapper = mapper;
            }

            public async Task<InvitationVm> Handle(
                GetInvitationForGroupQuery request,
                CancellationToken cancellationToken)
            {
                var invitation =
                    await _invitationsRepository.GetInvitationForGroupAsync(
                        request.InvitationId,
                        request.GroupId);

                if (invitation is null)
                    throw new NotFoundException("invitation", "was not found");

                return _mapper.Map<InvitationVm>(invitation);
            }
        }
    }
}