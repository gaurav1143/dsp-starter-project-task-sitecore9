using System.Collections.Generic;
using System.Linq;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Map
{
    public class Map
    {
        public Map()
        {
            MapModuleItems = Enumerable.Empty<MapItem>();
        }

        [FieldMap]
        public string MapAPIKey { get; set; }
        [FieldMap(SitecoreTemplates.Map_Module.MapItems.FieldName, FieldType.Multi)]
        public IEnumerable<MapItem> MapModuleItems { get; set; }
    }
}