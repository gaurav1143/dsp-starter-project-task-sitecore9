using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using DSP.Business.Search.ContentSearch;
using Sitecore.Data;

namespace DSP.Business.Search.Filters
{
    public class CollectionFilter<T> : ISearchFilter<T>
        where T : LuceneSearchResultItem
    {
        private readonly IList<ISearchFilter<T>> filters;

        public CollectionFilter(ID itemId)
        {
            this.filters = new List<ISearchFilter<T>>
            {
                new OrAnyAggregateFilter<T>(new ISearchFilter<T>[]
                {
                    new HasRenderingFilter<T>(),
                    new SearchableMediaItemFilter<T>(),
                }),
                new ExcludeItemFilter<T>(itemId),
                new PathFilter<T>(itemId),
                new ExcludeHiddenFilter<T>(),
                new LanguageFilter<T>("en"),
                new LatestVersionFilter<T>()
            };
        }

        public Expression<Func<T, bool>> Filter()
        {
            return this.filters.AndAll();
        }
    }
}
