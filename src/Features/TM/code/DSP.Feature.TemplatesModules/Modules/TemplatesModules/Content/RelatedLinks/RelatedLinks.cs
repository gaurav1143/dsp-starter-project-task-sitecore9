using System.Collections.Generic;
using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.ChildrenMapping;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.RelatedLinks
{
    public class RelatedLinks
    {
        [FieldMap]
        public IFieldRenderingString Title { get; set; }

        [ChildrenMap(ChildrenMapType.Direct)]
        public IEnumerable<RelatedLinkItem> Links { get; set; }
    }
}