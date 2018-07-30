using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.MetaData.Agls
{
    public class AglsMetaDataRendering : RenderingModel<AglsMetaData>, IHideOnError
    {
        protected override AglsMetaData InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return Map<AglsMetaData>(CurrentItem);
        }
    }
}