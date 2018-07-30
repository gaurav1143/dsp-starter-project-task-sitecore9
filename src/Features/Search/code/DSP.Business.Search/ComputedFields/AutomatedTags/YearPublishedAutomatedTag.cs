namespace DSP.Business.Search.ComputedFields.AutomatedTags
{
    using ValueProviders;
    using IndexValueProviders;

    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.ComputedFields;

    public class YearPublishedAutomatedTag : IComputedIndexField
    {
        private static readonly IAutomatedTagValueProvider ValueProvider = new YearPublishedAutomatedTagValueProvider();

        public object ComputeFieldValue(IIndexable indexable)
        {
            var item = ItemProvider.Get(indexable);

            if (item == null) return null;

            return ValueProvider.GetValue(item);
        }

        public string FieldName { get; set; }
        public string ReturnType { get; set; }
    }
}
