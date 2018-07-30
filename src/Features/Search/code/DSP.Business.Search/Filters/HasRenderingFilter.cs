namespace DSP.Business.Search.Filters
{
    using System;
    using System.Linq.Expressions;

    using DSP.Business.Search.ContentSearch;

    public class HasRenderingFilter<T> : ISearchFilter<T>
        where T : LuceneSearchResultItem
    {
        public Expression<Func<T, bool>> Filter()
        {         
            return result => result.HasRendering;
        }
    }
}