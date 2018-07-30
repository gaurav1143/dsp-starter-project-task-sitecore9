using DSP.Business.Search.ContentSearch.SearchResults;
using DSP.Business.Search.Paging;
using Sitecore.Data;

namespace DSP.Business.Search.ItemSearch
{
    public interface IItemSearch
    {
        /// <summary>
        /// Search directly for the given items
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        PagedSearchResult<ISearchResult> Search(params ID[] ids);
    }
}