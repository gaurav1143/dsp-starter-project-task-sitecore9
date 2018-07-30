using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Tabs
{
    public class TabsRendering : RenderingModel<Tabs>, IHideOnError
    {
        protected override Tabs InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var viewModel = Map<Tabs>(dataSource?.Item ?? CurrentItem);
            return viewModel;
        }
    }
}