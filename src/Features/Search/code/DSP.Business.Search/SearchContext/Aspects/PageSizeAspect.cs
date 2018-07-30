using System.Globalization;
using System.Linq;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.SearchContext.Aspects
{
    public class PageSizeAspect : ISearchAspect<int>
    {
        private readonly int[] _validPageSizes;
        private readonly int _defaultPageSize;
        private const int MaxPageSize = 200;

        public PageSizeAspect(string key, string serializedValue, int[] validPageSizes)
        {
            _validPageSizes = validPageSizes;
            _defaultPageSize = _validPageSizes.First();
            Key = key;
            Set(serializedValue);
        }

        public PageSizeAspect(string key, int value, int[] validPageSizes)
        {
            _validPageSizes = validPageSizes;
            _defaultPageSize = _validPageSizes.First();
            Key = key;
            Value = value;
        }

        public string Key { get; }
        public int Value { get; private set; }
        public void Set(string value)
        {
            var pageSize = AsInt(value, _defaultPageSize);

            if (pageSize < 1) pageSize = _defaultPageSize;
            if (pageSize > MaxPageSize) pageSize = MaxPageSize;
            if (!_validPageSizes.Contains(pageSize)) pageSize = _defaultPageSize;

            Value = pageSize;
        }

        public override string ToString()
        {
            return Value.ToString(CultureInfo.InvariantCulture);
        }

        private static int AsInt(string value, int defaultValue = 0)
        {
            if (string.IsNullOrWhiteSpace(value)) return defaultValue;

            int temp;
            return int.TryParse(value, out temp)
                ? temp
                : defaultValue;
        }
    }
}