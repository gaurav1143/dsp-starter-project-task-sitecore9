using System;
using System.Collections.Generic;

namespace DSP.Business.Search.ContentSearch
{
    using Facets;
    using Tags;

    using Sitecore.ContentSearch.Linq;

    public class SearchResultFacetsFactory
    {
        private readonly ContentTagFactory contentTagFactory;
        private readonly AutomatedTagFactory automatedTagFactory;

        public SearchResultFacetsFactory(ContentTagFactory contentTagFactory, AutomatedTagFactory automatedTagFactory)
        {
            this.contentTagFactory = contentTagFactory;
            this.automatedTagFactory = automatedTagFactory;
        }

        public IEnumerable<Facet<IFacetable>> ToFacets(FacetResults facets)
        {
            if (facets == null) yield break;

            foreach (var facetCategory in facets.Categories)
            {
                // name of the computed field
                if (facetCategory.Name.Equals("ContentTagsFacet", StringComparison.OrdinalIgnoreCase))
                {
                    foreach (var value in facetCategory.Values)
                    {
                        var tag = contentTagFactory.Create(value.Name);

                        if (tag == null) continue;

                        yield return new Facet<IFacetable>(value.AggregateCount, tag);
                    }
                    continue;
                }

                
                if (facetCategory.Name.Equals(Constants.AutomatedTags.Key, StringComparison.OrdinalIgnoreCase))
                {
                    foreach (var value in facetCategory.Values)
                    {
                        var tag = automatedTagFactory.Create(value.Name);

                        if (tag == null) continue;

                        yield return new Facet<IFacetable>(value.AggregateCount, tag);
                    }
                }
            }
        }
    }
}
