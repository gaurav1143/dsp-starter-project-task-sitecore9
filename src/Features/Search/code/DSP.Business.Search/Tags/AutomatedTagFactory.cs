using System;
using Sitecore.DependencyInjection;

namespace DSP.Business.Search.Tags
{
    using ComputedFields.AutomatedTags;
    using ComputedFields.AutomatedTags.ValueProviders;

    using Sitecore.Data;

    public class AutomatedTagFactory
    {
        private static IAutomatedTagValueProvider _contentType, _yearPublished;

        // TODO - should this be declared in Sitecore e.g. against the automated tag?
        private static IAutomatedTagValueProvider ContentType => _contentType ?? (_contentType = GetTagValueProvider<ContentTypeAutomatedTagValueProvider>());
        private static IAutomatedTagValueProvider YearPublished => _yearPublished ?? (_yearPublished = GetTagValueProvider<YearPublishedAutomatedTagValueProvider>());

        private static IAutomatedTagValueProvider GetTagValueProvider<T>() where T:IAutomatedTagValueProvider
        {
            return (IAutomatedTagValueProvider) ServiceLocator.ServiceProvider.GetService(typeof(T));
        }

        /// <summary>
        /// Create a new AutomatedTag from the given tagValue.
        /// </summary>
        /// <param name="rawValue">a tagValue in the form nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn_value</param>
        /// <returns>An AutomatedTag object or null</returns>
        public AutomatedTag Create(string rawValue)
        {
            if (string.IsNullOrWhiteSpace(rawValue)) return null;

            Tuple<ID, string> tagValue;

            if (!rawValue.TryParseAutomatedTagValue(out tagValue)) return null;

            var facetId = tagValue.Item1;

            if (!IsValid(rawValue, facetId)) return null;

            var title = GetTitle(rawValue, facetId);

            return new AutomatedTag(tagValue.Item1, rawValue, title);
        }

        public bool IsValid(string rawValue)
        {
            Tuple<ID, string> tagValue;

            if (!rawValue.TryParseAutomatedTagValue(out tagValue)) return false;

            var facetId = tagValue.Item1;

            return IsValid(rawValue, facetId);
        }

        private static bool IsValid(string rawValue, ID facetId)
        {
            switch (facetId.ToString())
            {
                case Constants.AutomatedTags.ContentTypeString: return ContentType.IsValid(rawValue);
                case Constants.AutomatedTags.YearPublishedString: return YearPublished.IsValid(rawValue);

                default: return false;
            }
        }

        private static string GetTitle(string rawValue, ID facetId)
        {
            switch (facetId.ToString())
            {
                case Constants.AutomatedTags.ContentTypeString: return ContentType.GetDisplayValue(rawValue);
                case Constants.AutomatedTags.YearPublishedString: return YearPublished.GetDisplayValue(rawValue);

                default: return "";
            }
        }
    }
}
