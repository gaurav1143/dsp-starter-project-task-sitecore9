using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using DSP.Foundation.Configuration;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.SocialShare
{
    public class SocialShareRendering : RenderingModel<SocialShare>, IHideOnError
    {
        private readonly ISiteConfigurationRepository _siteConfigurationRepository;
        public SocialShareRendering(ISiteConfigurationRepository siteConfigurationRepository)
        {
            _siteConfigurationRepository = siteConfigurationRepository;
        }

        protected override SocialShare InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return new SocialShare
            {
                FacebookAppID = _siteConfigurationRepository.GetSiteConfiguration(SiteRootItem).FacebookAppID
            };
        }
    }
}