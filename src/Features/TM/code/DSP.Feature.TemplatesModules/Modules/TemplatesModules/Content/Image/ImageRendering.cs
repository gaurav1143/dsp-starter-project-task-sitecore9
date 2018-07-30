using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Image
{
    public class ImageRendering : RenderingModel<Image>, IHideOnError
    {
        protected override Image InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return Map<Image>(dataSource.Item);
        }
    }
}