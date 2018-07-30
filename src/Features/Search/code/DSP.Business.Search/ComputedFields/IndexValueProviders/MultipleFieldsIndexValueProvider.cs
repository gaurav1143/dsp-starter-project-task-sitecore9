using System.Collections.Generic;
using System.Text;

namespace DSP.Business.Search.ComputedFields.IndexValueProviders
{
    using Extensions;

    using DeloitteDigital.Atlas.Extensions;

    using Sitecore.ContentSearch;
    using Sitecore.Data;
    using Sitecore.Data.Items;

    /// <summary>
    /// Get multiple fields values as a single content string.
    /// </summary>
    public class MultipleFieldsIndexValueProvider
    {
        public string GetValue(Item item, string[] fieldNames, TemplateID templateId)
        {
            if (item == null) return null;
            if (item.IsNotMasterOrWebIndex()) return null;
            if (!item.IsContentOrMediaItem()) return null;
            if (!item.InheritsFromTemplate(templateId)) return null;

            var content = new StringBuilder();

            AddContent(content, item, fieldNames);

            return content.ToString().ToValueOrNull();
        }

        public string GetValue(Item item, string[] fieldNames)
        {
            if (item == null) return null;
            if (item.IsNotMasterOrWebIndex()) return null;
            if (!item.IsContentOrMediaItem()) return null;

            var content = new StringBuilder();

            AddContent(content, item, fieldNames);

            return content.ToString().ToValueOrNull();
        }

        public string GetValue(IIndexable indexable, string[] fieldNames, TemplateID templateId)
        {
            var item = indexable.ToItem();
            return GetValue(item, fieldNames, templateId);
        }

        private static void AddContent(StringBuilder content, Item item, IEnumerable<string> fieldNames)
        {
            if (item == null) return;

            foreach (var fieldName in fieldNames)
            {
                var value = item.GetFieldValue(fieldName);

                if (string.IsNullOrWhiteSpace(value)) continue;

                content.AppendLine(value.ToLowerInvariant());
            }
        }
    }
}
