using System;
using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using DSP.Foundation.Configuration;
using DSP.Foundation.Navigation;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Navigation
{
    public class NavigationRendering : RenderingModel<Tuple<NavigationItem, SiteConfiguration>>, IHideOnError
    {
        private readonly INavigationService _navigationService;
        private readonly ISiteConfigurationRepository _siteConfigurationRepository;

        public NavigationRendering(INavigationService navigationService, ISiteConfigurationRepository siteConfigurationRepository)
        {
            _navigationService = navigationService;
            _siteConfigurationRepository = siteConfigurationRepository;
        }

        protected override Tuple<NavigationItem, SiteConfiguration> InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            // the navigation items are cached based on the start item and depth to increase performance
            // "currently active" item is determined in the view, not the view model 
            return new Tuple<NavigationItem, SiteConfiguration>(_navigationService.BuildNavigation(SiteStartItem, 4),
                                                                _siteConfigurationRepository.GetSiteConfiguration(SiteRootItem));
        }

        public string BuildActiveClass(NavigationItem navigationItem, string activeClass = "is-active", string activeParentClass = "is-active-parent")
        {
            if (IsActiveItem(navigationItem))
                return activeClass;
            if (IsInActivePath(navigationItem))
                return activeParentClass;
            return string.Empty;
        }

        public bool IsActiveItem(NavigationItem navigationItem)
        {
            return CurrentItem.ID.ToString().Equals(navigationItem.ItemId);
        }

        public bool IsInActivePath(NavigationItem navigationItem)
        {
            return CurrentItem.Paths.Path.Contains(navigationItem.ItemPath);
        }
    }
}