using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DSP.Foundation.Aspects;

namespace DSP.Business.Search.SearchContext.Aspects
{
    public class FacetValuesAspect : ISearchAspect<IEnumerable<string>>
    {
        private readonly FacetValueValidator _facetValueValidator;

        public FacetValuesAspect(string key, string serializedValue, FacetValueValidator facetValueValidator)
        {
            _facetValueValidator = facetValueValidator;

            Key = key;
            Set(serializedValue);
        }

        public FacetValuesAspect(string key, IEnumerable<string> value, FacetValueValidator facetValueValidator)
        {
            _facetValueValidator = facetValueValidator;

            Key = key;
            Value = value ?? Enumerable.Empty<string>();
        }

        public string Key { get; }
        public IEnumerable<string> Value { get; private set; }

        public override string ToString()
        {
            var result = new StringBuilder();
            var delimiter = "";

            foreach (var facetValue in Value)
            {
                result.AppendFormat("{0}{1}", delimiter, facetValue);
                delimiter = Constants.SearchContext.Delimiter;
            }

            return result.ToString();
        }

        public void Set(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                Value = Enumerable.Empty<string>();
                return;
            }

            var tagValues = value.Split(new []{ Constants.SearchContext.Delimiter}, StringSplitOptions.RemoveEmptyEntries);
            var result = new List<string>();

            foreach (var tagValue in tagValues)
            {
                if (!_facetValueValidator.IsValid(tagValue)) continue;

                result.Add(tagValue);
            }

            Value = result;
        }
    }
}
