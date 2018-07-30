using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.LandingBanner
{
    public class LandingBanner
    {
        [FieldMap]
        public IFieldRenderingString GeneralText { get; set; }

        [FieldMap]
        public IFieldRenderingString Title { get; set; }

        [FieldMap]
        public IMediaRenderingString BannerImage { get; set; }

        [FieldMap]
        public bool IsDark { get; set; }
    }
}