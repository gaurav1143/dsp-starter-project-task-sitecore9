using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.HeroCarousel
{
    public class HeroCarouselSlide : BaseHeroCarouselSlide
    {
        [FieldMap(Foundation.SitecoreTemplates.General_Link.GeneralLink.FieldName)]
        public ILinkFieldRenderingString GeneralLink { get; set; }

        [FieldMap(Foundation.SitecoreTemplates.Short_Description.ShortDescription.FieldName)]
        public IFieldRenderingString ShortDescription { get; set; }

        [FieldMap(Foundation.SitecoreTemplates.Title_Required.Title.FieldName)]
        public IFieldRenderingString Title { get; set; }

        [FieldMap(Foundation.SitecoreTemplates.Has_Text_Background_Option.TextBackgroundOption.FieldName)]
        public string TextBackgroundOption { get; set; }        

        [FieldMap]
        public IMediaRenderingString GeneralImage { get; set; }
    }
}