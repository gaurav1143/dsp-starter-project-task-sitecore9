namespace DSP.Feature.Search.Modules.Search.Facets.Factories
{
    using Business.Search.Facets;

    using Sitecore.Data;

    public class KeywordFacetable : IFacetable
    {
        public KeywordFacetable(string title)
        {
            Title = "Keyword: " + title;
            Value = title;
            Id = new ID();
            FacetType = FacetType.Flat;
        }

        public ID Id { get; }

        public string Title { get; }

        public string Value { get; }

        public FacetType FacetType { get; }
    }
}