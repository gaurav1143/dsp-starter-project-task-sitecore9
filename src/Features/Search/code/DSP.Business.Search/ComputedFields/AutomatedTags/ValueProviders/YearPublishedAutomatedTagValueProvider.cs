using System;
using DeloitteDigital.Atlas.Extensions;

namespace DSP.Business.Search.ComputedFields.AutomatedTags.ValueProviders
{
    using Sitecore.Data;
    using Sitecore.Data.Items;

    public class YearPublishedAutomatedTagValueProvider : IAutomatedTagValueProvider
    {
        private const string Datecreatedfield = "__created";

        public object GetValue(Item item)
        {
            if (item[Datecreatedfield] == null) return null;

            var value = item.GetDateTime(Datecreatedfield);

            if (!value.HasValue) return null;
            if (value.Value == DateTime.MinValue) return null;

            return string.Format(
                "{0}_{1}",
                Constants.AutomatedTags.YearPublished.ToShortID(),
                value.Value.Year);
        }

        public bool IsValid(string rawValue)
        {
            Tuple<ID, string> tagValue;

            if (!rawValue.TryParseAutomatedTagValue(out tagValue)) return false;

            if (!tagValue.Item1.Equals(Constants.AutomatedTags.YearPublished)) return false;

            int year;

            if (!int.TryParse(tagValue.Item2, out year)) return false;

            return year > 1700 && year < 2200;
        }

        public string GetDisplayValue(string rawValue)
        {
            var tagValue = rawValue.ParseAutomatedTagValue();

            return tagValue.Item2;
        }
    }
}
