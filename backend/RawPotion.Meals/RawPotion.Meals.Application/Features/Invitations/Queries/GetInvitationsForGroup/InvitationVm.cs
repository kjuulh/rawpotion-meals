using System.ComponentModel.DataAnnotations;
using RawPotion.Meals.Application.Common.Mappings;
using RawPotion.Meals.Application.Features.Groups.Queries.GetGroupsForUser;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Features.Invitations.Queries.
    GetInvitationsForGroup
{
    public class InvitationVm : IMapFrom<Invitation>
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public GroupVm Group { get; set; }

        [Required]
        public bool Enabled { get; set; }
    }
}