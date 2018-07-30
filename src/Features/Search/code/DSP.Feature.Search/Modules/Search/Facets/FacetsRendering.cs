using DSP.Foundation.AdditionalRenderingContext;
using DSP.Foundation.Aspects;

namespace DSP.Feature.Search.Modules.Search.Facets
{
    using System.Linq;

    using DeloitteDigital.Atlas;
    using DeloitteDigital.Atlas.Mvc;
    using Business.Search.SearchContext;
    using Factories;
    using Business.Search.Facets;

    using Sitecore.Mvc.Presentation;
    using System.Web;
    using DeloitteDigital.Atlas.Extensions;
    using DeloitteDigital.Atlas.Mvc.ErrorHandling;

    public class FacetsRendering : RenderingModel<Facets>, IHideOnError
    {
        private readonly IAdditionalContextStore additionalContexts;
        private readonly SelectedFacetsFactory selectedFacetsFactory;
        private readonly FacetFactory facetFactory;

        public FacetsRendering(IAdditionalContextStore additionalContexts, SelectedFacetsFactory selectedFacetsFactory, FacetFactory facetFactory)
        {
            this.additionalContexts = additionalContexts;
            this.selectedFacetsFactory = selectedFacetsFactory;
            this.facetFactory = facetFactory;
        }

        protected override Facets InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var searchContext = additionalContexts.Get<ISearchContext>();
            var facetedResultSet = additionalContexts.Get<IFacetedResultSet>();
            var resultAspect = additionalContexts.Get<IPagedResultsAspect>();

            var vm = new Facets();

            // show the sorting button only if there is more than 1 result (and sorting is enabled)
            vm.ShowMobileSorting = resultAspect.ResultsTotal > 1 && searchContext.CollectionSettings.SortOptions != null
                                   && searchContext.CollectionSettings.SortOptions.Any();

            vm.ClearAllFacetsLink = selectedFacetsFactory.ClearAllFiltersUrl(searchContext);
            vm.SelectedFacets = selectedFacetsFactory.CreateSelectedFacets(searchContext);
            vm.ShowKeywordFacet = searchContext.CollectionSettings.ShowKeywordFacet;
            vm.AvailableFacets = facetFactory.Create(searchContext, facetedResultSet.Facets);
            vm.ShowMobileFilters = (resultAspect.ResultsTotal > 1 && vm.AvailableFacets.Any()) || vm.ShowKeywordFacet;

            vm.Query = searchContext.Query.Value;
            vm.FormBaseUrl = HttpContext.Current.Request.Url.AbsolutePath;
            vm.HiddenFields =
                searchContext.AsNameValueCollection()
                    .RemoveKey(Business.Search.Constants.SearchContext.Keys.Query)
                    .RemoveKey(Business.Search.Constants.SearchContext.Keys.PageNumber)
                    .RemoveKey(Business.Search.Constants.SearchContext.Keys.Facets);
            return vm;
        }
    }
}