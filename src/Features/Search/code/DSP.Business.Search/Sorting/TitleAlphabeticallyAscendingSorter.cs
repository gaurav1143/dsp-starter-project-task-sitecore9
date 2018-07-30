using System;
using System.Linq;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.Sorting
{
    using ContentSearch;

    public class TitleAlphabeticallyAscendingSorter : ISorter<LuceneSearchResultItem>
    {        
        public IOrderedQueryable<LuceneSearchResultItem> Sort(IQueryable<LuceneSearchResultItem> queryable)
        {
            return queryable.OrderBy(result => result.Title, StringComparer.CurrentCultureIgnoreCase);
        }
    }
}
