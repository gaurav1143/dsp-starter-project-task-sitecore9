using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.MetaData.Base
{
    public class BaseMetaData
    {
        [FieldMap]
        public string MetaDescription { get; set; }

        [FieldMap]
        public string MetaKeywords { get; set; }

        [FieldMap]
        public string MetaCanonical { get; set; }

        [FieldMap]
        public string MetaRobots { get; set; }
    }
}