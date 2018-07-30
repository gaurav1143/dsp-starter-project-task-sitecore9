using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Map
{
    public class MapItem
    {
        [FieldMap(Foundation.SitecoreTemplates.General_Link.GeneralLink.FieldName)]
        public ILinkFieldRenderingString Link { get; set; }
        [FieldMap(Foundation.SitecoreTemplates.Title_Required.Title.FieldName)]
        public IFieldRenderingString Title { get; set; }
        [FieldMap(Foundation.SitecoreTemplates.General_Text.GeneralText.FieldName)]
        public IFieldRenderingString GeneralText { get; set; }
        [FieldMap(SitecoreTemplates.Map_Item.Latitude.FieldName)]
        public IFieldRenderingString Latitude { get; set; }
        [FieldMap(SitecoreTemplates.Map_Item.Longitude.FieldName)]
        public IFieldRenderingString Longitude { get; set; }
    }
}