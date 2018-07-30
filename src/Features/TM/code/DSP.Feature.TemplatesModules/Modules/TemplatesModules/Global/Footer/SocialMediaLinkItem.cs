using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Global.Footer
{
    public class SocialMediaLinkItem
    {
        [FieldMap(Foundation.SitecoreTemplates.General_Link.GeneralLink.FieldName)]
        public ILinkFieldRenderingString GeneralLink { get; set; }

        [FieldMap(SitecoreTemplates.Social_Media_Link.IconCssClass.FieldName)]
        public string IconCssClass { get; set; }
    }
}