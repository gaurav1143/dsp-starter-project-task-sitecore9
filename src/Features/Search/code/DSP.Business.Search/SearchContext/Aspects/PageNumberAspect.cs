using System.Globalization;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.SearchContext.Aspects
{
    public class PageNumberAspect : ISearchAspect<int>
    {
        public PageNumberAspect(string key, string serializedValue)
        {
            Key = key;
            Set(serializedValue);
        }

        public PageNumberAspect(string key, int value)
        {
            Key = key;
            Value = value;
        }

        public string Key { get; }
        public int Value { get; private set; }
        public void Set(string value)
        {
            var pageNumber = AsInt(value, 1);

            if (pageNumber < 1) pageNumber = 1;

            Value = pageNumber;
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
