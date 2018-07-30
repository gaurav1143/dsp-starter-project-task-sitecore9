using System.Linq;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.Sorting
{
    using ContentSearch;

    public class DateOldestFirstSorter : ISorter<LuceneSearchResultItem>
    {
        public IOrderedQueryable<LuceneSearchResultItem> Sort(IQueryable<LuceneSearchResultItem> queryable)
        {
            return queryable.OrderBy(i => i.DateCreated);
        }
    }
}
