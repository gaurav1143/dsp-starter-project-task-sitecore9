using System.Collections.Generic;

namespace DSP.Feature.Search.Modules.Search.Facets.Factories
{
    using System.Collections.Specialized;

    using Business.Search.SearchContext;

    public interface ISelectedFacetProvider
    {
        bool AnyFacetsActive(ISearchContext context);
        IEnumerable<Facet> Get(ISearchContext context, NameValueCollection queryString);
    }
}
