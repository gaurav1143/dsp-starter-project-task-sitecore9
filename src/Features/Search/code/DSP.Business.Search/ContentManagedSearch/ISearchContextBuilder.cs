using DSP.Business.Search.SearchContext;
using Sitecore.Data.Items;

namespace DSP.Business.Search.ContentManagedSearch
{
    public interface ISearchContextBuilder
    {
        ISearchContext Build(Item currentPage, Item dataSource);
    }
}