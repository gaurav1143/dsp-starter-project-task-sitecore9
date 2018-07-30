using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DSP.Business.Search.ContentManagedSearch;
using DSP.Business.Search.ContentSearch.SearchResults;
using DSP.Business.Search.Tags;
using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.QueryFeatureListing
{
    public class QueryFeatureListingRendering : RenderingModel<QueryFeatureListing>, IHideOnError
    {
        private readonly IContentManagedSearchService _searchService;

        public QueryFeatureListingRendering(IContentManagedSearchService searchService)
        {
            _searchService = searchService;
        }

        protected override QueryFeatureListing InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var searchContext = _searchService.CreateSearchContext(CurrentItem, dataSource.Item);

            // feature listing has maximum 4 results - the main feature and upto three more
            searchContext.PageSize.Set("4");

            var searchResults = _searchService.Search(searchContext, dataSource.Item);
            var viewModel = new QueryFeatureListing(searchResults.Results.Select(ToQueryFeatureListingItem));

            Map(viewModel, dataSource.Item);

            return viewModel;
        }

        private static QueryFeatureListingItem ToQueryFeatureListingItem(ISearchResult result)
        {
            return new QueryFeatureListingItem
            {
                Link = result.Url,
                Title = new HtmlString(result.Title),
                Description = new HtmlString(result.Summary),
                Time = result.Date == DateTime.MinValue ? (DateTime?)null : result.Date,
                Tags = GetTags(result),
                FeatureImage = GetFeatureImage(result)             
            };
        }

        private static MediaItem GetFeatureImage(ISearchResult searchResult)
        {
            var result = searchResult as ContentSearchResult;
            return result?.FeatureImage;
        }

        public static IEnumerable<ContentTag> GetTags(ISearchResult searchResult)
        {
            var result = searchResult as ContentSearchResult;
            return result?.Tags ?? Enumerable.Empty<ContentTag>();
        }
    }
}