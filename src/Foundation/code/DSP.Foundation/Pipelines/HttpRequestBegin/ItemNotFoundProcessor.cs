using System;
using System.IO;
using System.Web;
using DSP.Foundation.Extensions;
using Sitecore;
using Sitecore.Data.Items;
using Sitecore.Pipelines.HttpRequest;
using Sitecore.Web;

namespace DSP.Foundation.Pipelines.HttpRequestBegin
{
    public class ItemNotFoundProcessor : HttpRequestProcessor
    {
        public override void Process(HttpRequestArgs args)
        {

            if (IsValidContextItem() || Context.Site == null || Context.Site.Name == "shell" || Context.Site.Name == "login" ||
                args.PermissionDenied || args.LocalPath.StartsWith("/sitecore") || args.Url.FilePath.StartsWith("/sitecore")
                || IsPhysicalFile(args.Url.FilePath))
                return;

            var notFound = Context.Site.GetNotFoundItem();
            
            if (notFound == null) return;

            // set context item to 404 item for this site
            // the actual 404 item in sitecore is responsible for setting the status code
            Context.Item = notFound;
        }

        protected virtual bool IsValidContextItem()
        {
            if (Context.Item == null || !HasContextLanguage(Context.Item))
                return false;
            return !(Context.Item.Visualization.Layout == null && string.IsNullOrEmpty(WebUtil.GetQueryString("sc_layout")));
        }

        protected static bool HasContextLanguage(Item item)
        {
            if (item?.Versions == null || item.Versions.Count == 0)
                return false;
            var latestLanguageVersion = item.Versions.GetLatestVersion();
            return (latestLanguageVersion != null) && (latestLanguageVersion.Versions.Count > 0);
        }

        protected virtual bool IsPhysicalFile(string filePath)
        {
            // if the request maps to a file path rather than an item, exit
            if (!String.IsNullOrEmpty(filePath) && WebUtil.IsExternalUrl(filePath))
                return true;

            return File.Exists(HttpContext.Current.Server.MapPath(filePath));
        }
    }
}
