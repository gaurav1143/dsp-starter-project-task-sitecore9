using System.Collections.Generic;

namespace DSP.Feature.Search.Modules.Search.Facets.Factories
{
    using System.Collections.Specialized;

    using Business.Search.SearchContext;

    using DeloitteDigital.Atlas.Extensions;

    using Business.Search;

    public class KeywordSelectedFacetProvider : ISelectedFacetProvider
    {
        public bool AnyFacetsActive(ISearchContext context)
        {
            if (context.CollectionSettings.ShowKeywordFacet == false) return false;
            return !string.IsNullOrWhiteSpace(context.Query.Value);
        }

        public IEnumerable<Facet> Get(ISearchContext context, NameValueCollection queryString)
        {
            yield return new Facet(
                new KeywordFacetable(context.Query.Value), 
                queryString.RemoveKey(Constants.SearchContext.Keys.Query).
                RemoveKey(Constants.SearchContext.Keys.PageNumber).
                // preserve empty keys
                ToQueryString(true),
                true);
        }
    }
}