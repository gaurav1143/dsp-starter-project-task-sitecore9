using DeloitteDigital.Atlas.Caching;
using DSP.Foundation.Navigation;

namespace DSP.Business.Search.Sitemap
{
    using System.Collections.Generic;
    using System.Linq;

    using ContentSearch;
    using Filters;
    using Predicates;
    
    using DeloitteDigital.Atlas.Extensions;

    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.Linq;
    using Sitecore.ContentSearch.Linq.Utilities;
    using Sitecore.Links;
    using Sitecore.Sites;

    public class SearchBasedSitemapService : IXmlSitemapService
    {
        private readonly ICacheService cacheService;

        public SearchBasedSitemapService(ICacheService cacheService)
        {
            this.cacheService = cacheService;
        }

        public IEnumerable<XmlSitemapItem> BuildSitemap(SiteContext siteContext)
        {
            return cacheService.CreateOrGet(
                BuildCacheKey(siteContext),
                () =>
                    {
                        var predicate = PredicateBuilder.True<LuceneSearchResultItem>();

                        using (var context = ContentSearchManager.GetIndex(siteContext.GetIndexName()).CreateSearchContext())
                        {
                            var queryable =
                                context.GetQueryable<LuceneSearchResultItem>()
                                    .Where(predicate)
                                    .AddFilter(new SitemapFilter<LuceneSearchResultItem>(siteContext));

                            return queryable.GetResults().Hits.Select(x => this.ToSitemapItem(x.Document)).ToList();
                        }
                    });
        }

        private XmlSitemapItem ToSitemapItem(LuceneSearchResultItem searchResultItem)
        {
            return new XmlSitemapItem() { ItemUrl = LinkManager.GetItemUrl(searchResultItem.GetItem(), 
                new UrlOptions()
                    {
                        AlwaysIncludeServerUrl = true,
                        LanguageEmbedding = LanguageEmbedding.Never
                    }) };
        }

        private static string BuildCacheKey(SiteContext siteContext)
        {
            return $"DSP.Business.Search.Sitemap.{siteContext.StartPath}";
        }
    }
}
