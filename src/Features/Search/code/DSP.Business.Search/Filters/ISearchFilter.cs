namespace DSP.Business.Search.Filters
{
    using System;
    using System.Linq.Expressions;

    using Sitecore.ContentSearch.SearchTypes;

    public interface ISearchFilter<TSource> where TSource : SearchResultItem
    {
        // note that Func<T, bool> is in fact a Predicate by definition
        Expression<Func<TSource, bool>> Filter();
    }
}
