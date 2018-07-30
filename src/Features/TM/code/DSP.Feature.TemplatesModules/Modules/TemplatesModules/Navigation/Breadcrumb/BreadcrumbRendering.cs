using System.Collections.Generic;
using System.Linq;
using DeloitteDigital.Atlas;
using DeloitteDigital.Atlas.Mvc;
using DeloitteDigital.Atlas.Mvc.ErrorHandling;
using Sitecore.Buckets.Managers;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;

namespace DSP.Feature.TemplatesModules.Modules.TemplatesModules.Navigation.Breadcrumb
{
    public class BreadcrumbRendering : RenderingModel<IEnumerable<Breadcrumb>>, IHideOnError
    {
        protected override IEnumerable<Breadcrumb> InitialiseViewModel(Rendering rendering, DataSource dataSource)
        {
            var fullList = new List<Breadcrumb>();
            BuildBreadcrumb(CurrentItem, fullList);
            // exclude items marked as "hide from navigation" unless they are the active item
            return fullList.Where(x => (x.IsActive || !x.HideFromNavigation));
        }

        private void BuildBreadcrumb(Item i, ICollection<Breadcrumb> fullList)
        {
            var currentBreadcrumb = Map<Feature.TemplatesModules.Modules.TemplatesModules.Navigation.Breadcrumb.Breadcrumb>(i);
            if (i == CurrentItem) currentBreadcrumb.IsActive = true;
            currentBreadcrumb.CssClass = (i.ID == SiteStartItem.ID) ? "home" : string.Empty;
            // recursively walk up until there is no parent or we reached the start item
            if (!i.ID.Equals(SiteStartItem.ID) && i.Parent != null) BuildBreadcrumb(i.Parent, fullList);
            // only add if the item is not a bucket item
            if (BucketManager.IsBucketFolder(i)) return;
            fullList.Add(currentBreadcrumb);
        }
    }
}