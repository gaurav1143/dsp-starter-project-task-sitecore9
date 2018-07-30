using System.Web.Mvc;
using System.Web.Routing;
using DeloitteDigital.Atlas.Mvc;
using Sitecore.Data.Items;
using Sitecore.Data;
using Sitecore.Links;
using Sitecore.Mvc.Configuration;
using Sitecore.Mvc.Presentation;

namespace DSP.Foundation.Mvc
{
    public class FoundationController : SitecoreBaseController
    {
        protected Item DataSourceOrCurrentItem => CurrentRendering.DataSourceOrCurrentItem;
        protected Item DataSource => CurrentRendering.DataSource;

        /// <summary>
        /// Redirect user back to current controller as it was a fresh Page_Load (HttpGet). 
        /// </summary>
        /// <returns></returns>
        protected ActionResult RedirectToSitecoreRoute()
        {
            return RedirectToSitecoreRoute(CurrentItem, null);
        }

        private ActionResult RedirectToSitecoreRoute(Item item, RouteValueDictionary routeValues)
        {
            var options = new UrlOptions { AddAspxExtension = false };
            var url = Sitecore.Links.LinkManager.GetItemUrl(item, options);
            var trimmedUrl = url.TrimStart('/');

            routeValues = routeValues ?? new RouteValueDictionary();
            routeValues.Add("pathInfo", trimmedUrl);

            return RedirectToRoute(
                MvcSettings.SitecoreRouteName,
                routeValues);
        }
    }
}