using System.Collections.Generic;

namespace RawPotion.Meals.Application.Features.Groups.Queries.GetGroupsForUser
{
    public class GroupsVm
    {
        public IEnumerable<GroupVm> Groups { get; set; }
    }
}