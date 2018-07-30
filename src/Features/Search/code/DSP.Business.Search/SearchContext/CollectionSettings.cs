namespace DSP.Business.Search.SearchContext
{
    using System.Collections.Generic;

    using Sorting.SortOptions;

    using DeloitteDigital.Atlas.Mapping.FieldMapping;

    using Sitecore.Data.Items;

    public class CollectionSettings
    {
        [FieldMap(DSP.Foundation.SitecoreTemplates.Has_Keyword_Facet.ShowKeywordFacet.FieldName)]
        public bool ShowKeywordFacet { get; set; }

        public Item CollectionSource { get; set; }

        public IEnumerable<Item> CollectionFacets { get; set; }

        [FieldMap(DSP.Foundation.SitecoreTemplates.Has_Sort_Order.SortOrder.FieldName, FieldType.Multi)]
        public IEnumerable<SortOrderOption> SortOptions { get; set; }

        [FieldMap(DSP.Foundation.SitecoreTemplates.Has_Sort_Order_Default_Setting.SortOrderDefault.FieldName)]
        public SortOrderOption DefaultSortOrderOption { get; set; }
    }
}