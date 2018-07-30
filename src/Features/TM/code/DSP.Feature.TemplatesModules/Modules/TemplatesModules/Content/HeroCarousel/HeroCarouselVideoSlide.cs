using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.HeroCarousel
{
    public class HeroCarouselVideoSlide : HeroCarouselSlide
    {
        [FieldMap(SitecoreTemplates.Hero_Carousel_Video_Item.VideoMp4.FieldName)]
        public ILinkFieldRenderingString VideoMp4 { get; set; }

        [FieldMap(SitecoreTemplates.Hero_Carousel_Video_Item.VideoWebm.FieldName)]
        public ILinkFieldRenderingString VideoWebm { get; set; }
    }
}