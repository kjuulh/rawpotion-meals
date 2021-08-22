using System;
using System.Linq;
using System.Threading.Tasks;
using RawPotion.Meals.Application.Common.Exceptions;
using RawPotion.Meals.Application.Interfaces.Groups;

namespace RawPotion.Meals.Application.Interfaces.Invitations
{
    class InvitationsService : IInvitationsService
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IInvitationsRepository _invitationsRepository;

        public InvitationsService(
            IGroupRepository groupRepository,
            IInvitationsRepository invitationsRepository)
        {
            _groupRepository = groupRepository;
            _invitationsRepository = invitationsRepository;
        }

        public async Task<bool> LetUserJoinGroupUsingInvitation(
            int userId,
            int invitationId,
            int groupId)
        {
            var group = await _groupRepository.GetGroupByIdAsync(groupId);

            var invitation =
                await _invitationsRepository.GetInvitationForGroupAsync(
                    invitationId,
                    groupId);

            if (group is null ||
                invitation is null)
                throw new NotFoundException(
                    "group||invitation",
                    "was not found");

            if (group.Members.Any(m => m.Id == userId))
                throw new ApplicationException("user is already part of group");

            var groupResult = await _groupRepository.AddUserToGroupAsync(group.Id, userId);

            return groupResult.Members.Any(m => m.Id == userId);
        }
    }
}