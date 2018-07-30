using DSP.Foundation.DependencyInjection;

namespace DSP.Business.Search.ComputedFields.AutomatedTags
{
    using ValueProviders;
    using IndexValueProviders;

    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.ComputedFields;

    public class ContentTypeAutomatedTag : IComputedIndexField
    {
        public object ComputeFieldValue(IIndexable indexable)
        {
            var item = ItemProvider.Get(indexable);

            if (item == null) return null;

            var valueProvider = Sitecore.DependencyInjection.ServiceLocator.ServiceProvider.GetService<ContentTypeAutomatedTagValueProvider>();

            return valueProvider.GetValue(item);
        }

        public string FieldName { get; set; }
        public string ReturnType { get; set; }
    }
}
