using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;

using DSP.Business.Search.ContentSearch;
using DSP.Business.Search.Paging;
using DSP.Business.Search.SearchContext.Aspects;
using DeloitteDigital.Atlas.Extensions;
using DSP.Foundation.Aspects;
using DSP.Foundation.Extensions;
using Sitecore.Data;
using keys = DSP.Business.Search.Constants.SearchContext.Keys;

namespace DSP.Business.Search.SearchContext
{
    using System.Web;
    using Sorting.SortOptions;

    public class HttpRequestSearchContext : ISearchContext
    {
        private readonly HttpRequestBase _request;
        private readonly SearchContext _inner;

        public HttpRequestSearchContext(HttpRequestBase request, FacetValueValidator facetValueValidator, CollectionSettings settings, ISortOptionRepository sortOptionRepository)
        {
            _request = request;

            var context = ToNameValueCollection(request);

            // decorated object
            _inner = new SearchContext(
                new ItemIdAspect(keys.Path, settings.CollectionSource?.ID),
                new FeaturedAspect(keys.Featured, context.GetValueOrDefault(keys.Featured)),
                new SortOrderOptionAspect(keys.Sort, context.GetValueOrDefault(keys.Sort), settings.DefaultSortOrderOption, sortOptionRepository),
                new PageSizeAspect(keys.PageSize, context.GetValueOrDefault(keys.PageSize), Constants.SearchContext.ValidPageSizes),
                new PageNumberAspect(keys.PageNumber, context.GetValueOrDefault(keys.PageNumber)),
                new QueryAspect(keys.Query, context.GetValueOrDefault(keys.Query)),
                new FacetValuesAspect(keys.Facets, context.GetValueOrDefault(keys.Facets), facetValueValidator),
                new SearchOperatorAspect(keys.FacetOperator, context.GetValueOrDefault(keys.FacetOperator)),
                new ItemIdsAspect(keys.ExcludedItems, context.GetValueOrDefault(keys.ExcludedItems)),
                new FacetValuesAspect(keys.ExcludedFacets, context.GetValueOrDefault(keys.ExcludedFacets), facetValueValidator),
                new ItemIdsAspect(keys.Templates, context.GetValueOrDefault(keys.Templates)),

                Constants.SearchContext.ValidPageSizes,
                settings, 
                sortOptionRepository
                );
        }

        private static IDictionary<string, string> ToNameValueCollection(HttpRequestBase request)
        {
            var result = new Dictionary<string, string>(32);

            var allKeys = request.Form.AllKeys.Union(request.QueryString.AllKeys).Distinct();

            foreach (var key in allKeys)
            {
                result.Add(key, request.GetFromRequest(key));
            }

            return result;
        }

        public NameValueCollection AsNameValueCollection()
        {
            var result = _inner.AsDictionary()
                // exclude empty values to keep query String shorter
                .Where(pair => !string.IsNullOrWhiteSpace(pair.Value))
                .ToDictionary(pair => pair.Key, pair => pair.Value);

            if (HttpContext.Current == null) return result.ToNameValueCollection();

            // preserve the existing query string as part of the state
            var existing = _request.QueryString.ToDictionary();

            result = Merge(existing, result);

            return result.ToNameValueCollection();
        }

        protected Dictionary<string, string> Merge(Dictionary<string, string> left, Dictionary<string, string> right)
        {
            if (left == null && right == null) return new Dictionary<string, string>();
            if (left == null) return right;
            if (right == null) return left;

            foreach (var kvp in right)
            {
                left[kvp.Key] = kvp.Value;
            }

            return left;
        }

        public ISearchAspect<int> PageNumber => _inner.PageNumber;
        public ISearchAspect<int> PageSize => _inner.PageSize;
        public int[] ValidPageSizes => _inner.ValidPageSizes;
        public ISearchAspect<ISortOrderOption> SortBy => _inner.SortBy;
        public IEnumerable<ISortOrderOption> SortOrderOptions => _inner.SortOrderOptions;
        public ISearchAspect<string> Query => _inner.Query;
        public PaginationOptions PaginationOptions => _inner.PaginationOptions;
        public ISorter<LuceneSearchResultItem> GetSorter()
        {
            return _inner.GetSorter();
        }

        public CollectionSettings CollectionSettings => _inner.CollectionSettings;
        public ISearchAspect<ID> Path => _inner.Path;
        public ISearchAspect<FeaturedOption> Featured => _inner.Featured;
        public ISearchAspect<IEnumerable<string>> SelectedFacetValues => _inner.SelectedFacetValues;
        public ISearchAspect<SearchOperator> SelectedFacetValuesSearchOperator => _inner.SelectedFacetValuesSearchOperator;
        public ISearchAspect<IEnumerable<ID>> ExcludedItemIds => _inner.ExcludedItemIds;
        public ISearchAspect<IEnumerable<string>> ExcludedFacetValues => _inner.ExcludedFacetValues;
        public ISearchAspect<IEnumerable<ID>> SelectedTemplateIds => _inner.SelectedTemplateIds;
    }
}