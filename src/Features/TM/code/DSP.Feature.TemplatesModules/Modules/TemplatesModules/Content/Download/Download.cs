using System.Collections.Generic;
using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;
using DeloitteDigital.Atlas.Mapping.ItemPropertyMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Download
{
    public class Download
    {
        [FieldMap(FieldType.Multi)]
        public IEnumerable<DownloadItem> Downloads { get; set; }

        [FieldMap]
        public IFieldRenderingString Title { get; set; }

        [ItemPropertyMap(ItemPropertyMappingType.ItemId)]
        public string ItemId { get; set; }
    }
}