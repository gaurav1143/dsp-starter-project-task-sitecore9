using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Global.Footer
{
    public class FooterLinkItem
    {
        [FieldMap(Foundation.SitecoreTemplates.General_Link.GeneralLink.FieldName)]
        public ILinkFieldRenderingString GeneralLink { get; set; }
    }
}