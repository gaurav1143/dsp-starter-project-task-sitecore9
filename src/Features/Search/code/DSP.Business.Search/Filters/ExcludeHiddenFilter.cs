namespace DSP.Business.Search.Filters
{
    using System;
    using System.Linq.Expressions;

    using ContentSearch;

    public class ExcludeHiddenFilter<T> : ISearchFilter<T>
        where T : LuceneSearchResultItem
    {
        public Expression<Func<T, bool>> Filter()
        {            
            return result => !result.IsHiddenFromSearch;
        }
    }
}