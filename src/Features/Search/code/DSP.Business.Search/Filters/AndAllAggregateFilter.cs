using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Sitecore.ContentSearch.Linq.Utilities;
using Sitecore.ContentSearch.SearchTypes;

namespace DSP.Business.Search.Filters
{
    public class AndAllAggregateFilter<T> : ISearchFilter<T>
        where T : SearchResultItem
    {
        private readonly Expression<Func<T, bool>> _predicate;

        public AndAllAggregateFilter(IEnumerable<ISearchFilter<T>> filters)
        {
            _predicate = PredicateBuilder.True<T>();

            foreach (var filter in filters)
            {
                _predicate = _predicate.And(filter.Filter());
            }
        }

        public Expression<Func<T, bool>> Filter()
        {
            return _predicate;
        }
    }
}
