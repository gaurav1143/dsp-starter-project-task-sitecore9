using DSP.Foundation.Aspects;

namespace DSP.Business.Search.Sorting.SortOptions
{
    using DeloitteDigital.Atlas.Mapping.FieldMapping;

    public class SortOrderOption : ISortOrderOption
    {
        [FieldMap]
        public string Key { get; set; }
        [FieldMap]
        public string Label { get; set; }
        [FieldMap]
        public string Type { get; set; }        
    }

    public class DefaultSortOrderOption : SortOrderOption
    {
        public DefaultSortOrderOption()
        {
            Key = "relevance";
            Label = "Relevance";
            Type = typeof(RelevanceSorter).ToString();
        }        
    }
}
