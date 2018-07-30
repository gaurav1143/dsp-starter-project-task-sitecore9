using System.Linq;
using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using DSP.Foundation.Configuration;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Global.Footer
{
    public class FooterRendering : RenderingModel<Footer>, IHideOnError
    {
        private readonly ISiteConfigurationRepository _siteConfigurationRepository;

        public FooterRendering(ISiteConfigurationRepository siteConfigurationRepository)
        {
            _siteConfigurationRepository = siteConfigurationRepository;
        }

        protected override Footer InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var config = _siteConfigurationRepository.GetSiteConfiguration(SiteRootItem);
            // mapping the config item separately to keep the footer content out of the general site config
            return Map<Footer>(config.ConfigItem);
        }

        public string RenderCssClass()
        {
            var count = ViewModel.FooterLinks.Count() + (ViewModel.SocialMediaLinks.Any() ? 1 : 0);
            return count > 1 ? $"has-{count}-items" : string.Empty;
        }
    }
}