namespace DSP.Business.Search.ComputedFields
{
    using Extensions;
    using IndexValueProviders;

    using DeloitteDigital.Atlas.Extensions;   

    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.ComputedFields;

    public class PageSummary : IComputedIndexField
    {
        private const int Summarylength = 200;

        public object ComputeFieldValue(IIndexable indexable)
        {
            var item = ItemProvider.Get(indexable);

            if (item == null) return null;

            var summary = item.GetFieldValue(DSP.Foundation.SitecoreTemplates.Common_Meta_Data.MetaDescription.FieldName);

            return string.IsNullOrEmpty(summary)
                ? item.GetFieldValue(DSP.Foundation.SitecoreTemplates.General_Text.GeneralText.FieldName)
                    .StripHtmlTags()
                    .RemoveWhitespace()
                    .GetSummary(Summarylength, "...")
                    .ToValueOrNull()
                : summary
                    .GetSummary(Summarylength, "...")
                    .ToValueOrNull();
        }

        public string FieldName { get; set; }
        public string ReturnType { get; set; }
    }
}
