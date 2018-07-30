using System.Collections.Generic;
using System.Linq;
using DeloitteDigital.Atlas.Extensions;
using DSP.Business.Search;
using DSP.Foundation.Aspects;

namespace DSP.Feature.Search.Modules.Search.Pagination
{
    public class Pagination
    {        
        public Pagination(IPagingContextAspect pagingContext, IPagedResultsAspect totalResults)
        {
            this.Pages = new List<Page>();
            if (pagingContext == null) return;
            if (totalResults == null || totalResults.ResultsTotal <= 0) return;

            var totalNumberPages = TotalNumberOfPages(totalResults.ResultsTotal, pagingContext.PageSize.Value);
            SetPages(pagingContext, totalNumberPages);

            HasPreviousPage = pagingContext.PageNumber.Value > 1;
            HasNextPage = pagingContext.PageNumber.Value < totalNumberPages;

            PreviousPageLink =
                pagingContext.AsNameValueCollection()
                    .SetKey(Constants.SearchContext.Keys.PageNumber, pagingContext.PageNumber.Value - 1)
                    .ToQueryString(true);

            NextPageLink =
                pagingContext.AsNameValueCollection()
                    .SetKey(Constants.SearchContext.Keys.PageNumber, pagingContext.PageNumber.Value + 1)
                    .ToQueryString(true);
        }

        private static int TotalNumberOfPages(int totalNumberOfRecords, int pageSize)
        {
            return (totalNumberOfRecords + pageSize - 1) / pageSize;
        }

        private void SetPages(IPagingContextAspect pagingContext, int totalNumberPages)
        {
            if(totalNumberPages == 0) return;
            var currentPage = pagingContext.PageNumber.Value;
            var addedEmptyPage = false;

            // for up to 4 pages, always render all pages
            if (totalNumberPages <= 4)
            {
                for (var i = 1; i <= totalNumberPages; i++)
                {
                    AddPage(i, pagingContext);
                }
                return;
            }

            // for >4 pages, render: 
            // - first page
            // - render the current page or if neighbouring by 1 
            // - last page
            for (var i = 1; i <= totalNumberPages; i++)
            {                
                if (i ==1 || 
                    i == currentPage || i == currentPage - 1 || i == currentPage + 1 || 
                    i == totalNumberPages)
                {
                    AddPage(i, pagingContext);
                    addedEmptyPage = false;
                }
                else
                {
                    // add ONE empty page only (skip others)
                    if (addedEmptyPage)
                    {
                        continue;
                    }
                    this.AddEmptyPage();
                    addedEmptyPage = true;
                }
            }
        }

        private void AddPage(int pageNumber, IPagingContextAspect pagingContext)
        {
            Pages.Add(new Page(pageNumber, pagingContext.PageNumber.Value == pageNumber,
                pagingContext.AsNameValueCollection().SetKey(Constants.SearchContext.Keys.PageNumber, pageNumber).ToQueryString(true)));
        }

        private void AddEmptyPage()
        {
            Pages.Add(new Page());
        }

        public List<Page> Pages { get; }

        public bool HasPagination => Pages.Any();

        public bool HasPreviousPage { get; set; }

        public string PreviousPageLink { get; set; }

        public bool HasNextPage { get; set; }

        public string NextPageLink { get; set; }        
    }
}