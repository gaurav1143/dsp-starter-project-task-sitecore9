using DeloitteDigital.Atlas.Caching;
using DeloitteDigital.Atlas.Extensions;
using DeloitteDigital.Atlas.Mapping;
using Sitecore.Data.Items;

namespace DSP.Foundation.Configuration
{
    public class SiteConfigurationRepository : ISiteConfigurationRepository
    {
        private readonly IItemMapper _itemMapper;
        private readonly ICacheService _cacheService;

        public SiteConfigurationRepository(IItemMapper itemMapper, ICacheService cacheService)
        {
            _itemMapper = itemMapper;
            _cacheService = cacheService;
        }

        public SiteConfiguration GetSiteConfiguration(Item siteRootItem)
        {
            return
                _cacheService.CreateOrGet(
                    $"DSP.Foundation.Configuration.SiteConfiguration.{siteRootItem.Name}",
                    () =>
                        {
                            var configItem = siteRootItem.GetFieldValueAsItem(SitecoreTemplates.Site_Setting.SiteSettingItem.FieldName);
                            var config = _itemMapper.Map<SiteConfiguration>(configItem);
                            config.ConfigItem = configItem;
                            return config;
                        });
        }
    }
}
