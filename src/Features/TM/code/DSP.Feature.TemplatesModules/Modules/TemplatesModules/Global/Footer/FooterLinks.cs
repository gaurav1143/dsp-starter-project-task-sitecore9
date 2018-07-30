using System.Collections.Generic;
using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.ChildrenMapping;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Global.Footer
{
    public class FooterLinks
    {
        [FieldMap(Foundation.SitecoreTemplates.General_Link.GeneralLink.FieldName)]
        public ILinkFieldRenderingString GeneralLink { get; set; }

        [ChildrenMap(ChildrenMapType.Direct)]
        public IEnumerable<FooterLinkItem> LinkItems { get; set; } 
    }
}