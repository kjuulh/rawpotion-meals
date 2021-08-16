using System.Collections.Generic;

namespace RawPotion.Meals.Application.Features.Invitations.Queries.GetInvitationsForGroup
{
    public class InvitationsVm
    {
        public IEnumerable<InvitationVm> Invitations { get; set; }
    }
}