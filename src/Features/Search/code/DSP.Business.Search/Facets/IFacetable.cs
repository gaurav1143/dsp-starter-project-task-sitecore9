namespace DSP.Business.Search.Facets
{
    using Sitecore.Data;

    public interface IFacetable
    {
        ID Id { get; }
        string Title { get; }
        string Value { get; }
        FacetType FacetType { get; }
    }
}
