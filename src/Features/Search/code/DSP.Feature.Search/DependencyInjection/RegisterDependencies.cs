using DSP.Feature.Search.Modules.Search.Facets.Factories;
using DSP.Feature.Search.Modules.Search.Results;
using DSP.Foundation.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;

namespace DSP.Feature.Search.DependencyInjection
{
    public class RegisterDependencies : IServicesConfigurator
    {
        public void Configure(IServiceCollection serviceCollection)
        {
            // For Base Search :
            serviceCollection.AddSingleton<ResultPartialFactory, ResultPartialFactory>();
            serviceCollection.AddSingleton<SelectedFacetsFactory, SelectedFacetsFactory>();
            serviceCollection.AddSingleton<TagSeletedFacetProvider, TagSeletedFacetProvider>();
            serviceCollection.AddSingleton<KeywordSelectedFacetProvider, KeywordSelectedFacetProvider>();

            serviceCollection.AddSingleton<FacetFactory, FacetFactory>();

            serviceCollection.AddSingleton<Business.Search.SearchContext.FacetValueValidator, Business.Search.SearchContext.FacetValueValidator>();
            serviceCollection.AddSingleton<Business.Search.ContentManagedSearch.PinnedSearchResultsFactory, Business.Search.ContentManagedSearch.PinnedSearchResultsFactory>();

            // General
            serviceCollection.AddMvcControllers(System.Reflection.Assembly.GetExecutingAssembly());
            serviceCollection.AddRenderings(System.Reflection.Assembly.GetExecutingAssembly());
        }
    }
}