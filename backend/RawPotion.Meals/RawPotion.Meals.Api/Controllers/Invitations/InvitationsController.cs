using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RawPotion.Meals.Application.Features.Invitations.Commands.
    CreateInvitationForGroup;
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

        [HttpPost(Name = "Create invitation for group")]
        public async Task<InvitationVm> CreateInvitationForGroupAsync(
            [FromRoute] int groupId)
            => await Mediator.Send(
                new CreateInvitationForGroupCommand() {GroupId = groupId});
    }
}