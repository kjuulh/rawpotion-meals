using RawPotion.Meals.Application.Common.Mappings;
using RawPotion.Meals.Application.Features.Groups.Queries.GetGroupsForUser;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Features.Invitations.Queries.
    GetInvitationsForGroup
{
    public class InvitationVm : IMapFrom<Invitation>
    {
        public int Id { get; set; }

        public GroupVm Group { get; set; }

        public bool Enabled { get; set; }
    }
}