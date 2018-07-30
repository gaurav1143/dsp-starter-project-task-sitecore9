using Sitecore;
using Sitecore.Buckets.Extensions;
using Sitecore.Buckets.Managers;
using Sitecore.Data.Items;
using Sitecore.IO;
using Sitecore.Links;

namespace DSP.Foundation.LinkManager
{
    public class BucketEnabledLinkManager : LinkProvider
    {
        public override string GetItemUrl(Item item, UrlOptions options)
        {
            // call the base implementation for non-bucketed items
            if (!BucketManager.IsItemContainedWithinBucket(item)) return base.GetItemUrl(item, options);

            var bucketItem = item.GetParentBucketItemOrParent();
            // is this item a bucket?
            if (bucketItem == null || !bucketItem.IsABucket()) return base.GetItemUrl(item, options);

            var bucketUrl = base.GetItemUrl(bucketItem, options);

            if (options.AddAspxExtension)
                bucketUrl = bucketUrl.Replace(".aspx", string.Empty);

            var name = item.Name;

            if (options.EncodeNames)
                name = MainUtil.EncodePath(item.Name, '/');

            bucketUrl = FileUtil.MakePath(bucketUrl, name);

            // reutrn url as bucket-name/item-name
            return bucketUrl + (options.AddAspxExtension ? ".aspx" : string.Empty);
        }
    }
}
