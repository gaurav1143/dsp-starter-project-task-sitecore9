using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.RichText
{
    public class RichTextRendering : RenderingModel<RichText>, IHideOnError
    {
        protected override RichText InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return Map<RichText>(dataSource.Item);
        }
    }
}