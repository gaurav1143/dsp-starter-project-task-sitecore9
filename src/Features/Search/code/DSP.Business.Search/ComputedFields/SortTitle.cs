using DSP.Business.Search.ComputedFields.Extensions;

namespace DSP.Business.Search.ComputedFields
{
    using IndexValueProviders;

    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.ComputedFields;

    /// <summary>
    /// Create a lower case title to sort by. This field should align with the displayed search result title, see <see cref="SearchResultFactory"/>.
    /// </summary>
    /// <remarks>
    /// Lucene is case sensitive, so we must lowercase the value.
    /// </remarks>
    public class SortTitle : IComputedIndexField
    {
        private static readonly FieldIndexValueProvider Provider = new FieldIndexValueProvider();

        public object ComputeFieldValue(IIndexable indexable)
        {
            var item = ItemProvider.Get(indexable);

            if (item == null) return null;

            var title = Provider.GetValue(indexable, Foundation.SitecoreTemplates.Title_Required.Title.FieldName);

            return (title ?? item.Name).ToLowerInvariant().ToValueOrNull();
        }

        public string FieldName { get; set; }
        public string ReturnType { get; set; }
    }
}
