using DSP.Foundation.Aspects;

namespace DSP.Business.Search.SearchContext.Aspects
{
    public class QueryAspect : ISearchAspect<string>
    {
        public QueryAspect(string key, string value)
        {
            Key = key;
            Set(value);
        }

        public string Key { get; }
        public string Value { get; private set; }
        public override string ToString()
        {
            return Value;
        }

        public void Set(string value)
        {
            Value = value ?? "";
        }
    }
}
