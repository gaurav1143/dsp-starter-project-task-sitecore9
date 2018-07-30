namespace DSP.Business.Search.Filters
{
    using System;
    using System.Linq.Expressions;

    using DSP.Business.Search.ContentSearch;

    public class LatestVersionFilter<T> : ISearchFilter<T>
        where T : LuceneSearchResultItem
    {
        public Expression<Func<T, bool>> Filter()
        {
            return c => c.IsLatestVersion;
        }
    }
}