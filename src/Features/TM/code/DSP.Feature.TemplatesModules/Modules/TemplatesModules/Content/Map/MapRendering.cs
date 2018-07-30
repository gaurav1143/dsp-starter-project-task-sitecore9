using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using DSP.Foundation.Configuration;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Map
{
    public class MapRendering : RenderingModel<Map>, IHideOnError
    {
        private readonly ISiteConfigurationRepository _siteConfigurationRepository;
        public MapRendering(ISiteConfigurationRepository siteConfigurationRepository)
        {
            _siteConfigurationRepository = siteConfigurationRepository;
        }

        protected override Map InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var vm = Map<Map>(dataSource?.Item ?? CurrentItem);
            vm.MapAPIKey = _siteConfigurationRepository.GetSiteConfiguration(SiteRootItem).MapAPIKey;
            return vm;
        }
    }
}