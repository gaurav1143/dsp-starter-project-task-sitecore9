namespace DSP.Business.Search.ContentSearch
{
    using SearchResults;

    using Paging;
    using SearchContext;

    using Sitecore.Sites;

    public interface IContentSearchService
    {
        PagedSearchResult<ISearchResult> Search(ISearchContext searchContext, SiteContext siteContext, bool isCollectionSearch = false)
            ;

        PagedSearchResult<ISearchResult> SearchAhead(string query, SiteContext siteContext, PaginationOptions paginationOptions = null);
    }
}
