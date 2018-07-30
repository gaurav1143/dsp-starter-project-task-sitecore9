using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using DSP.Foundation.Configuration;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Global.Header
{
    public class HeaderRendering : RenderingModel<SiteConfiguration>, IHideOnError
    {
        private readonly ISiteConfigurationRepository _siteConfigurationRepository;

        public HeaderRendering(ISiteConfigurationRepository siteConfigurationRepository)
        {
            _siteConfigurationRepository = siteConfigurationRepository;
        }

        protected override SiteConfiguration InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            return _siteConfigurationRepository.GetSiteConfiguration(SiteRootItem);
        }
    }
}