using DeloitteDigital.Atlas.Caching;
using DeloitteDigital.Atlas.Mapping;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.Sorting.SortOptions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Compilation;

    using ContentSearch;    

    using Sitecore.Data;

    public class SortOptionRepository : ISortOptionRepository
    {
        private readonly ID sortOptionsRoot = new ID("{B18A7DF7-61BD-49B1-A590-3F67743C1C5A}");

        private readonly ICacheService cacheService;

        private readonly IItemMapper itemMapper;

        public SortOptionRepository(ICacheService cacheService, IItemMapper itemMapper)
        {
            this.cacheService = cacheService;
            this.itemMapper = itemMapper;
        }

        public IEnumerable<SortOrderOption> GetAll()
        {
            return this.cacheService.CreateOrGet(
                "DSP.Business.Search.Sorting.SortOptions", () => 
                    {
                        return Sitecore.Context.Database.GetItem(sortOptionsRoot)
                            .Children
                            .Select(i => itemMapper.Map<SortOrderOption>(i))
                            .ToList();
                    });
        }

        public SortOrderOption GetFromKey(string key)
        {
            return this.GetAll().FirstOrDefault(x => key.ToLowerInvariant().Equals(x.Key.ToLowerInvariant()));
        }

        public ISorter<LuceneSearchResultItem> GetSorter(ISortOrderOption sortOrderOption)
        {
            var typeToCreate = BuildManager.GetType(sortOrderOption.Type, true);
            return Activator.CreateInstance(typeToCreate) as ISorter<LuceneSearchResultItem>;
        }
    }
}
