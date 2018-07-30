using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.MetaData.Agls
{
    public class AglsMetaData
    {
        [FieldMap]
        public string AglsSubject { get; set; }

        [FieldMap]
        public string AglsCreator { get; set; }

        [FieldMap]
        public string MetaBrowserTitle { get; set; }

        [FieldMap]
        public string MetaDescription { get; set; }
    }
}