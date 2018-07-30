namespace DSP.Feature.Search.Modules.Search.Facets.Factories
{
    using System.Collections.Generic;
    using System.Linq;

    using DeloitteDigital.Atlas.Extensions;

    using Business.Search;
    using Business.Search.SearchContext;

    public class SelectedFacetsFactory
    {

        private readonly IEnumerable<ISelectedFacetProvider> selectedFilterProviders;

        public SelectedFacetsFactory(TagSeletedFacetProvider tagProvider, KeywordSelectedFacetProvider keywordProvider)
        {
            selectedFilterProviders = new List<ISelectedFacetProvider>
                                          {
                                              tagProvider,
                                              keywordProvider
                                          };
        }

        public IEnumerable<Facet> CreateSelectedFacets(ISearchContext searchContext)
        {
            foreach (var selectedFacetViewModelProvider in selectedFilterProviders)
            {
                if (!selectedFacetViewModelProvider.AnyFacetsActive(searchContext)) continue;

                var selected = selectedFacetViewModelProvider.Get(searchContext, searchContext.AsNameValueCollection());

                foreach (var facetViewModel in selected)
                {
                    yield return facetViewModel;
                }
            }
        }

        public bool AnyFiltersActive(ISearchContext searchContext)
        {
            return selectedFilterProviders.Any(selectedFilterProvider => selectedFilterProvider.AnyFacetsActive(searchContext));
        }

        public string ClearAllFiltersUrl(ISearchContext searchContext)
        {
            var result =
                searchContext.AsNameValueCollection()
                    .RemoveKey(Constants.SearchContext.Keys.Facets)
                    .RemoveKey(Constants.SearchContext.Keys.PageNumber);

            // remove keyword if we are treating it as a facet
            if (searchContext.CollectionSettings.ShowKeywordFacet) result = result.RemoveKey(Constants.SearchContext.Keys.Query);

            return result.ToQueryString(true);
        }
    }
}