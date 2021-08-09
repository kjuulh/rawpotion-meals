using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RawPotion.Meals.Domain.Entities;

namespace RawPotion.Meals.Application.Interfaces
{
    public interface IApplicationDbContext
    {
        public DbSet<User> User { get; set; }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = new ());
    }
}