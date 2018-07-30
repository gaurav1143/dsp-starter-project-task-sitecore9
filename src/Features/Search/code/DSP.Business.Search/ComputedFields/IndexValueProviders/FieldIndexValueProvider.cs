namespace DSP.Business.Search.ComputedFields.IndexValueProviders
{
    using Extensions;

    using DeloitteDigital.Atlas.Extensions;

    using Sitecore.ContentSearch;
    using Sitecore.Data;

    /// <summary>
    /// Get the field value for indexing.
    /// </summary>
    public class FieldIndexValueProvider
    {
        public string GetValue(IIndexable indexable, string fieldName)
        {
            var item = ItemProvider.Get(indexable);

            if (item == null) return null;

            var title = item.GetFieldValue(fieldName);

            return title.ToValueOrNull();
        }

        public string GetValue(IIndexable indexable, string fieldName, TemplateID templateId)
        {
            var item = indexable.ToItem();

            if (item == null) return null;
            if (item.IsNotMasterOrWebIndex()) return null;
            if (!item.IsContentOrMediaItem()) return null;

            if (!item.InheritsFromTemplate(templateId)) return null;

            var title = item.GetFieldValue(fieldName);

            return title.ToValueOrNull();
        }
    }
}
