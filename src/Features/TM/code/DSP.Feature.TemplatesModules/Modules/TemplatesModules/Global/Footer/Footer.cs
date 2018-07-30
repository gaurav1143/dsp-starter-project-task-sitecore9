using System.Collections.Generic;
using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.ChildrenMapping;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Global.Footer
{
    public class Footer
    {
        [FieldMap(SitecoreTemplates.Footer.Copyright.FieldName)]
        public IFieldRenderingString Copyright { get; set; }

        [ChildrenMap(SitecoreTemplates.Footer.FooterLinks.FieldName, ChildrenMapType.Field)] 
        public IEnumerable<FooterLinks> FooterLinks { get; set; }

        [ChildrenMap(SitecoreTemplates.Footer.SocialMediaLinks.FieldName, ChildrenMapType.Field)]
        public IEnumerable<SocialMediaLinkItem> SocialMediaLinks { get; set; } 
    }
}