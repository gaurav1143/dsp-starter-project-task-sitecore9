using DSP.Business.Search.Sorting.SortOptions;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.SearchContext.Aspects
{
    public class SortOrderOptionAspect : ISearchAspect<ISortOrderOption>
    {
        private readonly ISortOrderOption _defaultSortOrderOption;
        private readonly ISortOptionRepository _sortOptionRepository;

        public SortOrderOptionAspect(string key, string serializedValue, ISortOrderOption defaultSortOrderOption, ISortOptionRepository sortOptionRepository)
        {
            _defaultSortOrderOption = defaultSortOrderOption ?? new DefaultSortOrderOption();
            _sortOptionRepository = sortOptionRepository;
            Key = key;
            Set(serializedValue);
        }

        public void Set(string value)
        {
            var sortKey = value;
            var selectedSortOrder = _sortOptionRepository.GetFromKey(sortKey ?? "");

            Value = selectedSortOrder ?? _defaultSortOrderOption;
        }

        public override string ToString()
        {
            return Value.Key;
        }

        public string Key { get; }
        public ISortOrderOption Value { get; private set; }
    }
}
