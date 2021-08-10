using System.Collections.Generic;
using System.Threading.Tasks;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Interfaces.Groups
{
    public interface IGroupRepository
    {
        Task<IEnumerable<Group>> GetGroupsForUserAsync(
            int userId);

        Task<Group> CreateGroupForUserAsync(int userId, string name);
    }
}