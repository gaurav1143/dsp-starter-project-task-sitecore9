using DeloitteDigital.Atlas.Mapping.FieldMapping;
using DeloitteDigital.Atlas.Mapping.ItemPropertyMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Navigation.Breadcrumb
{
    public class Breadcrumb
    {
        [FieldMap]
        public string NavigationTitle { get; set; }

        [ItemPropertyMap(ItemPropertyMappingType.ItemUrl)]
        public string Url { get; set; }

        [FieldMap]
        public bool HideFromNavigation { get; set; }

        public string CssClass { get; set; }

        public bool IsActive { get; set; }
    }
}