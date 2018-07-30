using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.ContentTile
{
    public class ContentTileRendering : RenderingModel<ContentTile>, IHideOnError
    {
        protected override ContentTile InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return Map<ContentTile>(dataSource.Item);
        }
    }
}