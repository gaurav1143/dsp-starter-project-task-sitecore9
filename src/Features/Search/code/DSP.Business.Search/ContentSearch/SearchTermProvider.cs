namespace DSP.Business.Search.ContentSearch
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using DSP.Business.Search.StopWords;

    public class SearchTermProvider : ISearchTermProvider
    {
        private readonly StopWordsRepository stopWordsRepository;

        public SearchTermProvider(StopWordsRepository stopWordsRepository)
        {
            this.stopWordsRepository = stopWordsRepository;
        }

        public IEnumerable<string> GetTermsFromQuery(string query)
        {
            if (string.IsNullOrEmpty(query)) return Enumerable.Empty<string>();

            return query
                .Split(new[] { " " }, StringSplitOptions.RemoveEmptyEntries)
                .Except(stopWordsRepository.Get()).Except(new[] { "&" });
        }
    }
}
