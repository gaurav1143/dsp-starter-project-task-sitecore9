using System.Collections.Generic;
using DSP.Business.Search.ContentSearch;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.Sorting.SortOptions
{
    public interface ISortOptionRepository
    {
        IEnumerable<SortOrderOption> GetAll();
        SortOrderOption GetFromKey(string key);
        ISorter<LuceneSearchResultItem> GetSorter(ISortOrderOption sortOrderOption);
    }
}