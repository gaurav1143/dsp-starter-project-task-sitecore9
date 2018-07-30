using System;

namespace DSP.Business.Search.ComputedFields.AutomatedTags
{
    using DeloitteDigital.Atlas.Extensions;

    using Sitecore.Data;

    public static class TagValueExtensions
    {
        public static bool IsAutomatedTagValueFormat(this string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return false;

            var values = value.Split(new[] { '_' }, StringSplitOptions.RemoveEmptyEntries);

            if (values.Length != 2) return false;

            return values[0].IsShortIDFormat();
        }

        /// <summary>
        /// Parse an automated tag value.
        /// </summary>
        /// <param name="value"></param>
        /// <returns>A Tuple containing the Facet ID and value</returns>
        /// <exception cref="ArgumentException"></exception>
        public static Tuple<ID, string> ParseAutomatedTagValue(this string value)
        {
            if (!IsAutomatedTagValueFormat(value)) throw new ArgumentException("value is not in an automated tag value format");

            var values = value.Split(new[] { '_' }, StringSplitOptions.RemoveEmptyEntries);

            return new Tuple<ID, string>(values[0].ParseShortID(), values[1]);
        }

        public static bool TryParseAutomatedTagValue(this string value, out Tuple<ID, string> result)
        {
            result = null;

            if (!IsAutomatedTagValueFormat(value)) return false;

            result = ParseAutomatedTagValue(value);

            return true;
        }
    }
}
