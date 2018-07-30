using System.Collections.Generic;
using System.Linq;
using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.HeroLinks
{
    public class HeroLinks
    {
        public HeroLinks()
        {
            HeroLinksItems = Enumerable.Empty<HeroLinksItem>();
        }

        [FieldMap]
        public IFieldRenderingString Title { get; set; }

        [FieldMap(FieldType.Multi)]
        public IEnumerable<HeroLinksItem> HeroLinksItems { get; set; }
    }
}