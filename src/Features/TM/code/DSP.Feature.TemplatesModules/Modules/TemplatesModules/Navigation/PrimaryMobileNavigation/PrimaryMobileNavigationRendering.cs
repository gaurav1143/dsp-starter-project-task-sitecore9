using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DSP.Foundation.Navigation;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Navigation.PrimaryMobileNavigation
{
    public class PrimaryMobileNavigationRendering : RenderingModel<NavigationItem>
    {
        protected override NavigationItem InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return Map<NavigationItem>(SiteStartItem);
        }
    }
}