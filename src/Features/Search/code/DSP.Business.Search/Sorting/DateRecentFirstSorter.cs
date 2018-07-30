using System.Linq;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.Sorting
{
    using ContentSearch;

    public class DateRecentFirstSorter : ISorter<LuceneSearchResultItem>
    {
        public IOrderedQueryable<LuceneSearchResultItem> Sort(IQueryable<LuceneSearchResultItem> queryable)
        {
            return queryable.OrderByDescending(i => i.DateCreated);
        }
    }
}
