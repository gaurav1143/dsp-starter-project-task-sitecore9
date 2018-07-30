using System.Web;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Security.Accounts;
using Sitecore.Sites;

namespace DSP.Foundation.SitecoreAbstractions
{
    public class SitecoreContext : ISitecoreContext
    {
        public SiteContext Site => Sitecore.Context.Site;
        public Database Database => Sitecore.Context.Database;
        public Item Item => Sitecore.Context.Item;
        public bool IsPageEditor => Sitecore.Context.PageMode.IsExperienceEditor;
        public bool IsPreview => Sitecore.Context.PageMode.IsPreview;
        public bool IsSitecore => Sitecore.Context.IsLoggedIn && (IsPageEditor || IsPreview);
        public HttpContextBase HttpContext => new HttpContextWrapper(System.Web.HttpContext.Current);
        public User User => Sitecore.Context.User;
    }
}