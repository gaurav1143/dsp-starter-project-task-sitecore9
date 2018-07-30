using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Layouts.Default
{
    public class Layout
    {
        [FieldMap]
        public string MetaBrowserTitle { get; set; }

        [FieldMap]
        public string MetaKeywords { get; set; }
    }
}