using System.Collections.Generic;
using Sitecore.Sites;

namespace DSP.Foundation.Navigation
{
    public interface IXmlSitemapService
    {
        IEnumerable<XmlSitemapItem> BuildSitemap(SiteContext siteContext);
    }
}
