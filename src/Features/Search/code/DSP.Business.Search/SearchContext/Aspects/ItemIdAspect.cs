using DeloitteDigital.Atlas.Extensions;
using DSP.Foundation.Aspects;
using Sitecore.Data;

namespace DSP.Business.Search.SearchContext.Aspects
{
    public class ItemIdAspect : ISearchAspect<ID>
    {
        public ItemIdAspect(string key, string serializedValue)
        {
            Key = key;
            Set(serializedValue);
        }

        public ItemIdAspect(string key, ID value)
        {
            Key = key;
            Value = value ?? ID.Null;
        }

        public string Key { get; }

        public ID Value { get; private set; }

        public void Set(string value)
        {
            ID id;
            Value = value.TryParseShortID(out id)
                ? id
                : ID.Null;
        }

        public override string ToString()
        {
            return Value == ID.Null
                ? ""
                : Value.ToShortID().ToString();
        }
    }
}
