using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Accordion
{
    public class AccordionRendering : RenderingModel<Accordion>, IHideOnError
    {
        protected override Accordion InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var viewModel = Map<Accordion>(dataSource?.Item ?? CurrentItem);
            return viewModel;
        }
    }
}