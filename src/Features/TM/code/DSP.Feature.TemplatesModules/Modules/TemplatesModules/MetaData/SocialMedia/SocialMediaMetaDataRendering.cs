using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using DSP.Foundation.Configuration;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.MetaData.SocialMedia
{
    public class SocialMediaMetaDataRendering : RenderingModel<SocialMediaMetaData>, IHideOnError
    {
        private readonly ISiteConfigurationRepository _siteConfigurationRepository;

        public SocialMediaMetaDataRendering(ISiteConfigurationRepository siteConfigurationRepository)
        {
            _siteConfigurationRepository = siteConfigurationRepository;
        }

        protected override SocialMediaMetaData InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var socialMediaMapping = Map<SocialMediaMetaData>(CurrentItem);
            socialMediaMapping.TwitterSite = _siteConfigurationRepository.GetSiteConfiguration(SiteRootItem).SocialMediaTwitterAccount;
            return socialMediaMapping;
        }
    }
}