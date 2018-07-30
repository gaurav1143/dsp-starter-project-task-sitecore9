using System;
using System.Collections.Generic;

namespace DSP.Business.Search.Filters
{
    using System.Linq.Expressions;

    using Sitecore.ContentSearch.Linq.Utilities;
    using Sitecore.ContentSearch.SearchTypes;

    public class OrAnyAggregateFilter<T> : ISearchFilter<T>
        where T : SearchResultItem
    {
        private readonly Expression<Func<T, bool>> _predicate;

        public OrAnyAggregateFilter(IEnumerable<ISearchFilter<T>> filters)
        {
            _predicate = PredicateBuilder.False<T>();

            foreach (var filter in filters)
            {
                _predicate = _predicate.Or(filter.Filter());
            }
        }

        public Expression<Func<T, bool>> Filter()
        {
            return _predicate;
        }
    }
}
