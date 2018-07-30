using System.Linq;
using DeloitteDigital.Atlas.Extensions;
using DSP.Foundation.Pipelines.HttpRequestBegin.Models;
using Sitecore;
using Sitecore.Buckets.Managers;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.Linq;
using Sitecore.Diagnostics;
using Sitecore.Pipelines.HttpRequest;

namespace DSP.Foundation.Pipelines.HttpRequestBegin
{
    /// <summary>
    /// Resolve a url to a bucket item
    /// </summary>
    /// <remarks>
    /// http://adeneys.wordpress.com/2013/07/19/item-buckets-and-urls/
    /// </remarks>
    public class BucketItemResolver : HttpRequestProcessor
    {
        public override void Process(HttpRequestArgs args)
        {
            if (Context.Item != null || args.Url.FilePath.StartsWith("/sitecore") || args.LocalPath.StartsWith("/sitecore")) return;

            var requestUrl = args.Url.ItemPath;

            if (requestUrl.Length > 1 && requestUrl.EndsWith("/"))
                requestUrl = requestUrl.Substring(0, requestUrl.Length - 1);
            // remove last element from path and see if resulting path is a bucket
            var index = requestUrl.LastIndexOf('/');

            if (index <= 0) return;

            // take the front of the url, looking for /bucket-name
            var bucketPath = MainUtil.DecodeName(requestUrl.Substring(0, index));
            var bucketItem = args.GetItem(bucketPath);

            // was the item a bucket?
            if (bucketItem == null || !BucketManager.IsBucket(bucketItem)) return;

            // get the name of the item ion the bucket
            var itemName = requestUrl.Substring(index + 1);

            // locate item in bucket by name
            using (var searchContext = ContentSearchManager.GetIndex(Context.Site.GetIndexName()).CreateSearchContext())
            {
                // this returns the First matching item found.  If user has added several 
                // items of the same name into the bucket it may return the wrong item.
                var result = searchContext.GetQueryable<BucketItemSearchResult>()
                    .Where(x => x.Name == itemName && x.IsLatestVersion)
                    .Filter(x => x.Paths.Contains(bucketItem.ID));

                var count = result.Count();

                if (count == 0) return;

                if (count > 1)
                {
                    Log.Warn(
                        $"DSP.Foundation.Pipelines.HttpRequestBegin.BucketItemResolver - Process - found {count} items for '{requestUrl}'", this);
                }

                Context.Item = result.First().GetItem();
            }
        }
    }
}
