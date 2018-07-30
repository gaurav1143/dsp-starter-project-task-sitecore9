namespace DSP.Business.Search.ComputedFields
{
    using IndexValueProviders;

    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.ComputedFields;

    public class ContentTagsFacet : IComputedIndexField
    {
        private static readonly HierarchicalContentTagsIdIndexValueProvider Provider = new HierarchicalContentTagsIdIndexValueProvider();

        public object ComputeFieldValue(IIndexable indexable)
        {
            return Provider.GetValue(indexable, DSP.Foundation.SitecoreTemplates.Has_Tags.ContentTags.FieldName);
        }

        public string FieldName { get; set; }
        public string ReturnType { get; set; }
    }
}
