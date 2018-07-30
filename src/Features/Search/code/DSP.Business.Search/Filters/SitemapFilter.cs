namespace DSP.Business.Search.Filters
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using ContentSearch;
    using Sitecore.Sites;

    public class SitemapFilter<T> : ISearchFilter<T>
        where T : LuceneSearchResultItem
    {
        private readonly IList<ISearchFilter<T>> filters;

        /// <summary>
        /// Default set of filters for lucene query
        /// </summary>
        public SitemapFilter(SiteContext siteContext)
        {
            this.filters = new List<ISearchFilter<T>>
            {
                new HasRenderingFilter<T>(),
                new SiteFilter<T>(siteContext),
                new ExcludeHiddenFilter<T>(),
                new ExcludeHiddenInSitemapFilter<T>(),
                new LanguageFilter<T>("en"),
                new LatestVersionFilter<T>()
            };
        }

        public Expression<Func<T, bool>> Filter()
        {
            return this.filters.AndAll();
        }
    }
}
