using System;
using System.Linq;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.Sorting
{
    using ContentSearch;

    public class TitleAlphabeticallyDescendingSorter : ISorter<LuceneSearchResultItem>
    {
        public IOrderedQueryable<LuceneSearchResultItem> Sort(IQueryable<LuceneSearchResultItem> queryable)
        {
            return queryable.OrderByDescending(result => result.Title, StringComparer.CurrentCultureIgnoreCase);
        }
    }
}
