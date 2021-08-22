using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RawPotion.Meals.Application.Interfaces;
using RawPotion.Meals.Application.Interfaces.Groups;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Persistence.Features
{
    public class GroupRepository : IGroupRepository
    {
        private readonly IApplicationDbContext _context;

        public GroupRepository(
            IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Group>> GetGroupsForUserAsync(
            int userId)
        {
            return await _context.Groups.Include(g => g.Members)
                .Include(g => g.Admin)
                .AsSplitQuery()
                .Where(g => g.Members.Any(m => m.Id == userId))
                .ToListAsync();
        }

        public async Task<Group> CreateGroupForUserAsync(
            int userId,
            string name)
        {
            var user = await _context.User.FindAsync(userId);
            if (user is null)
                throw new InvalidOperationException(
                    "Could not find a valid user");

            var group = _context.Groups.Add(
                new()
                {
                    Name = name,
                    Admin = user,
                    Members = new List<User>() {user},
                });

            await _context.SaveChangesAsync();

            return group.Entity;
        }

        public async Task<Group?> GetGroupByIdAsync(int groupId)
            => await _context.Groups.Include(g => g.Admin)
                .Include(g => g.Members)
                .Include(g => g.Meals)
                .ThenInclude(m => m.Group)
                .AsSplitQuery()
                .SingleOrDefaultAsync(g => g.Id == groupId);

        public async Task<Group> AddUserToGroupAsync(int groupId, int userId)
        {
            var group = await _context
                .Groups
                .Include(g => g.Members)
                .SingleAsync(g => g.Id == groupId);

            var user = await _context.User.SingleAsync(u => u.Id == userId);
            group.Members.Add(user);

            await _context.SaveChangesAsync();

            return group;
        }
    }
}