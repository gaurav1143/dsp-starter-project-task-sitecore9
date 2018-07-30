using Sitecore.Data.Items;

namespace DSP.Foundation.Configuration
{
    public interface ISiteConfigurationRepository
    {
        SiteConfiguration GetSiteConfiguration(Item siteRootItem);
    }
}