using System.Collections.Generic;
using System.Linq;
using DeloitteDigital.Atlas.Mapping.FieldMapping;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Accordion
{
    public class Accordion
    {
        public Accordion()
        {
            AccordionItems = Enumerable.Empty<AccordionItem>();
        }

        [FieldMap(SitecoreTemplates.Accordion_Set.AccordionItems.FieldName, FieldType.Multi)]
        public IEnumerable<AccordionItem> AccordionItems { get; set; }
    }
}