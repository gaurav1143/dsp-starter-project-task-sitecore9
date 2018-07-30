using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;
using DeloitteDigital.Atlas.Mapping.RenderingParameterMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.HeroBanner
{
    public class HeroBanner
    {
        [FieldMap]
        public ILinkFieldRenderingString GeneralLink { get; set; }

        [FieldMap]
        public IFieldRenderingString ShortDescription { get; set; }

        [FieldMap]
        public IMediaRenderingString GeneralImage { get; set; }

        [FieldMap]
        public IFieldRenderingString Title { get; set; }

        [RenderingParameterMap(Foundation.SitecoreTemplates.Has_Image_Size_Option.ImageSizeOption.FieldName)]
        public string ImageSizeOption { get; set; }

        [RenderingParameterMap(Foundation.SitecoreTemplates.Has_Text_Background_Option.TextBackgroundOption.FieldName)]
        public string TextBackgroundOption { get; set; }

        [RenderingParameterMap(Foundation.SitecoreTemplates.Has_Text_Position_Option.TextPositionOption.FieldName)]
        public string TextPositionOption { get; set; }

        [RenderingParameterMap(Foundation.SitecoreTemplates.Has_Banner_Size_Option.BannerSizeOption.FieldName)]
        public string BannerSizeOption { get; set; }
    }
}