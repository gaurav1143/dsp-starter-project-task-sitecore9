using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.MetaData.SocialMedia
{
    public class SocialMediaMetaData
    {
        [FieldMap]
        public MediaRenderingString SocialMediaImage { get; set; }

        [FieldMap]
        public string Title { get; set; }

        [FieldMap]
        public string MetaDescription { get; set; }

        public string TwitterSite { get; set; }
    }
}