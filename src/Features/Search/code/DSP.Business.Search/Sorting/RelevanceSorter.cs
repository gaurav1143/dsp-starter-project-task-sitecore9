using System.Linq;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.Sorting
{
    using ContentSearch;

    public class RelevanceSorter : ISorter<LuceneSearchResultItem>
    {
        public IOrderedQueryable<LuceneSearchResultItem> Sort(IQueryable<LuceneSearchResultItem> queryable)
        {
            // relevance is the default sort order - nothing to do here
            return (IOrderedQueryable<LuceneSearchResultItem>)queryable;
        }
    }
}
