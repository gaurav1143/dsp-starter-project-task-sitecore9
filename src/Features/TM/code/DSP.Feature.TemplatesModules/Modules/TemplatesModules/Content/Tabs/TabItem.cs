using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;
using DeloitteDigital.Atlas.Mapping.ItemPropertyMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Tabs
{
    public class TabItem
    {
        [ItemPropertyMap(ItemPropertyMappingType.ItemId)]
        public string ItemId { get; set; }

        [FieldMap(Foundation.SitecoreTemplates.Title_Required.Title.FieldName)]
        public IFieldRenderingString Title { get; set; }

        [FieldMap(Foundation.SitecoreTemplates.General_Text.GeneralText.FieldName)]
        public IFieldRenderingString GeneralText { get; set; }
    }
}