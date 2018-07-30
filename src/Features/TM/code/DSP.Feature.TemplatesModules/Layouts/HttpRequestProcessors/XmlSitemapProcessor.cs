using DSP.Foundation.Navigation;
using DSP.Foundation.DependencyInjection;

namespace DSP.Feature.TemplatesModules.Layouts.HttpRequestProcessors
{
    using System.Linq;
    using System.Web;
    using System.Text;
    using System.Xml.Linq;    

    using Sitecore.DependencyInjection;
    using Sitecore.Pipelines.HttpRequest;
    using Sitecore.Sites;

    public class XmlSitemapProcessor : HttpRequestProcessor
    {
        private static readonly XNamespace XmlNs = "http://www.sitemaps.org/schemas/sitemap/0.9";

        public override void Process(HttpRequestArgs args)
        {
            if (HttpContext.Current == null)
                return;

            if (HttpContext.Current.Request.Url.AbsolutePath.ToLower().StartsWith("/sitemap.xml"))
            {
                GenerateXmlSitemap();
            }
        }

        private void GenerateXmlSitemap()
        {
            var sitemapService = ServiceLocator.ServiceProvider.GetService<IXmlSitemapService>();
            var items = sitemapService.BuildSitemap(SiteContext.Current);

            var xd = new XDocument(
                    new XDeclaration("1.0", "UTF-8", null),
                    new XElement(XmlNs + "urlset", items
                        .Where(i => !string.IsNullOrWhiteSpace(i.ItemUrl))
                        .Select(GetSitemapElement).ToList()));

            //Show output
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ContentType = "text/xml";
            HttpContext.Current.Response.ContentEncoding = Encoding.UTF8;
            HttpContext.Current.Response.Write(xd.ToString());

            HttpContext.Current.Response.End();
        }

        private static XElement GetSitemapElement(XmlSitemapItem item)
        {
            return new XElement(XmlNs + "url",
                new XElement(XmlNs + "loc", item.ItemUrl));
        }
    }
}