using DSP.Business.Search.ContentSearch.SearchResults;
using DSP.Business.Search.Paging;
using DSP.Business.Search.SearchContext;
using Sitecore.Data.Items;

namespace DSP.Business.Search.ContentManagedSearch
{
    public interface IContentManagedSearchService
    {
        ISearchContext CreateSearchContext(Item currentPage, Item dataSource);

        PagedSearchResult<ISearchResult> Search(ISearchContext searchContext, Item dataSource);
    }
}