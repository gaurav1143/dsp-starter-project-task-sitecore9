using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Image
{
    public class Image
    {
        [FieldMap]
        public IFieldRenderingString ImageCaption { get; set; }

        [FieldMap]
        public IMediaRenderingString GeneralImage { get; set; }

        [FieldMap]
        public IFieldRenderingString Title { get; set; }
    }
}
