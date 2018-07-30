using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;
using DeloitteDigital.Atlas.Mapping.ItemPropertyMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.RelatedLinks
{
    public class RelatedLinkItem
    {
        [FieldMap]
        public ILinkFieldRenderingString GeneralLink { get; set; }

        [FieldMap]
        public IFieldRenderingString ShortDescription { get; set; }

        [ItemPropertyMap(ItemPropertyMappingType.ItemId)]
        public string ItemId { get; set; }
    }
}