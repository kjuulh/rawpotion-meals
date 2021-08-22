using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace RawPotion.Meals.Application.Common.Mappings
{
    public static class MappingExtensions
    {
        public static Task<List<TDestination>> ProjectToListAsync<TDestination>(
            this IQueryable queryable,
            IConfigurationProvider configurationProvider)
            => queryable
                .ProjectTo<TDestination>(configurationProvider)
                .ToListAsync();

        public static IEnumerable<TDestination>
            ProjectToIEnumerableOf<TSource, TDestination>(
                this IEnumerable<TSource> enumerable,
                IMapper mapper)
            => enumerable.Select(s => mapper.Map<TDestination>(s));
    }
}