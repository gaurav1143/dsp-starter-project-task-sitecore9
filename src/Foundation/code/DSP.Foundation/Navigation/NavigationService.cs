using System.Linq;
using DeloitteDigital.Atlas.Caching;
using DeloitteDigital.Atlas.Mapping;
using Sitecore.Buckets.Extensions;
using Sitecore.Data.Items;

namespace DSP.Foundation.Navigation
{
    public class NavigationService : INavigationService
    {
        private readonly IItemMapper mapper;
        private readonly ICacheService cacheService;

        public NavigationService(IItemMapper mapper, ICacheService cacheService)
        {
            this.mapper = mapper;
            this.cacheService = cacheService;
        }

        public NavigationItem BuildNavigation(Item startItem, int maxDepth = 3)
        {
            return this.cacheService.CreateOrGet(BuildCacheKey(startItem, maxDepth), () => this.BuildNavigationRecursively(startItem, 0, maxDepth));
        }

        public NavigationItem BuildNavigationSitemap(Item startItem)
        {
            return this.cacheService.CreateOrGet(BuildCacheKeyForSitemap(startItem), () => this.BuildSitemapRecursively(startItem));
        }

        private NavigationItem BuildNavigationRecursively(Item currentItem, int currentDepth, int maxDepth)
        {
            var currentNavItem = this.mapper.Map<NavigationItem>(currentItem);

            if (currentItem == null || !currentItem.HasChildren || currentItem.IsABucket()) return currentNavItem;

            if (currentDepth == maxDepth) return currentNavItem;

            currentNavItem.Children =
                currentItem.GetChildren()
                    .Where(c => c[SitecoreTemplates.Navigation.HideFromNavigation.FieldName] != "1")
                    .Take(1000)
                    .Select(m => this.BuildNavigationRecursively(m, currentDepth + 1, maxDepth)).ToList();

            return currentNavItem;
        }

        private NavigationItem BuildSitemapRecursively(Item currentItem)
        {
            var currentNavItem = this.mapper.Map<NavigationItem>(currentItem);

            if (currentItem == null || !currentItem.HasChildren || currentItem.IsABucket()) return currentNavItem;

            currentNavItem.Children =
                currentItem.GetChildren()
                    .Where(c => c[SitecoreTemplates.Navigation.HideFromSitemap.FieldName] != "1")
                    .Take(1000)
                    .Select(this.BuildSitemapRecursively).ToList();

            return currentNavItem;
        }

        private static string BuildCacheKey(Item startItem, int maxDepth)
        {
            return $"DSP.Foundation.Navigation.{startItem.ID}.Depth={maxDepth}";
        }

        private static string BuildCacheKeyForSitemap(Item startItem)
        {
            return $"DSP.Foundation.Navigation.Sitemap.{startItem.ID}";
        }
    }
}
