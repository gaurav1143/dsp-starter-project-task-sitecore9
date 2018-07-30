using System.Collections.Generic;
using System.Linq;

namespace DSP.Feature.Search.Modules.Search.Facets
{
    using DeloitteDigital.Atlas.Extensions;

    using Business.Search.Facets;
    
    public class Facet
    {
        public Facet(IFacetable facetValue, string url, bool isSelected)
            : this(facetValue, url, isSelected, 0, null)
        {
        }

        public Facet(IFacetable facetValue, string url, bool isSelected, int count, IEnumerable<Facet> children)
        {
            Url = url;
            Title = facetValue.Title.HtmlEncode();
            Count = count;
            IsSelected = isSelected;
            Children = children ?? Enumerable.Empty<Facet>();
        }

        public void SetChildren(IEnumerable<Facet> children)
        {
            Children = children ?? Enumerable.Empty<Facet>();
        }

        public IEnumerable<Facet> Children { get; private set; }
        public string Url { get; private set; }
        public string Title { get; private set; }
        public int Count { get; private set; }
        public bool IsSelected { get; private set; }
    }
}