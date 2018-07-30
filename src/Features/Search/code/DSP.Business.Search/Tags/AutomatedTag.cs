namespace DSP.Business.Search.Tags
{
    using Facets;

    using Sitecore.Data;

    public class AutomatedTag : IFacetable
    {
        public AutomatedTag(ID id, string value, string title)
        {
            Id = id;
            Value = value;
            Title = title;
            FacetType = FacetType.Flat;
        }

        public ID Id { get; private set; }
        public string Title { get; private set; }
        public string Value { get; private set; }
        public FacetType FacetType { get; private set; }
    }
}
