using System;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.SearchContext.Aspects
{
    public class SearchOperatorAspect : ISearchAspect<SearchOperator>
    {
        private readonly SearchOperator _default = SearchOperator.And;

        public SearchOperatorAspect(string key, string serializedValue)
        {
            Set(serializedValue);
            Key = key;
        }

        public SearchOperatorAspect(string key, SearchOperator value)
        {
            Value = value;
            Key = key;
        }

        public string Key { get; }
        public SearchOperator Value { get; private set; }
        public void Set(string value)
        {
            SearchOperator result;

            Value = (Enum.TryParse(value, true, out result))
                ? result
                : _default;
        }

        public override string ToString()
        {
            return Value == _default 
                ? "" 
                : Value.ToString("G");
        }
    }
}
