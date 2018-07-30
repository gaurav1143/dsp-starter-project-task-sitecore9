using System.Linq;
using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using DSP.Foundation.Configuration;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.Header
{
    public class ContentHeaderRendering : RenderingModel<ContentHeader>, IHideOnError
    {
        private readonly ISiteConfigurationRepository siteConfigurationRepository;

        public ContentHeaderRendering(ISiteConfigurationRepository siteConfigurationRepository)
        {
            this.siteConfigurationRepository = siteConfigurationRepository;
        }

        protected override ContentHeader InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var vm = Map<ContentHeader>(CurrentItem);
            vm.ContentTags = vm.ContentTags.Where(t => !t.HideFromDisplay);
            vm.SearchResultsUrl = siteConfigurationRepository.GetSiteConfiguration(SiteRootItem).SearchResultsPage.Url;
            return vm;
        }
    }
}