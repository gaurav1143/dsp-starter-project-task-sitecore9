using DeloitteDigital.Atlas.Mapping.FieldMapping;
using DeloitteDigital.Atlas.Mapping.ItemPropertyMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.HeroLinks
{
    public class HeroLinksItem
    {
        [FieldMap]
        public string Title { get; set; }

        public string ContentType { get; set; }

        [ItemPropertyMap(ItemPropertyMappingType.ItemUrl)]
        public string ItemUrl { get; set; }

        [FieldMap]
        public string ContentTags { get; set; }
    }
}