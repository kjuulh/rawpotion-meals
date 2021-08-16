using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using RawPotion.Meals.Application.Common.Exceptions;
using RawPotion.Meals.Application.Common.Mappings;
using RawPotion.Meals.Application.Interfaces.Authentication;
using RawPotion.Meals.Application.Interfaces.Invitations;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Features.Invitations.Queries.
    GetInvitationsForGroup
{
    public class GetInvitationsForGroupQuery : IRequest<InvitationsVm>
    {
        public int GroupId { get; set; }
    }

    public class GetInvitationsForGroupQueryHandler
        : IRequestHandler<GetInvitationsForGroupQuery, InvitationsVm>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IInvitationsRepository _invitationsRepository;
        private readonly IMapper _mapper;

        public GetInvitationsForGroupQueryHandler(
            ICurrentUserService currentUserService,
            IInvitationsRepository invitationsRepository,
            IMapper mapper)
        {
            _currentUserService = currentUserService;
            _invitationsRepository = invitationsRepository;
            _mapper = mapper;
        }

        public async Task<InvitationsVm> Handle(
            GetInvitationsForGroupQuery request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            var invitations =
                await _invitationsRepository.GetInvitationsForGroupAsync(
                    request.GroupId);

            if (invitations is null)
                throw new NotFoundException("group", request.GroupId);

            var invitationsList = invitations.ToList();
            if (!invitationsList.Any())
                return new InvitationsVm()
                {
                    Invitations = new List<InvitationVm>()
                };

            if (invitationsList.Any(i => i.Group.AdminId != userId))
                throw new NotAuthorizedException();

            return new InvitationsVm()
            {
                Invitations = invitationsList
                    .ProjectToIEnumerableOf<Invitation, InvitationVm>(_mapper)
            };
        }
    }
}