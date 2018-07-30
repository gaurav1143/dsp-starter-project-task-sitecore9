using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.RelatedLinks
{
    public class RelatedLinksRendering : RenderingModel<RelatedLinks>, IHideOnError
    {
        protected override RelatedLinks InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return Map<RelatedLinks>(dataSource.Item);
        }
    }
}