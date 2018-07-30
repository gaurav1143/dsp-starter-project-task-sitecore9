using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using DSP.Foundation.Navigation;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.ChildListing
{
    public class ChildListingRendering : RenderingModel<NavigationItem>, IHideOnError
    {
        private readonly INavigationService navigationService;

        public ChildListingRendering(INavigationService navigationService)
        {
            this.navigationService = navigationService;
        }

        protected override NavigationItem InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return dataSource.HasItems
                ? navigationService.BuildNavigation(dataSource.Item, 2)
                : navigationService.BuildNavigation(CurrentItem, 2);
        }
    }
}