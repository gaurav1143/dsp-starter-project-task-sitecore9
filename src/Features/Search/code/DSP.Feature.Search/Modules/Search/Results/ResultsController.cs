using DSP.Foundation.AdditionalRenderingContext;

namespace DSP.Feature.Search.Modules.Search.Results

{
    using System.Web.Mvc;
    using Business.Search.ContentSearch.SearchResults;
    using Business.Search.Paging;

    using Business.Search.SearchContext;

    using Facets.Factories;

    public class ResultsController : Controller
    {
        private readonly IAdditionalContextStore contextStore;

        private readonly ResultPartialFactory resultPartialFactory;

        private readonly SelectedFacetsFactory selectedFacetsFactory;

        public ResultsController(IAdditionalContextStore contextStore, ResultPartialFactory resultPartialFactory, SelectedFacetsFactory selectedFacetsFactory)
        {
            this.contextStore = contextStore;
            this.resultPartialFactory = resultPartialFactory;
            this.selectedFacetsFactory = selectedFacetsFactory;
        }

        public ActionResult Index()
        {
            var res = contextStore.Get<PagedSearchResult<ISearchResult>>();

            if (res != null && res.ResultsTotal > 0)
            {
                return View("~/Modules/Search/Results/ResultsView.cshtml",
                    new Results(res.Results, Sitecore.Context.Item.ID.ToString(), resultPartialFactory));
            }

            var searchContext = contextStore.Get<ISearchContext>();
            var vm = new NoResults.NoResults(selectedFacetsFactory.AnyFiltersActive(searchContext), selectedFacetsFactory.ClearAllFiltersUrl(searchContext), Sitecore.Context.Item.ID.ToString());
            return View("~/Modules/Search/Results/NoResults/NoResultsView.cshtml", vm);
        }

    }
}