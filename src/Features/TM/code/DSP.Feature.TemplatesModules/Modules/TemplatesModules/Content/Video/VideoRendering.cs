using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Video
{
    public class VideoRendering : RenderingModel<Video>, IHideOnError
    {
        protected override Video InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return (Map<Video>(dataSource?.Item ?? CurrentItem));
        }
    }
}