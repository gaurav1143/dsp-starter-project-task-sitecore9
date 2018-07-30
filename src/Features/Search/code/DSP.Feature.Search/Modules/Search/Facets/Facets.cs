using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;

namespace DSP.Feature.Search.Modules.Search.Facets
{
    public class Facets
    {
        public IEnumerable<Facet> SelectedFacets { get; set; } 

        public bool HasSelectedFacets => this.SelectedFacets != null && this.SelectedFacets.Any();

        public string ClearAllFacetsLink { get; set; }

        public bool ShowKeywordFacet { get; set; }

        public string Query { get; set; }

        public IEnumerable<Facet> AvailableFacets { get; set; }

        public bool HasAvailableFacets => ShowKeywordFacet || (this.AvailableFacets != null && this.AvailableFacets.Any());

        public string FormBaseUrl { get; set; }

        public NameValueCollection HiddenFields { get; set; }

        public bool ShowMobileSorting { get; set; }

        public bool ShowMobileFilters { get; set; }
    }
}