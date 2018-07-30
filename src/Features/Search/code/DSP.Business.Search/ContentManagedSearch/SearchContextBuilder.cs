using System.Collections.Generic;
using System.Linq;
using DSP.Foundation.Aspects;
using DSP.Business.Search.SearchContext;
using DSP.Business.Search.SearchContext.Aspects;
using DSP.Business.Search.Sorting.SortOptions;
using DeloitteDigital.Atlas.Extensions;
using DeloitteDigital.Atlas.Logging;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;

namespace DSP.Business.Search.ContentManagedSearch
{
    public class SearchContextBuilder : ISearchContextBuilder
    {
        private readonly FacetValueValidator _facetValueValidator;
        private readonly ISortOptionRepository _sortOptionRepository;
        private readonly ILogService _log;

        public SearchContextBuilder(FacetValueValidator facetValueValidator, ISortOptionRepository sortOptionRepository,
            ILogService log)
        {
            _facetValueValidator = facetValueValidator;
            _sortOptionRepository = sortOptionRepository;
            _log = log;
        }

        public ISearchContext Build(Item currentPage, Item dataSource)
        {
            using (_log.WithLogScope(this, logLevel: LogLevel.Debug))
            {
                var settings = new CollectionSettings();

                return new SearchContext.SearchContext(
                    Path(dataSource),
                    Featured(dataSource),
                    SortOrderOption(dataSource, settings.DefaultSortOrderOption, _sortOptionRepository),
                    PageSize(dataSource),
                    PageNumber(dataSource),
                    Query(dataSource),
                    Facets(dataSource, currentPage, _facetValueValidator),
                    SearchOperator(dataSource),
                    ExcludedItems(dataSource),
                    ExcludedFacets(dataSource, _facetValueValidator),
                    Templates(dataSource),
                    Constants.SearchContext.ValidPageSizes,
                    settings,
                    _sortOptionRepository);
            }
        }

        private static ISearchAspect<ID> Path(Item dataSource)
        {
            var value = dataSource.GetFieldValueAsItem(DSP.Foundation.SitecoreTemplates.Query_Path.QueryPath.FieldName);

            return new ItemIdAspect(Constants.SearchContext.Keys.Path, value?.ID);
        }

        // keep the Item parameter for consistency
        // ReSharper disable once UnusedParameter.Local
        private static ISearchAspect<int> PageNumber(Item dataSource)
        {
            // always take a single page of results
            return new PageNumberAspect(Constants.SearchContext.Keys.PageNumber, 1);
        }

        private static ISearchAspect<int> PageSize(Item dataSource)
        {
            var take = dataSource.GetFieldValueAsInt(DSP.Foundation.SitecoreTemplates.Query_Take_Results.QueryTake.FieldName);
            var skip = dataSource.GetFieldValueAsInt(DSP.Foundation.SitecoreTemplates.Query_Skip_Results.QuerySkip.FieldName);

            // page size is large enough to cover all results, skip over the results later
            var value = take + skip;

            if (value == 0) value = 6;

            return new PageSizeAspect(Constants.SearchContext.Keys.PageSize, value,
                Constants.SearchContext.ValidPageSizes);
        }

        private static ISearchAspect<string> Query(Item dataSource)
        {
            var value = dataSource.GetFieldValue(DSP.Foundation.SitecoreTemplates.Query_Keywords.QueryKeywords.FieldName);

            return new QueryAspect(Constants.SearchContext.Keys.Query, value);
        }

        private static ISearchAspect<FeaturedOption> Featured(Item dataSource)
        {
            var value = dataSource.GetFieldValue(DSP.Foundation.SitecoreTemplates.Query_Featured_Option.QueryFeaturedOption.FieldName);

            return new FeaturedAspect(Constants.SearchContext.Keys.Featured, value);
        }

        private static ISearchAspect<ISortOrderOption> SortOrderOption(Item dataSource,
            ISortOrderOption defaultSortOrderOption, ISortOptionRepository sortOptionRepository)
        {
            var value = dataSource.GetFieldValue(DSP.Foundation.SitecoreTemplates.Query_Sort_Order.QuerySortOption.FieldName);

            return new SortOrderOptionAspect(Constants.SearchContext.Keys.Sort, value, defaultSortOrderOption,
                sortOptionRepository);
        }

        private static ISearchAspect<SearchOperator> SearchOperator(Item dataSource)
        {
            var value = dataSource.GetFieldValue(DSP.Foundation.SitecoreTemplates.Query_Tags_Operator.QueryTagsOperator.FieldName);

            // if SearchOperator not specified use default of "Or"
            // NOTE: the "normal" content search uses a default of "And" so we can "drill down" on search results
            if (string.IsNullOrWhiteSpace(value)) value = SearchContext.SearchOperator.Or.ToString("G");

            return new SearchOperatorAspect(Constants.SearchContext.Keys.Sort, value);
        }

        private static ISearchAspect<IEnumerable<string>> Facets(Item dataSource, Item currentPage, FacetValueValidator facetValueValidator)
        {
            var value = dataSource.GetListFieldValueItems(DSP.Foundation.SitecoreTemplates.Query_Tags.QueryTags.FieldName);

            if (value == null || !value.Any())
            {
                // if Query Tags were not specified then use the current page as a source for Tags
                value = currentPage.GetListFieldValueItems(DSP.Foundation.SitecoreTemplates.Has_Tags.ContentTags.FieldName);
            }

            if (value == null) value = new Item[0];

            var values = value.Select(item => item.ID.ToShortID().ToString());
            
            return new FacetValuesAspect(Constants.SearchContext.Keys.Facets, values, facetValueValidator);
        }

        private static ISearchAspect<IEnumerable<string>> ExcludedFacets(Item dataSource, FacetValueValidator facetValueValidator)
        {
            var value = dataSource.GetListFieldValueItems(DSP.Foundation.SitecoreTemplates.Query_Tags_Excluded.QueryTagsExcluded.FieldName);
            var values = value.Select(item => item.ID.ToShortID().ToString());

            return new FacetValuesAspect(Constants.SearchContext.Keys.ExcludedFacets, values, facetValueValidator);
        }

        private static ISearchAspect<IEnumerable<ID>> Templates(Item dataSource)
        {
            var value = dataSource.GetListFieldValueItems(DSP.Foundation.SitecoreTemplates.Query_Templates.QueryTemplates.FieldName);
            var values = value.Select(item => item.ID);

            return new ItemIdsAspect(Constants.SearchContext.Keys.Templates, values);
        }

        private static ISearchAspect<IEnumerable<ID>> ExcludedItems(Item dataSource)
        {
            LinkField result1 = dataSource.Fields[DSP.Foundation.SitecoreTemplates.Query_Pinned_Results.QueryPinnedResult1.FieldName];
            LinkField result2 = dataSource.Fields[DSP.Foundation.SitecoreTemplates.Query_Pinned_Results.QueryPinnedResult2.FieldName];
            LinkField result3 = dataSource.Fields[DSP.Foundation.SitecoreTemplates.Query_Pinned_Results.QueryPinnedResult3.FieldName];

            var values = new List<ID>(3);

            if (IsValidInternalLink(result1)) values.Add(result1.TargetID);
            if (IsValidInternalLink(result2)) values.Add(result2.TargetID);
            if (IsValidInternalLink(result3)) values.Add(result3.TargetID);

            return new ItemIdsAspect(Constants.SearchContext.Keys.ExcludedItems, values);
        }

        private static bool IsValidInternalLink(LinkField link)
        {
            return link != null 
                && link.IsInternal 
                && link.TargetID != ID.Null;
        }
    }
}
