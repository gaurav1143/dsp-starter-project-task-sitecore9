using System.Collections.Generic;
using DSP.Business.Search.ComputedFields.AutomatedTags.ValueProviders;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.ComputedFields;
using Sitecore.Data.Items;

namespace DSP.Business.Search.ComputedFields.AutomatedTags
{
    using IndexValueProviders;

    public class AutomatedTagsFacet : IComputedIndexField
    {
        private static readonly IAutomatedTagValueProvider YearPublishedValueProvider = new YearPublishedAutomatedTagValueProvider();
        public object ComputeFieldValue(IIndexable indexable)
        {
            var item = ItemProvider.Get(indexable);

            if (item == null) return null;

            return GetValue(item);
        }

        public string FieldName { get; set; }
        public string ReturnType { get; set; }

        private IEnumerable<string> GetValue(Item item)
        {
            var yearsPublished = YearPublishedValueProvider.GetValue(item);

            var automatedTags = new List<string>();

            if (yearsPublished != null && !automatedTags.Contains(yearsPublished.ToString()))
            {
                automatedTags.Add(yearsPublished.ToString());
            }

            return automatedTags;
        }
    }
}
