using System.Collections.Generic;
using System.Collections.Specialized;
using DSP.Business.Search.ContentSearch;
using DSP.Business.Search.Paging;
using DSP.Business.Search.Sorting.SortOptions;
using DeloitteDigital.Atlas.Extensions;
using DSP.Foundation.Aspects;
using Sitecore.Data;


namespace DSP.Business.Search.SearchContext
{
    public class SearchContext : ISearchContext
    {
        private readonly int[] _validPageSizes;
        private readonly ISortOptionRepository _sortOptionRepository;
        // ReSharper disable once InconsistentNaming

        public SearchContext(
            ISearchAspect<ID> path,
            ISearchAspect<FeaturedOption> featuredOption,
            ISearchAspect<ISortOrderOption> sortBy,
            ISearchAspect<int> pageSize,
            ISearchAspect<int> pageNumber,
            ISearchAspect<string> query,
            ISearchAspect<IEnumerable<string>> selectedFacetValues,
            ISearchAspect<SearchOperator> selectedFacetValuesSearchOperator,
            ISearchAspect<IEnumerable<ID>> excludedItemIds,
            ISearchAspect<IEnumerable<string>> excludedFacetValues,
            ISearchAspect<IEnumerable<ID>> selectedTemplateIds,

            int[] validPageSizes,
            CollectionSettings settings, 
            ISortOptionRepository sortOptionRepository)
        {
            _validPageSizes = validPageSizes;
            _sortOptionRepository = sortOptionRepository;

            CollectionSettings = settings;
            
            Path = path;
            Featured = featuredOption;
            SortBy = sortBy;
            PageSize = pageSize;
            PageNumber = pageNumber;
            Query = query;
            SelectedFacetValues = selectedFacetValues;
            SelectedFacetValuesSearchOperator = selectedFacetValuesSearchOperator;
            ExcludedItemIds = excludedItemIds;
            ExcludedFacetValues = excludedFacetValues;
            SelectedTemplateIds = selectedTemplateIds;
        }

        public virtual NameValueCollection AsNameValueCollection()
        {
            return AsDictionary().ToNameValueCollection();
        }

        public virtual Dictionary<string, string> AsDictionary()
        {
            var result = new Dictionary<string, string>(16)
            {
                { PageSize.Key,  PageSize.ToString() },
                { PageNumber.Key, PageNumber.ToString() },
                { Query.Key, Query.ToString() },
                { SelectedFacetValues.Key, SelectedFacetValues.ToString() },
                { ExcludedFacetValues.Key, ExcludedFacetValues.ToString() },
                { SelectedFacetValuesSearchOperator.Key, SelectedFacetValuesSearchOperator.ToString() },
                { ExcludedItemIds.Key, ExcludedItemIds.ToString() },
                { SelectedTemplateIds.Key, SelectedTemplateIds.ToString() },
                { Path.Key, Path.ToString() },
                { Featured.Key, Featured.ToString() },
                { SortBy.Key, SortBy.ToString() }
            };

            return result;
        }
        
        public virtual IEnumerable<ISortOrderOption> SortOrderOptions => CollectionSettings.SortOptions;
        public virtual CollectionSettings CollectionSettings { get; }
        public virtual PaginationOptions PaginationOptions => new PaginationOptions(PageNumber.Value, PageSize.Value);
        public virtual int[] ValidPageSizes => _validPageSizes;
        public virtual ISearchAspect<ID> Path { get; }
        public virtual ISearchAspect<FeaturedOption> Featured { get; }
        public virtual ISearchAspect<string> Query { get; }
        public virtual ISearchAspect<int> PageSize { get; }
        public virtual ISearchAspect<int> PageNumber { get; }
        public virtual ISearchAspect<ISortOrderOption> SortBy { get; }
        public virtual ISearchAspect<IEnumerable<string>> SelectedFacetValues { get; }
        public virtual ISearchAspect<SearchOperator> SelectedFacetValuesSearchOperator { get; }
        public virtual ISearchAspect<IEnumerable<ID>> ExcludedItemIds { get; }
        public virtual ISearchAspect<IEnumerable<string>> ExcludedFacetValues { get; }
        public virtual ISearchAspect<IEnumerable<ID>> SelectedTemplateIds { get; }

        public virtual ISorter<LuceneSearchResultItem> GetSorter()
        {
            return _sortOptionRepository.GetSorter(SortBy.Value);
        }

        /// <summary>
        /// Convert the SearchContext to a formatted string of key value pairs.
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return AsNameValueCollection()
                .ToQueryString();
        }
    }
}
