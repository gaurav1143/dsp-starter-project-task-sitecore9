using System.Collections.Generic;
using System.Linq;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.Paging
{    
    public class PagedResult<T> : IPagedResultsAspect
    {
        public PagedResult(int resultsTotal, int pageTotal, int pageNumber, int pageSize, IEnumerable<T> results)
        {
            ResultsTotal = resultsTotal;
            PageTotal = pageTotal;
            PageNumber = pageNumber;
            PageSize = pageSize;
            Results = results ?? Enumerable.Empty<T>();
        }

        public int ResultsTotal { get; protected set; }
        public int PageTotal { get; protected set; }
        public int PageNumber { get; protected set; }
        public int PageSize { get; protected set; }
        public IEnumerable<T> Results { get; protected set; }
    }
}
