using System.Collections.Generic;

namespace DSP.Business.Search.Facets
{
    public interface IFacetedResultSet
    {
        IEnumerable<Facet<IFacetable>> Facets { get; }
    }
}
