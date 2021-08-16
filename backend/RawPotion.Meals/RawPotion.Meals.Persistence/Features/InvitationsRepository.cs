using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RawPotion.Meals.Application.Features.Invitations.Queries.
    GetInvitationsForGroup;
using RawPotion.Meals.Application.Interfaces;
using RawPotion.Meals.Application.Interfaces.Invitations;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Persistence.Features
{
    public class InvitationsRepository : IInvitationsRepository
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public InvitationsRepository(
            IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<IEnumerable<Invitation>?> GetInvitationsForGroupAsync(
            int groupId)
        {
            Group? group = await _applicationDbContext.Groups
                .Include(g => g.Invitations)
                .SingleOrDefaultAsync(g => g.Id == groupId);

            return group?.Invitations;
        }

        public async Task<Invitation> CreateInvitation(int groupId)
        {
            var group =
                await _applicationDbContext.Groups.SingleOrDefaultAsync(
                    g => g.Id == groupId);

            var invitation = _applicationDbContext
                .Invitations
                .Add(
                    new Invitation()
                    {
                        Enabled = true, Group = group,
                    });

            await _applicationDbContext.SaveChangesAsync();

            return invitation.Entity;
        }
    }
}