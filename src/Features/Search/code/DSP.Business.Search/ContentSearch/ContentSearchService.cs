namespace DSP.Business.Search.ContentSearch
{
    using System.Linq;

    using SearchResults;

    using DeloitteDigital.Atlas.Extensions;

    using Filters;
    using Predicates;
    using Paging;
    using SearchContext;
    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.Linq;
    using Sitecore.ContentSearch.Linq.Utilities;
    using Sitecore.Sites;

    using ISearchResult = SearchResults.ISearchResult;

    public class ContentSearchService : IContentSearchService
    {
        private readonly SearchResultFactory _searchResultFactory;
        private readonly SearchContextPredicateBuilder _predicateBuilder;
        private readonly SearchContextFilterBuilder _filterBuilder;
        private readonly ISearchTermProvider _searchTermProvider;

        public ContentSearchService(SearchResultFactory searchResultFactory, SearchContextPredicateBuilder predicateBuilder, 
            SearchContextFilterBuilder filterBuilder, ISearchTermProvider searchTermProvider)
        {
            _searchResultFactory = searchResultFactory;
            _predicateBuilder = predicateBuilder;
            _filterBuilder = filterBuilder;
            _searchTermProvider = searchTermProvider;
        }

        public PagedSearchResult<ISearchResult> Search(ISearchContext searchContext, SiteContext siteContext, bool isCollectionSearch = false)
        {
            using (var context = ContentSearchManager.GetIndex(SiteContext.Current.GetIndexName()).CreateSearchContext())
            {
                var paginationOptions = searchContext.PaginationOptions ?? new PaginationOptions();
                var query = context.GetQueryable<LuceneSearchResultItem>();
                var predicate = _predicateBuilder.Build<LuceneSearchResultItem>(searchContext);

                var queryable = _filterBuilder.Build(query, searchContext, siteContext, isCollectionSearch);
                queryable = queryable.Where(predicate);

                // change this to just result.ContentTags if you do not want hierarchical faceting
                queryable = queryable.FacetOn(result => result.ContentTagsFacet);
                queryable = queryable.FacetOn(result => result.AutomatedTags);

                // sorting 
                var sorter = searchContext.GetSorter();
                queryable = sorter.Sort(queryable);

                // execute query
                return _searchResultFactory.ToPagedSearchResult(queryable, paginationOptions);
            }
        }

        public PagedSearchResult<ISearchResult> SearchAhead(string query, SiteContext siteContext, PaginationOptions paginationOptions = null)
        {
            if (paginationOptions == null)
            {
                paginationOptions = new PaginationOptions { PageNumber = 1, PageSize = 4 };
            }

            var terms = _searchTermProvider.GetTermsFromQuery(query).ToList();

            // must provide some search terms
            if (!terms.Any())
            {
                return new PagedSearchResult<ISearchResult>(paginationOptions.PageNumber, paginationOptions.PageSize);
            }

            var predicate = PredicateBuilder.True<LuceneSearchResultItem>();
            // change to AndAllAutocomplete for simple autocomplete (no search ahead)
            predicate = predicate.AndAllContentOrBoostedContentOrAutocompleteTitle(terms);

            using (var context = ContentSearchManager.GetIndex(SiteContext.Current.GetIndexName()).CreateSearchContext())
            {
                var queryable = context.GetQueryable<LuceneSearchResultItem>()
                    .Where(predicate)
                    .AddFilter(new DefaultFilter<LuceneSearchResultItem>(siteContext));
                // execute query
                return _searchResultFactory.ToPagedSearchResult(queryable, paginationOptions);
            }
        }
    }
}