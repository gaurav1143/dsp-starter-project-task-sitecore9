using DSP.Business.Search.ComputedFields.AutomatedTags.ValueProviders;
using DSP.Business.Search.ContentManagedSearch;
using DSP.Business.Search.ContentSearch;
using DSP.Business.Search.ContentSearch.SearchResults;
using DSP.Business.Search.ItemSearch;
using DSP.Business.Search.SearchContext;
using DSP.Business.Search.Sitemap;
using DSP.Business.Search.Sorting.SortOptions;
using DSP.Business.Search.StopWords;
using DSP.Business.Search.Tags;
using DSP.Foundation.DependencyInjection;
using DSP.Foundation.Navigation;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;

namespace DSP.Business.Search.DependencyInjection
{
    public class RegisterDependencies : IServicesConfigurator
    {
        public void Configure(IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<IContentSearchService, ContentSearchService>();
            serviceCollection.AddSingleton<ISearchTermProvider, SearchTermProvider>();
            serviceCollection.AddSingleton<ISearchContext, SearchContext.SearchContext>();
            serviceCollection.AddSingleton<ISortOptionRepository, SortOptionRepository>();
            serviceCollection.AddSingleton<SortOptionRepository, SortOptionRepository>();
            serviceCollection.AddSingleton<IContentManagedSearchService, ContentManagedSearchService>();
            serviceCollection.AddSingleton<ISearchContextBuilder, SearchContextBuilder>();
            serviceCollection.AddSingleton<IItemSearch, ItemSearch.ItemSearch>();

            serviceCollection.AddSingleton<SearchResultFactory, SearchResultFactory>();
            serviceCollection.AddSingleton<TagRepository, TagRepository>();
            serviceCollection.AddSingleton<SearchResultFacetsFactory, SearchResultFacetsFactory>();
            serviceCollection.AddSingleton<ContentTagFactory, ContentTagFactory>();
            serviceCollection.AddSingleton<AutomatedTagFactory, AutomatedTagFactory>();
            serviceCollection.AddSingleton<SearchContextPredicateBuilder, SearchContextPredicateBuilder>();
            serviceCollection.AddSingleton<SearchContextFilterBuilder, SearchContextFilterBuilder>();
            serviceCollection.AddSingleton<StopWordsRepository, StopWordsRepository>();

            serviceCollection.AddSingleton<IXmlSitemapService, SearchBasedSitemapService>();

            serviceCollection.AddSingleton<ContentTypeAutomatedTagValueProvider>();
            serviceCollection.AddSingleton<YearPublishedAutomatedTagValueProvider>();

            serviceCollection.AddMvcControllersInCurrentAssembly();
        }
    }
}