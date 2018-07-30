using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace DSP.Feature.Search.Api
{
    using DSP.Business.Search.ContentSearch;
    using DSP.Business.Search.Paging;

    using Sitecore.Sites;

    public class AutocompleteController : ApiController
    {
        private readonly IContentSearchService contentSearchService;

        public AutocompleteController(IContentSearchService contentSearchService)
        {
            this.contentSearchService = contentSearchService;
        }

        [HttpGet]
        public object Search(string q)
        {
            var results = contentSearchService.SearchAhead(q, SiteContext.Current, new PaginationOptions { PageNumber = 1, PageSize = 3 });
            return new
            {
                autocomplete = results.Results.Select(r => new
                {
                    title = r.Title,
                    description = r.Summary,
                    href = r.Url
                })
            };
        }

    }
}