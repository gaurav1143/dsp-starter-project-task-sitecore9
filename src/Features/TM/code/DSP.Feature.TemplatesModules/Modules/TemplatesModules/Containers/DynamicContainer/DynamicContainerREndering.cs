using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Containers.DynamicContainer
{
    public class DynamicContainerRendering : RenderingModel<DynamicContainer>
    {
        protected override DynamicContainer InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            // does not use data source
            return Map<DynamicContainer>(CurrentItem);
        }
    }
}