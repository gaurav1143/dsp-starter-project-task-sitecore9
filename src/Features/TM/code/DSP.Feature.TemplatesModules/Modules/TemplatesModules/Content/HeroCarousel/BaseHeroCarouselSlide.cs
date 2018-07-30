using DeloitteDigital.Atlas.Mapping.ItemPropertyMapping;
using Sitecore.Data;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.HeroCarousel
{
    public class BaseHeroCarouselSlide
    {
        [ItemPropertyMap(ItemPropertyMappingType.ItemId)]
        public string ItemId { get; set; }

        [ItemPropertyMap(ItemPropertyMappingType.TemplateId)]
        public ID TemplateId { get; set; }
    }
}