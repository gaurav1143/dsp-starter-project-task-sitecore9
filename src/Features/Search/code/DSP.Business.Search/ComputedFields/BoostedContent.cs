using System.Text;

namespace DSP.Business.Search.ComputedFields
{
    using Extensions;
    using IndexValueProviders;

    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.ComputedFields;

    public class BoostedContent : IComputedIndexField
    {
        private static readonly MultipleFieldsIndexValueProvider Provider = new MultipleFieldsIndexValueProvider();

        private static readonly string[] FieldsToInclude =
        {
            DSP.Foundation.SitecoreTemplates.Title.Title_Field.FieldName,
            DSP.Foundation.SitecoreTemplates.Common_Meta_Data.MetaKeywords.FieldName,
            DSP.Foundation.SitecoreTemplates.Common_Meta_Data.MetaDescription.FieldName
        };

        public object ComputeFieldValue(IIndexable indexable)
        {
            var item = ItemProvider.Get(indexable);

            if (item == null) return null;

            var content = new StringBuilder();

            content.AppendLine(Provider.GetValue(item, FieldsToInclude));

            return content.ToString().ToLowerInvariant().ToValueOrNull();
        }

        public string FieldName { get; set; }
        public string ReturnType { get; set; }
    }
}
