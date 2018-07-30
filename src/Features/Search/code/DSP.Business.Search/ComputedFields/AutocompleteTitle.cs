namespace DSP.Business.Search.ComputedFields
{
    using IndexValueProviders;

    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.ComputedFields;

    public class AutocompleteTitle : IComputedIndexField
    {
        private static readonly FieldIndexValueProvider Provider = new FieldIndexValueProvider();

        public object ComputeFieldValue(IIndexable indexable)
        {
            return Provider.GetValue(indexable, DSP.Foundation.SitecoreTemplates.Title.Title_Field.FieldName);
        }

        public string FieldName { get; set; }
        public string ReturnType { get; set; }
    }
}
