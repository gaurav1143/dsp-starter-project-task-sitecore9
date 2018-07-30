using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using DSP.Foundation.Navigation;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Navigation.Sitemap
{
    public class SitemapRendering : RenderingModel<NavigationItem>, IHideOnError
    {
        private readonly INavigationService _navigationService;

        public SitemapRendering(INavigationService navigationService)
        {
            _navigationService = navigationService;
        }

        protected override NavigationItem InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return _navigationService.BuildNavigationSitemap(SiteStartItem);
        }
    }
}