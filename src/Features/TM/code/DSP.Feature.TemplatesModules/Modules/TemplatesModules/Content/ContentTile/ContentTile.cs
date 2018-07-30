using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.ContentTile
{
    public class ContentTile
    {
        [FieldMap]
        public ILinkFieldRenderingString GeneralLink { get; set; }

        [FieldMap]
        public IFieldRenderingString Description { get; set; }

        [FieldMap]
        public IMediaRenderingString GeneralImage { get; set; }

        [FieldMap]
        public IFieldRenderingString Title { get; set; }
    }
}