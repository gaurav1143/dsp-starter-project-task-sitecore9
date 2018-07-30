using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.HeroBanner
{
    public class HeroBannerRendering : RenderingModel<HeroBanner>, IHideOnError
    {
        protected override HeroBanner InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return Map<HeroBanner>(dataSource.Item);
        }
    }
}