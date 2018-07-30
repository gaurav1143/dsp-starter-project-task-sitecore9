using DeloitteDigital.Atlas.Extensions;

namespace DSP.Business.Search.ContentSearch.SearchResults
{
    using System.Linq;

    using Paging;
    using Tags;

    using Sitecore.ContentSearch.Linq;
    using Sitecore.Data;
    using Sitecore.Data.Fields;
    using Sitecore.Data.Items;
    using Sitecore.Links;
    using Sitecore.Resources.Media;

    public class SearchResultFactory
    {
        private readonly TagRepository tagRepository;
        private readonly SearchResultFacetsFactory facetsFactory;

        public SearchResultFactory(TagRepository tagRepository, SearchResultFacetsFactory facetsFactory)
        {
            this.tagRepository = tagRepository;
            this.facetsFactory = facetsFactory;
        }

        public PagedSearchResult<ISearchResult> ToPagedSearchResult(IQueryable<LuceneSearchResultItem> queryable,
            PaginationOptions paginationOptions)
        {
            queryable = queryable.Skip(paginationOptions.RecordsToSkipToStartOfPage())
                     .Take(paginationOptions.PageSize);

            var results = queryable.GetResults();

            return new PagedSearchResult<ISearchResult>(
                paginationOptions,
                results.TotalSearchResults,
                results.Hits
                    .Select(hit => ToSearchResult(hit.Document)).ToList(),
                facetsFactory.ToFacets(results.Facets).ToList());
        }

        public ISearchResult ToSearchResult(LuceneSearchResultItem luceneSearchResult)
        {
            // get the actual Sitecore item since we don't store everything on the index
            var sitecoreItem = luceneSearchResult.GetItem();

            // search result type discrimination 

            // MEDIA
            if (luceneSearchResult.IsMediaItem)
                return new MediaItemSearchResult(
                    luceneSearchResult.Title,
                    luceneSearchResult.PageSummary,
                    MediaManager.GetMediaUrl(sitecoreItem),
                    luceneSearchResult.DateCreated,
                    luceneSearchResult.ItemId,
                    luceneSearchResult.TemplateId,
                    sitecoreItem.Fields["Extension"].Value, // hardcoding this since it is based on Sitecore system fields
                    sitecoreItem.Fields["Size"].Value);

            // default - CONTENTSEARCHRESULT

            // test if a featureimage is present
            MediaItem mediaItem = null;
            if (sitecoreItem.InheritsFromTemplate(new ID(DSP.Foundation.SitecoreTemplates.Featured_Content.TemplateId)))
                mediaItem = ((ImageField)sitecoreItem.Fields[DSP.Foundation.SitecoreTemplates.Featured_Content.FeatureImage.FieldName]).MediaItem;

            return new ContentSearchResult(
                luceneSearchResult.Title,
                luceneSearchResult.PageSummary,
                LinkManager.GetItemUrl(luceneSearchResult.GetItem()),
                luceneSearchResult.DateCreated,
                luceneSearchResult.ItemId,
                luceneSearchResult.TemplateId,
                tagRepository.Get(luceneSearchResult.ContentTags).Where(tag => !tag.IsHiddenFromDisplay),
                mediaItem);
        }
    }
}
