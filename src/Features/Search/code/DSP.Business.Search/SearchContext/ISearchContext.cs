using System.Collections.Generic;
using DSP.Foundation.Aspects;
using Sitecore.Data;

namespace DSP.Business.Search.SearchContext
{
    using ContentSearch;
    using Paging;

    public interface ISearchContext : IPagingContextAspect, ISortingContextAspect, ISearchQueryAspect
    {
        PaginationOptions PaginationOptions { get; }
        ISorter<LuceneSearchResultItem> GetSorter();

        // TODO: CollectionSettings is not actually used by Search anymore - i'd like to seperate it from here
        CollectionSettings CollectionSettings { get; }
            
        ISearchAspect<ID> Path { get; }
        ISearchAspect<FeaturedOption> Featured { get; }
        ISearchAspect<IEnumerable<string>> SelectedFacetValues { get; }
        ISearchAspect<SearchOperator> SelectedFacetValuesSearchOperator { get; }
        ISearchAspect<IEnumerable<ID>> ExcludedItemIds { get; }
        ISearchAspect<IEnumerable<string>> ExcludedFacetValues { get; }
        ISearchAspect<IEnumerable<ID>> SelectedTemplateIds { get; }
    }
}