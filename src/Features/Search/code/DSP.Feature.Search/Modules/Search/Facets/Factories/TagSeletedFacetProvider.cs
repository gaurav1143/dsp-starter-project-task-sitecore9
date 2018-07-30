using System.Collections.Generic;
using DSP.Foundation.Extensions;

namespace DSP.Feature.Search.Modules.Search.Facets.Factories
{
    using System.Collections.Specialized;
    using System.Linq;
    using Business.Search.SearchContext;
    using Business.Search.Tags;
    using DeloitteDigital.Atlas.Extensions;
    using Business.Search;
    using Business.Search.ComputedFields.AutomatedTags;
    using Business.Search.Facets;

    public class TagSeletedFacetProvider : ISelectedFacetProvider
    {
        private readonly TagRepository contentTagRepository;
        private readonly AutomatedTagFactory automatedTagFactory;

        public TagSeletedFacetProvider(TagRepository contentTagRepository, AutomatedTagFactory automatedTagFactory)
        {
            this.contentTagRepository = contentTagRepository;
            this.automatedTagFactory = automatedTagFactory;
        }

        public bool AnyFacetsActive(ISearchContext context)
        {
            return context.SelectedFacetValues?.Value.Any() ?? false;
        }

        public IEnumerable<Facet> Get(ISearchContext context, NameValueCollection queryString)
        {
            var selectedFacetValues = context.SelectedFacetValues.Value.ToList();

            foreach (var selectedTagValue in selectedFacetValues)
            {
                if (selectedTagValue.IsShortIDFormat())
                {
                    var contentTag = contentTagRepository.GetRecursive(selectedTagValue.ParseShortID());

                    if (contentTag == null) continue;

                    // this facet is already selected so set url to unselect it
                    yield return new Facet(contentTag, GetUnselectFacetUrl(context, queryString, contentTag, selectedFacetValues), true);
                }

                if (selectedTagValue.IsAutomatedTagValueFormat())
                {
                    var automatedTag = automatedTagFactory.Create(selectedTagValue);

                    if (automatedTag == null) continue;

                    var automatedTagViewModel = new Facet(automatedTag, GetUnselectFacetUrl(context, queryString, automatedTag, selectedFacetValues), true);

                    yield return automatedTagViewModel;
                }
            }
        }

        private string GetUnselectFacetUrl(ISearchContext searchContext, NameValueCollection queryString, IFacetable facet, IEnumerable<string> selectedFacetValues)
        {
            var facetsToRemove = FindValueAndDescendantValues(facet);
            return
              queryString
                  .SetKey(Constants.SearchContext.Keys.Facets, searchContext.FacetValuesToString(selectedFacetValues.Except(facetsToRemove)))
                  // go back to first page of results
                  .RemoveKey(Constants.SearchContext.Keys.PageNumber)
                  // preserve empty keys
                  .ToQueryString(true);
        }

        private static IEnumerable<string> FindValueAndDescendantValues(IFacetable facet)
        {
            yield return facet.Value;

            var tag = facet as ContentTag;

            if (tag == null) yield break;

            foreach (var child in tag.Children.FlattenRecursive(t => t.Children))
            {
                yield return child.Value;
            }
        }
    }
}