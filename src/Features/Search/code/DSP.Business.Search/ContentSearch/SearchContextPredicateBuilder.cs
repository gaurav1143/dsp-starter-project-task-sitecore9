using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DSP.Business.Search.Predicates;
using DSP.Business.Search.SearchContext;
using Sitecore.ContentSearch.Linq.Utilities;

namespace DSP.Business.Search.ContentSearch
{
    public class SearchContextPredicateBuilder
    {
        private readonly ISearchTermProvider _searchTermProvider;

        public SearchContextPredicateBuilder(ISearchTermProvider searchTermProvider)
        {
            _searchTermProvider = searchTermProvider;
        }

        public Expression<Func<T, bool>> Build<T>(ISearchContext context)
            where T: LuceneSearchResultItem
        {
            var where = PredicateBuilder.True<T>();

            where = Query(where, context.Query.Value);
            where = SelectedFacetValues(where, context.SelectedFacetValues.Value,
                context.SelectedFacetValuesSearchOperator.Value);
            
            return where;
        }

        private static Expression<Func<T, bool>> SelectedFacetValues<T>(Expression<Func<T, bool>> where, IEnumerable<string> value, SearchOperator searchOperator)
            where T : LuceneSearchResultItem
        {
            if (value == null) return where;

            var tagValues = value as string[] ?? value.ToArray();

            switch (searchOperator)
            {
                case SearchOperator.And:
                    return where
                        .AndAllContentTags(tagValues)
                        .AndAllAutomatedTags(tagValues);
                    
                case SearchOperator.Or:
                    return where
                        .OrAnyContentTags(tagValues)
                        .OrAnyAutomatedTags(tagValues);
                    
                default:
                    return where
                        .AndAllContentTags(tagValues)
                        .AndAllAutomatedTags(tagValues);
            }
        }

        private Expression<Func<T, bool>> Query<T>(Expression<Func<T, bool>> where, string value)
            where T: LuceneSearchResultItem
        {
            if (string.IsNullOrWhiteSpace(value)) return where;

            var terms = _searchTermProvider.GetTermsFromQuery(value).ToList();

            return where.AndAllContentOrBoostedContent(terms);
        }
    }
}
