namespace DSP.Business.Search.ComputedFields
{
    using DeloitteDigital.Atlas.Extensions;

    using IndexValueProviders;

    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.ComputedFields;

    public class HasRendering : IComputedIndexField
    {
        public object ComputeFieldValue(IIndexable indexable)
        {
            var item = ItemProvider.Get(indexable);

            if (item == null) return null;

            return item.HasRendering();
        }

        public string FieldName { get; set; }
        public string ReturnType { get; set; }
    }
}
