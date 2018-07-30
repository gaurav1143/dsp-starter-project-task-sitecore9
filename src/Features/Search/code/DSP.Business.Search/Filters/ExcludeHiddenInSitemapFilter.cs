using System;

namespace DSP.Business.Search.Filters
{
    using System.Linq.Expressions;
    using ContentSearch;

    class ExcludeHiddenInSitemapFilter<T> : ISearchFilter<T> where T : LuceneSearchResultItem
    {
        public Expression<Func<T, bool>> Filter()
        {
            return result => !result.IsHiddenFromSitemap;
        }
    }
}
