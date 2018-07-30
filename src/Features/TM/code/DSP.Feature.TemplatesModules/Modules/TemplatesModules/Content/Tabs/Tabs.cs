using System.Collections.Generic;
using System.Linq;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Tabs
{
    public class Tabs
    {
        public Tabs()
        {
            TabItems = Enumerable.Empty<TabItem>();
        }

        [FieldMap(SitecoreTemplates.Tabs_Set.TabItems.FieldName, FieldType.Multi)]
        public IEnumerable<TabItem> TabItems { get; set; }
    }
}