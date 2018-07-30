using Sitecore.Data.Items;
using Sitecore.Sites;

namespace DSP.Foundation.Extensions
{
    public static class SiteContextExtensions
    {
        public static Item GetNotFoundItem(this SiteContext site)
        {
            const string NotFoundKey = "notFoundPath";

            // if the context database or the notFound attribute is null for the site, exit
            if (site.Database == null || string.IsNullOrEmpty(site.Properties[NotFoundKey]))
                return null;

            var path = site.Properties[NotFoundKey];

            if (string.IsNullOrWhiteSpace(path))
                return null;

            return site.Database.GetItem(path);
        }
    }
}
