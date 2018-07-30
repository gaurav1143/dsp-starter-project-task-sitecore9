using DSP.Business.Search;
using DSP.Business.Search.Tags;
using System.Collections.Generic;
using System.Linq;

namespace DSP.Feature.Search.Modules.Search.Tags
{
    using DeloitteDigital.Atlas.Mapping.FieldMapping;
    using DeloitteDigital.Atlas.Mapping.ItemPropertyMapping;

    using Sitecore.Data;

    public class Tag
    {
        [FieldMap(Foundation.SitecoreTemplates.Title.Title_Field.FieldName)]
        public string Title { get; set; }

        [FieldMap(SitecoreTemplates.Content_Tag.HideFromDisplay.FieldName)]
        public bool HideFromDisplay { get; set; }

        [FieldMap(SitecoreTemplates.Content_Tag.HideFromFacet.FieldName)]
        public bool HideFromFacet { get; set; }

        [ItemPropertyMap(ItemPropertyMappingType.ItemId)]
        public ID ItemId { get; set; }

        public string GetUrl(string baseUrl = null)
        {
            return $"{baseUrl}?{Constants.SearchContext.Keys.Facets}={ItemId.ToShortID()}";
        }

        public static IEnumerable<Tag> FromContentTags(IEnumerable<ContentTag> contentTags)
        {
            return contentTags.Select(t => new Tag
            {
                Title = t.Title,
                HideFromDisplay = t.IsHiddenFromDisplay,
                HideFromFacet = t.IsHiddenFromFacet,
                ItemId = t.Id
            });
        }
    }
}