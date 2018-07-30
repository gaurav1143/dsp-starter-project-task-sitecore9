namespace DSP.Business.Search.SearchContext
{
    using ComputedFields.AutomatedTags;

    using DeloitteDigital.Atlas.Extensions;

    using Tags;

    public class FacetValueValidator
    {
        private readonly AutomatedTagFactory automatedTagFactory;
        private readonly ContentTagFactory contentTagFactory;

        public FacetValueValidator(AutomatedTagFactory automatedTagFactory, ContentTagFactory contentTagFactory)
        {
            this.automatedTagFactory = automatedTagFactory;
            this.contentTagFactory = contentTagFactory;
        }

        public bool IsValid(string facetValue)
        {
            if (facetValue.IsAutomatedTagValueFormat())
            {
                return automatedTagFactory.IsValid(facetValue);
            }

            if (facetValue.IsShortIDFormat())
            {
                return contentTagFactory.IsValid(facetValue);
            }

            return false;
        }
    }
}
