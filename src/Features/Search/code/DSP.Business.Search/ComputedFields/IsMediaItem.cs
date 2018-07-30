namespace DSP.Business.Search.ComputedFields
{
    using DeloitteDigital.Atlas.Extensions;

    using Extensions;

    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.ComputedFields;

    public class IsMediaItem : IComputedIndexField
    {
        public object ComputeFieldValue(IIndexable indexable)
        {
            var item = indexable.ToItem();

            if (item == null) return null;
            if (item.IsNotMasterOrWebIndex()) return null;

            return item.IsMediaItem();
        }

        public string FieldName { get; set; }
        public string ReturnType { get; set; }
    }
}
