using DeloitteDigital.Atlas.FieldRendering;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Accordion
{
    public class AccordionItem
    {
        [FieldMap(Foundation.SitecoreTemplates.Title.Title_Field.FieldName)]
        public IFieldRenderingString Title { get; set; }

        [FieldMap(Foundation.SitecoreTemplates.General_Text.GeneralText.FieldName)]
        public IFieldRenderingString GeneralText { get; set; }
    }
}