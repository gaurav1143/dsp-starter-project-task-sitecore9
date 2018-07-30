using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.RichText
{
    public class RichText
    {
        [FieldMap]
        public IFieldRenderingString GeneralText { get; set; }
    }
}