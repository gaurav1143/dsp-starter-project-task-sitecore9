using System.Collections.Generic;
using System.Linq;
using DSP.Business.Search.ContentSearch;
using DSP.Business.Search.ContentSearch.SearchResults;
using DSP.Business.Search.Filters;
using DSP.Business.Search.Paging;
using DSP.Business.Search.Predicates;
using DeloitteDigital.Atlas.Extensions;
using DeloitteDigital.Atlas.Logging;
using Sitecore.ContentSearch;
using Sitecore.Data;
using Sitecore.Sites;
using ISearchResult = DSP.Business.Search.ContentSearch.SearchResults.ISearchResult;

namespace DSP.Business.Search.ItemSearch
{
    public class ItemSearch : IItemSearch
    {
        private readonly SearchResultFactory _searchResultFactory;
        private readonly ILogService _log;

        public ItemSearch(SearchResultFactory searchResultFactory, ILogService log)
        {
            _searchResultFactory = searchResultFactory;
            _log = log;
        }

        public PagedSearchResult<ISearchResult> Search(params ID[] ids)
        {
            using (_log.WithLogScope(this))
            {
                var pageSize = ids.Count();

                using (
                    var context =
                        ContentSearchManager.GetIndex(SiteContext.Current.GetIndexName()).CreateSearchContext())
                {
                    // just get the results back based on the item ids, no predicate, no sorting
                    var queryable = context
                        .GetQueryable<LuceneSearchResultItem>()
                        .AddFilter(GetFilter(ids));

                    // execute query
                    return _searchResultFactory.ToPagedSearchResult(queryable, new PaginationOptions(1, pageSize));
                }
            }
        }

        private static ISearchFilter<LuceneSearchResultItem> GetFilter(IEnumerable<ID> ids)
        {
            return new OrAnyAggregateFilter<LuceneSearchResultItem>(
                ids.Select(id => new ItemFilter<LuceneSearchResultItem>(id)).ToList());
        }
    }
}
