using Sitecore.Data.Items;

namespace DSP.Foundation.Navigation
{
    public interface INavigationService
    {
        NavigationItem BuildNavigation(Item startItem, int maxDepth = 3);

        /// <summary>
        /// Note - this is supposed to be used by the HTML Sitemap (e.g. it stops at collections).
        /// Use the ISitemapService for a full (flat) sitemap.
        /// </summary>
        NavigationItem BuildNavigationSitemap(Item startItem);
    }
}