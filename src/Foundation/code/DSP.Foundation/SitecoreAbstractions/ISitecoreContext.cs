using System.Web;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Security.Accounts;
using Sitecore.Sites;

namespace DSP.Foundation.SitecoreAbstractions
{
    /// <summary>
    /// Abstract for sitecore context
    /// </summary>
    public interface ISitecoreContext
    {
        SiteContext Site { get; }
        Database Database { get; }
        Item Item { get; }
        bool IsPageEditor { get; }
        bool IsPreview { get; }
        bool IsSitecore { get; }
        HttpContextBase HttpContext { get; }
        User User { get; }
    }
}
