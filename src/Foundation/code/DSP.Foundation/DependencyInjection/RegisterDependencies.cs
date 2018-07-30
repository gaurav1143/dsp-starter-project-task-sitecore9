using DeloitteDigital.Atlas.Caching;
using DeloitteDigital.Atlas.Logging;
using DeloitteDigital.Atlas.Mapping;
using DeloitteDigital.Atlas.Multisite.Datasource;
using DSP.Foundation.AdditionalRenderingContext;
using DSP.Foundation.Configuration;
using DSP.Foundation.ContentTypes;
using DSP.Foundation.Navigation;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;

namespace DSP.Foundation.DependencyInjection
{
    public class RegisterDependencies : IServicesConfigurator
    {
        public void Configure(IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<ILogService, SitecoreLogService>();
            serviceCollection.AddTransient<IItemMapper, ItemMapper>();
            serviceCollection.AddTransient<ICache, WebCache>();
            serviceCollection.AddTransient<ICacheService, WebCacheService>();
            serviceCollection.AddTransient<IDatasourceProvider, ConventionBasedDatasourceProvider>();

            serviceCollection.AddSingleton<NavigationItem, NavigationItem>();
            serviceCollection.AddSingleton<INavigationService, NavigationService>();
            serviceCollection.AddSingleton<NavigationService, NavigationService>();
            serviceCollection.AddSingleton<XmlSitemapItem, XmlSitemapItem>();
            serviceCollection.AddSingleton<SiteConfiguration, SiteConfiguration>();

            serviceCollection.AddSingleton<ISiteConfigurationRepository, SiteConfigurationRepository>();
            serviceCollection.AddSingleton<SiteConfigurationRepository, SiteConfigurationRepository>();

            // AdditionalContextStore must be available for the entire request, not transient
            serviceCollection.AddScoped<IAdditionalContextStore, AdditionalContextStore>();
            serviceCollection.AddScoped<AdditionalContextStore, AdditionalContextStore>();

            // Content types
            serviceCollection.AddSingleton<ContentTypeRepository, ContentTypeRepository>();

            serviceCollection.AddRenderingsInCurrentAssembly();
            serviceCollection.AddMvcControllersInCurrentAssembly();
        }
    }
}