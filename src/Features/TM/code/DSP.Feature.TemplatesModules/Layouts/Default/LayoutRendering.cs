using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Layouts.Default
{
    public class LayoutRendering : RenderingModel<Layout>
    {
        protected override Layout InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return Map<Layout>(this.CurrentItem);
        }
    }
}