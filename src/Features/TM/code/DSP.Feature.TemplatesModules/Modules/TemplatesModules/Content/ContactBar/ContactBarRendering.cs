using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.ContactBar
{
    public class ContactBarRendering : RenderingModel<ContactBar>, IHideOnError
    {
        protected override ContactBar InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return Map<ContactBar>(dataSource?.Item ?? CurrentItem);
        }
    }
}