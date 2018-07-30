using System.Collections.Generic;
using System.Linq;

namespace DSP.Business.Search.ComputedFields
{
    using IndexValueProviders;

    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.ComputedFields;
    using Sitecore.Data;
    using Sitecore.Data.Items;
    using Sitecore.Data.Templates;

    public class InheritedTemplates : IComputedIndexField
    {
        public object ComputeFieldValue(IIndexable indexable)
        {
            var item = ItemProvider.Get(indexable);

            if (item == null) return null;

            return GetInheritedTemplates(item).Distinct();
        }

        private static IEnumerable<ID> GetInheritedTemplates(Item item)
        {
            if (item == null) yield break;

            if (StandardValuesManager.IsStandardValuesHolder(item)) yield break;

            yield return item.TemplateID;

            var template = Sitecore.Data.Managers.TemplateManager.GetTemplate(item);

            if (template == null) yield break;

            foreach (Template baseTemplate in template.GetBaseTemplates())
            {
                yield return baseTemplate.ID;
            }
        }

        public string FieldName { get; set; }
        public string ReturnType { get; set; }
    }
}
