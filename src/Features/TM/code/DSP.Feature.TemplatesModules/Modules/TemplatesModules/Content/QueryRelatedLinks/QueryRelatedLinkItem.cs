using System.Web;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Content.QueryRelatedLinks
{
    public class QueryRelatedLinkItem
    {
        public string Link { get; set; }
        public IHtmlString Title { get; set; }
        public IHtmlString ShortDescription { get; set; }
    }
}