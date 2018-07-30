using System.Linq;

namespace DSP.Business.Search.Pipelines
{
    using Sitecore;
    using Sitecore.ContentSearch;
    using Sitecore.ContentSearch.Pipelines.GetDependencies;
    using Sitecore.Data.Items;
    using Sitecore.Diagnostics;

    /// <summary>
    /// When indexing an item, make sure any items for whom it is a datasource get re-indexed as well
    /// </summary>
    /// <remarks>
    /// ref 
    /// http://www.techphoria414.com/Blog/2013/November/Sitecore-7-Computed-Fields-All-Templates-and-Datasource-Content
    /// https://gist.github.com/techphoria414/7604814#file-getdatasourcedependencies-cs
    /// </remarks>
    public class GetDatasourceDependencies : BaseProcessor
    {
        public override void Process(GetDependenciesArgs context)
        {
            Assert.IsNotNull(context.IndexedItem, "indexed item");
            Assert.IsNotNull(context.Dependencies, "dependencies");

            var item = (Item)(context.IndexedItem as SitecoreIndexableItem);

            if (item == null) return;

            var itemUri = (SitecoreItemUniqueId)item.Uri;

            if (itemUri == null) return;
            if (context.Dependencies.Contains(itemUri)) return;
            
            var source = Globals.LinkDatabase.GetReferrers(item, FieldIDs.LayoutField)
                .Concat(Globals.LinkDatabase.GetReferrers(item, FieldIDs.FinalLayoutField))
                .Select(link => link.GetSourceItem().Uri)
                .Where((uri, i) => uri != null && uri != item.Uri)
                .Distinct();

            foreach (var sourceItemUri in source)
            {
                var candidate = (SitecoreItemUniqueId)sourceItemUri;

                if (candidate == null) continue;
                if (context.Dependencies.Contains(candidate)) continue;

                context.Dependencies.Add(candidate);
            }
        }
    }
}
