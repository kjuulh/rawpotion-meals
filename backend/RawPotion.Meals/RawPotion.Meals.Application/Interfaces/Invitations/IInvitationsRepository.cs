using System.Collections.Generic;
using System.Threading.Tasks;
using RawPotion.Meals.Application.Features.Invitations.Queries.GetInvitationsForGroup;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Interfaces.Invitations
{
    public interface IInvitationsRepository
    {
        Task<IEnumerable<Invitation>?> GetInvitationsForGroupAsync(int groupId);
        Task<Invitation> CreateInvitation(int groupId);
    }
}