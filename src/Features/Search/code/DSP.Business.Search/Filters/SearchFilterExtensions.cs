using System;
using System.Collections.Generic;
using System.Linq;

namespace DSP.Business.Search.Filters
{
    using System.Linq.Expressions;

    using Sitecore.ContentSearch.Linq.Utilities;
    using Sitecore.ContentSearch.SearchTypes;

    public static class SearchFilterExtensions
    {
        public static Expression<Func<T, bool>> AndAll<T>(this IEnumerable<ISearchFilter<T>> filters) where T : SearchResultItem
        {
            if (filters == null) return PredicateBuilder.True<T>(); 

            var searchFilters = filters as ISearchFilter<T>[] ?? filters.ToArray();

            if (!searchFilters.Any()) return PredicateBuilder.True<T>(); ;

            var predicate = PredicateBuilder.True<T>();

            foreach (var filter in searchFilters)
            {
                predicate = predicate.And(filter.Filter());
            }

            return predicate;

        }

        public static Expression<Func<T, bool>> OrAny<T>(this IEnumerable<ISearchFilter<T>> filters) where T : SearchResultItem
        {
            if (filters == null) return PredicateBuilder.True<T>(); 

            var searchFilters = filters as ISearchFilter<T>[] ?? filters.ToArray();

            if (!searchFilters.Any()) return PredicateBuilder.True<T>(); ;

            var predicate = PredicateBuilder.False<T>();

            foreach (var filter in searchFilters)
            {
                predicate = predicate.Or(filter.Filter());
            }

            return predicate;
        }
    }
}
