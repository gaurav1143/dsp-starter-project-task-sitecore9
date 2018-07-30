using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.IFrame
{
    public class IFrameRendering : RenderingModel<IFrame>, IHideOnError
    {
        protected override IFrame InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return Map<IFrame>(dataSource?.Item ?? CurrentItem);
        }
    }
}