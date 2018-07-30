using DSP.Foundation.AdditionalRenderingContext;

namespace DSP.Feature.Search.Modules.Search

{
    using System.Web.Mvc;
    using Business.Search.ContentSearch;
    using Business.Search.SearchContext;

    using Sitecore.Mvc.Controllers;

    public class SearchResultsController : SitecoreController
    {
        private readonly IContentSearchService contentSearchService;
        private readonly IAdditionalContextStore contextStore;

        public SearchResultsController(IContentSearchService contentSearchService, IAdditionalContextStore contextStore)
        {
            this.contentSearchService = contentSearchService;
            this.contextStore = contextStore;
        }

        public override ActionResult Index()
        {
            return DoSearch(false);
        }

        public ActionResult CollectionSearch()
        {
            return DoSearch(true);
        }

        private ActionResult DoSearch(bool isCollectionSearch)
        {
            // do work and set search results and search context in the context store for renderings to use downstream
            var searchContext = HttpContext.SearchContext();
            var searchResults = contentSearchService.Search(searchContext, Sitecore.Context.Site, isCollectionSearch);

            this.contextStore.Add(searchResults);
            this.contextStore.Add(searchContext);

            // call the base implementation
            return base.Index();
        }
    }
}