using System.Linq;
using System.Web;
using DSP.Business.Search.ContentManagedSearch;
using DSP.Business.Search.ContentSearch.SearchResults;
using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.QueryRelatedLinks
{
    public class QueryRelatedLinksRendering : RenderingModel<QueryRelatedLinks>, IHideOnError
    {
        private readonly IContentManagedSearchService _searchService;

        public QueryRelatedLinksRendering(IContentManagedSearchService searchService)
        {
            _searchService = searchService;
        }

        protected override QueryRelatedLinks InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var viewModel = this.Map<Feature.TemplatesModules.Modules.TemplatesModules.Content.QueryRelatedLinks.QueryRelatedLinks>(dataSource.Item);
            var searchContext = _searchService.CreateSearchContext(CurrentItem, dataSource.Item);
            var searchResults = _searchService.Search(searchContext, dataSource.Item);
            
            // TODO: we could append the searchContext to the end of the view more link
            // if it links to a collection or search then that would make it "pre-faceted"
            
            viewModel.Links = searchResults.Results.Select(ToQueryRelatedLinkItem);

            return viewModel;
        }
        
        private static QueryRelatedLinkItem ToQueryRelatedLinkItem(ISearchResult result)
        {
            return new QueryRelatedLinkItem
            {
                Link = result.Url,
                Title = new HtmlString(result.Title),
                ShortDescription = new HtmlString(result.Summary)
            };
        }
    }
}