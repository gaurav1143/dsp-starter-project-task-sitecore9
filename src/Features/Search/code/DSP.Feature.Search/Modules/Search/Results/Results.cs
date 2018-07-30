using System.Collections.Generic;

namespace DSP.Feature.Search.Modules.Search.Results
{
    using Business.Search.ContentSearch.SearchResults;

    public class Results
    {
        public Results(IEnumerable<ISearchResult> searchResults, string contextItemId, ResultPartialFactory resultPartialFactory)
        {
            SearchResults = searchResults;
            ContextItemId = contextItemId;
            ResultPartialFactory = resultPartialFactory;
        }

        public IEnumerable<ISearchResult> SearchResults { get; set; }

        public string ContextItemId { get; set; }

        public ResultPartialFactory ResultPartialFactory { get; set; }
    }
}