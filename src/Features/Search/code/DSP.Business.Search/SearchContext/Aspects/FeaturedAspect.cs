using System;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.SearchContext.Aspects
{
    public class FeaturedAspect : ISearchAspect<FeaturedOption>
    {
        private readonly FeaturedOption _default = FeaturedOption.Both;

        public FeaturedAspect(string key, string serializedValue)
        {
            Set(serializedValue);
            Key = key;
        }

        public FeaturedAspect(string key, FeaturedOption value)
        {
            Value = value;
            Key = key;
        }

        public string Key { get; }
        public FeaturedOption Value { get; private set; }
        public void Set(string value)
        {
            FeaturedOption result;

            Value = (Enum.TryParse(value, true, out result))
                ? result
                : _default;
        }

        public override string ToString()
        {
            return Value == _default ? "" : Value.ToString("G");
        }
    }
}