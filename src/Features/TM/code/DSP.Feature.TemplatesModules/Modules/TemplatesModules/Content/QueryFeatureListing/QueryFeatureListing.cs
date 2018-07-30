using System.Collections.Generic;
using System.Linq;
using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.QueryFeatureListing
{
    public class QueryFeatureListing
    {
        public QueryFeatureListing()
            :this(null)
        {
        }

        public QueryFeatureListing(IEnumerable<QueryFeatureListingItem> items)
        {
            Items = items ?? Enumerable.Empty<QueryFeatureListingItem>();
        }

        [FieldMap]
        public IFieldRenderingString Title { get; set; }

        [FieldMap(DSP.Foundation.SitecoreTemplates.Has_Dark_Option.IsDark.FieldName)]
        public bool IsDark { get; set; }

        private IEnumerable<QueryFeatureListingItem> Items { get; }

        public QueryFeatureListingItem FirstOrDefaultItem => Items.FirstOrDefault();

        public IEnumerable<QueryFeatureListingItem> ChildItems => Items.Skip(1).Take(3);

        public bool HasChildItems => ChildItems.Any();

        public string IsDarkClass => IsDark ? "is-dark" : "";

        public string HasItemsClass => HasChildItems ? "has-items" : "";

        public string HasChildItemsClass => HasChildItems ? $"has-{ChildItems.Count()}-items" : "";
    }
}