using System.Collections.Generic;
using System.Linq;

namespace DSP.Business.Search.Tags
{
    using Facets;

    using Sitecore.Data;

    public class ContentTag : IFacetable
    {
        public ContentTag(ContentTag parent, ID id, string title, bool isHiddenFromDisplay, bool isHiddenFromFacet, ID templateId)
        {
            FacetType = FacetType.Hierarchical;
            Parent = parent;
            Id = id;
            Title = title;
            IsHiddenFromDisplay = isHiddenFromDisplay;
            IsHiddenFromFacet = isHiddenFromFacet;
            Children = Enumerable.Empty<ContentTag>();
            TemplateId = templateId;
        }

        public void SetChildren(IEnumerable<ContentTag> tags)
        {
            Children = tags ?? Enumerable.Empty<ContentTag>();
        }

        public IEnumerable<ContentTag> Children { get; private set; }
        public ContentTag Parent { get; private set; }
        public ID Id { get; set; }
        public string Title { get; set; }

        public string Value
        {
            get
            {
                return this.Id.ToShortID().ToString();
            }
        }
        public FacetType FacetType { get; private set; }
        public bool IsHiddenFromDisplay { get; private set; }
        public bool IsHiddenFromFacet { get; private set; }
        public ID TemplateId { get; private set; }
    }
}
