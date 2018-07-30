using System.Linq;
using DSP.Business.Search.SearchContext;
using DeloitteDigital.Atlas.Extensions;
using DeloitteDigital.Atlas.Logging;
using Sitecore.Data.Items;
using Sitecore.Sites;

namespace DSP.Business.Search.ContentManagedSearch
{
    using ContentSearch;
    using ContentSearch.SearchResults;
    using Paging;

    public class ContentManagedSearchService : IContentManagedSearchService
    {
        private readonly ISearchContextBuilder _builder;
        private readonly PinnedSearchResultsFactory _pinnedSearchResultsFactory;
        private readonly IContentSearchService _searchService;
        private readonly ILogService _log;

        public ContentManagedSearchService(ISearchContextBuilder builder, PinnedSearchResultsFactory pinnedSearchResultsFactory,
            IContentSearchService searchService, ILogService log)
        {
            _builder = builder;
            _pinnedSearchResultsFactory = pinnedSearchResultsFactory;
            _searchService = searchService;
            _log = log;
        }

        public ISearchContext CreateSearchContext(Item currentPage, Item dataSource)
        {
            using (_log.WithLogScope(this, logLevel: LogLevel.Debug))
            {
                return _builder.Build(currentPage, dataSource);
            }
        }

        public PagedSearchResult<ISearchResult> Search(ISearchContext searchContext, Item dataSource)
        {
            using (_log.WithLogScope(this, logLevel: LogLevel.Debug))
            {
                var pinnedResults = _pinnedSearchResultsFactory.Create(dataSource);
                var searchResults = _searchService.Search(searchContext, SiteContext.Current).Results.Skip(Skip(dataSource));
                var final = pinnedResults.Concat(searchResults).ToList();

                return new PagedSearchResult<ISearchResult>(searchContext.PaginationOptions, final.Count, final);
            }
        }

        private static int Skip(Item dataSource)
        {
            return dataSource.GetFieldValueAsInt(DSP.Foundation.SitecoreTemplates.Query_Skip_Results.QuerySkip.FieldName);
        }
    }
}
