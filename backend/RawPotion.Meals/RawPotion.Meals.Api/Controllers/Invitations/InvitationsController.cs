using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RawPotion.Meals.Application.Features.Invitations.Commands.
    CreateInvitationForGroup;
using RawPotion.Meals.Application.Features.Invitations.Commands.JoinGroupUsingInvitation;
using RawPotion.Meals.Application.Features.Invitations.Queries.
    GetInvitationForGroup;
using RawPotion.Meals.Application.Features.Invitations.Queries.
    GetInvitationsForGroup;

namespace Rawpotion.Meals.Api.Controllers.Invitations
{
    [Route("api/group/{groupId}/invitations")]
    public class InvitationsController : BaseApiController
    {
        [HttpGet(Name = "Get invitations for group")]
        public async Task<InvitationsVm> GetInvitationsForGroup(
            [FromRoute] int groupId)
            => await Mediator.Send(
                new GetInvitationsForGroupQuery {GroupId = groupId});

        [AllowAnonymous]
        [HttpGet("{invitationId}", Name = "Get invitation for group")]
        public async Task<InvitationVm> GetInvitationForGroup(
            [FromRoute] int groupId,
            [FromRoute] int invitationId)
            => await Mediator.Send(
                new GetInvitationForGroupQuery()
                {
                    GroupId = groupId, InvitationId = invitationId
                });


        [HttpPost(Name = "Create invitation for group")]
        public async Task<InvitationVm> CreateInvitationForGroupAsync(
            [FromRoute] int groupId)
            => await Mediator.Send(
                new CreateInvitationForGroupCommand() {GroupId = groupId});

        [HttpPut(
            "{invitationId}/join-group",
            Name = "Join group using invitation")]
        public async Task<bool> JoinGroupUsingInvitationAsync(
            [FromRoute] int groupId,
            [FromRoute] int invitationId)
            => await Mediator.Send(
                new JoinGroupUsingInvitationCommand()
                {
                    GroupId = groupId, InvitationId = invitationId
                });
    }
}