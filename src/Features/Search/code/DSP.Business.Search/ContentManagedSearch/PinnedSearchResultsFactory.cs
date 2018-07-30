using System.Collections.Generic;
using DSP.Business.Search.ContentSearch.SearchResults;
using DSP.Business.Search.ItemSearch;
using DeloitteDigital.Atlas.Logging;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;

namespace DSP.Business.Search.ContentManagedSearch
{
    public class PinnedSearchResultsFactory
    {
        private readonly IItemSearch _itemSearch;
        private readonly ILogService _log;

        public PinnedSearchResultsFactory(IItemSearch itemSearch, ILogService log)
        {
            _itemSearch = itemSearch;
            _log = log;
        }

        public IEnumerable<ISearchResult> Create(Item dataSource)
        {
            using (_log.WithLogScope(this, logLevel: LogLevel.Debug))
            {
                var links = PinnedLinks(dataSource);
                var results = new List<ISearchResult>();

                foreach (var link in links)
                {
                    // add valid internal links
                    if (IsValidInternalLink(link))
                    {
                        results.AddRange(_itemSearch.Search(link.TargetID).Results);
                        continue;
                    }

                    // add external links
                    if (!link.IsInternal) results.Add(new LinkFieldSearchResult(link));
                }

                return results;
            }
        }
        
        private static IEnumerable<LinkField> PinnedLinks(Item dataSource)
        {
            LinkField result1 = dataSource.Fields[DSP.Foundation.SitecoreTemplates.Query_Pinned_Results.QueryPinnedResult1.FieldName];
            LinkField result2 = dataSource.Fields[DSP.Foundation.SitecoreTemplates.Query_Pinned_Results.QueryPinnedResult2.FieldName];
            LinkField result3 = dataSource.Fields[DSP.Foundation.SitecoreTemplates.Query_Pinned_Results.QueryPinnedResult3.FieldName];

            var values = new List<LinkField>(3);

            if (result1 != null) values.Add(result1);
            if (result2 != null) values.Add(result2);
            if (result3 != null) values.Add(result3);

            return values;
        }

        private static bool IsValidInternalLink(LinkField link)
        {
            return link != null
                && link.IsInternal
                && link.TargetID != ID.Null;
        }
    }
}
