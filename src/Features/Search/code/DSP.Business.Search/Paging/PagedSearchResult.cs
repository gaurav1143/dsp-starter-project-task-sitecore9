using System.Collections.Generic;
using System.Linq;

namespace DSP.Business.Search.Paging
{   
    using Facets;

    public class PagedSearchResult<TResult> : PagedResult<TResult>, IFacetedResultSet
    {
        public PagedSearchResult()
            : this(1, 10)
        {
        }

        public PagedSearchResult(int pageNumber, int pageSize)
            : base(0, 0, pageNumber, pageSize, null)
        {
            Facets = Enumerable.Empty<Facet<IFacetable>>();
            Results = Enumerable.Empty<TResult>();
            PageNumber = pageNumber;
            PageSize = pageSize;
        }

        public PagedSearchResult(PaginationOptions paging, int resultsTotal, IEnumerable<TResult> results)
            : this(paging, resultsTotal, results, null)
        {
        }

        public PagedSearchResult(PaginationOptions paging, int resultsTotal, IEnumerable<TResult> results, IEnumerable<Facet<IFacetable>> facets)
            : base(resultsTotal, paging.TotalNumberOfPages(resultsTotal), paging.PageNumber, paging.PageSize, results)
        {
            PageNumber = paging.PageNumber;
            PageSize = paging.PageSize;
            ResultsTotal = resultsTotal;
            PageTotal = paging.TotalNumberOfPages(resultsTotal);
            // force evaulation of the IEnumerable, as it is often created in a ContentSearchContext
            // this will avoid any "the context is disposed" errors
            Results = (results ?? Enumerable.Empty<TResult>()).ToList();
            Facets = facets ?? Enumerable.Empty<Facet<IFacetable>>();
        }

        public IEnumerable<Facet<IFacetable>> Facets { get; private set; }
    }
}
