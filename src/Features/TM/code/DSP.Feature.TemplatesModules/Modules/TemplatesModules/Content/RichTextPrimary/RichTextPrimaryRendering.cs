using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.RichTextPrimary
{
    public class RichTextPrimaryRendering : RenderingModel<RichTextPrimary>, IHideOnError
    {
        protected override RichTextPrimary InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return Map<RichTextPrimary>(CurrentItem);
        }
    }
}