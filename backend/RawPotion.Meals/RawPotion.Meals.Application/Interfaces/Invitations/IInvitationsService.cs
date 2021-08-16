using System.Threading.Tasks;

namespace RawPotion.Meals.Application.Interfaces.Invitations
{
    public interface IInvitationsService
    {
        Task<bool> LetUserJoinGroupUsingInvitation(
            int userId,
            int invitationId,
            int groupId);
    }
}