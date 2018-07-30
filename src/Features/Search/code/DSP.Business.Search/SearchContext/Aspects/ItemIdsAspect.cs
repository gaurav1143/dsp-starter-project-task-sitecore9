using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DeloitteDigital.Atlas.Extensions;
using DSP.Foundation.Aspects;
using Sitecore.Data;

namespace DSP.Business.Search.SearchContext.Aspects
{
    public class ItemIdsAspect : ISearchAspect<IEnumerable<ID>>
    {
        public ItemIdsAspect(string key, string serializedValue)
        {
            Key = key;
            Set(serializedValue);
        }

        public ItemIdsAspect(string key, IEnumerable<ID> value)
        {
            Key = key;
            Value = value ?? Enumerable.Empty<ID>();
        }

        public string Key { get; }
        public IEnumerable<ID> Value { get; private set; }
        public override string ToString()
        {
            var result = new StringBuilder();
            var delimiter = "";

            foreach (var v in Value)
            {
                result.AppendFormat("{0}{1}", delimiter, v.ToShortID());
                delimiter = Constants.SearchContext.Delimiter;
            }

            return result.ToString();
        }

        public void Set(string value)
        {
            var values = value.Split(new[] { Constants.SearchContext.Delimiter }, StringSplitOptions.RemoveEmptyEntries);

            Value = values.Select(AsId).Where(id => !id.IsNull);
        }

        private static ID AsId(string value)
        {
            ID id;
            return value.TryParseShortID(out id)
                ? id
                : ID.Null;
        }
    }
}
